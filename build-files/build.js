#!/usr/bin/env node
"use strict";

/**
 * ABCL build — a single interactive script for everything build/release related.
 *
 *   pnpm run build            → interactive menu
 *   pnpm run build -- <cmd>    → run one action non-interactively
 *
 * Subcommands: check | watch | build <ver> | release <patch|minor|major|specific>
 *              | refresh <channel> | loaders | changelog <ver> | git | verify <target>
 *
 * The actual bundling is delegated to rollup.config.js (unchanged). This script
 * only orchestrates around it: type-checking, version bumping, channel refresh,
 * and generating the channel loaders/bookmarks that rollup does not produce.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const semver = require("semver");
const prompts = require("prompts");

const ROOT = path.resolve(__dirname, "..");
const DEPLOY_SITE = "https://zoe-64.github.io/ABCL";

// Channel metadata. `name`/`versionLabel` reproduce the hand-maintained loaders
// exactly (note `latest` carries a "Latest" name suffix; beta/unstable do not).
// `stable` is a build-only channel with no loader/bookmark.
const CHANNELS = {
  latest: { name: "ABCL (Loader) Latest", versionLabel: "Latest", loader: true },
  beta: { name: "ABCL (Loader)", versionLabel: "Beta", loader: true },
  unstable: { name: "ABCL (Loader)", versionLabel: "UNSTABLE", loader: true },
  stable: { name: null, versionLabel: null, loader: false },
};
const CHANNEL_NAMES = Object.keys(CHANNELS);

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

function pkgPath() {
  return path.join(ROOT, "package.json");
}

function readPkg() {
  return JSON.parse(fs.readFileSync(pkgPath(), "utf8"));
}

function writePkg(pkg) {
  // Preserve the trailing newline that generate.js used to drop.
  fs.writeFileSync(pkgPath(), JSON.stringify(pkg, null, 2) + "\n");
}

function pm() {
  return fs.existsSync(path.join(ROOT, "pnpm-lock.yaml")) ? "pnpm" : "npm";
}

function loadFlag() {
  const id = readPkg().buildSettings.identifier.replace(/[^A-Za-z0-9]/g, "");
  return `${id}_Loaded`;
}

function versionDir(v) {
  return path.join(ROOT, "versions", v);
}

function isDir(p) {
  return fs.existsSync(p) && fs.statSync(p).isDirectory();
}

function isSemver(v) {
  return /^\d+\.\d+\.\d+$/.test(v);
}

function runRollup({ version, deploy = DEPLOY_SITE, debug = false }) {
  if (!version) throw new Error("No version specified");
  const args = ["rollup", "-c", "rollup.config.js", "--configVersion", version, "--configDeploy", deploy];
  if (debug) args.push("--configDebug");
  // Shelling out keeps INIT_CWD / pkg resolution identical to the old scripts.
  execSync(args.join(" "), { stdio: "inherit", cwd: ROOT });
}

function gitInfo() {
  try {
    const branch = execSync("git rev-parse --abbrev-ref HEAD", { cwd: ROOT }).toString().trim();
    const status = execSync("git status --porcelain", { cwd: ROOT }).toString().trim();
    return { branch, clean: status === "", status };
  } catch {
    return { branch: "?", clean: false, status: "" };
  }
}

// ---------------------------------------------------------------------------
// channel loader / bookmark generation
// ---------------------------------------------------------------------------

function renderLoader(channel) {
  const cfg = CHANNELS[channel];
  const pkg = readPkg();
  const base = `${DEPLOY_SITE}/versions/${channel}`;
  const flag = loadFlag();
  return [
    "// ==UserScript==",
    `// @name ${cfg.name}`,
    "// @namespace https://www.bondageprojects.com/",
    `// @version ${cfg.versionLabel}`,
    `// @description ${pkg.description}`,
    `// @author ${pkg.author}`,
    "// @match https://*.bondageprojects.elementfx.com/R*/*",
    "// @match https://*.bondage-europe.com/R*/*",
    "// @match https://*.bondageeurope.com/R*/*",
    "// @match https://*.bondageprojects.com/R*/*",
    "// @match http://localhost:*/*",
    `// @icon  ${base}/assets/favicon.ico`,
    "// @grant none",
    "// @run-at document-end",
    "// ==/UserScript==",
    "",
    "(function () {",
    '  "use strict";',
    `  const src = \`${base}/abcl.js?v=\${Date.now()}\`;`,
    `  if (typeof ${flag} === "undefined") {`,
    '    const script = document.createElement("script");',
    "    script.src = src;",
    '    script.type = "text/javascript";',
    '    script.crossOrigin = "anonymous";',
    "    document.head.appendChild(script);",
    "  }",
    "})();",
    "",
  ].join("\n");
}

function renderBookmark(channel) {
  const base = `${DEPLOY_SITE}/versions/${channel}`;
  const flag = loadFlag();
  // One-liner with the early-return guard reversed (opposite of the loader).
  return `javascript:(function (){"use strict";if (typeof ${flag} !== "undefined") return; const src = \`${base}/abcl.js?v=\${Date.now()}\`; const script = document.createElement("script"); script.src = src; script.type = "text/javascript"; script.crossOrigin = "anonymous"; document.head.appendChild(script)})()\n`;
}

function writeChannelLoaders(channel) {
  const dir = versionDir(channel);
  fs.writeFileSync(path.join(dir, "loader.user.js"), renderLoader(channel));
  fs.writeFileSync(path.join(dir, "bookmark.js"), renderBookmark(channel));
  console.log(`✓ regenerated loader.user.js + bookmark.js for ${channel}`);
}

// ---------------------------------------------------------------------------
// verification
// ---------------------------------------------------------------------------

function verifyBuild(target) {
  const dir = versionDir(target);
  console.log(`\nVerifying versions/${target}/ …`);
  if (!isDir(dir)) {
    console.log(`✗ versions/${target}/ does not exist`);
    return false;
  }
  let ok = true;
  const required = ["abcl.js", "abcl.js.map"];
  if (isSemver(target)) required.push("loader.user.js");
  for (const f of required) {
    const p = path.join(dir, f);
    if (!fs.existsSync(p) || fs.statSync(p).size === 0) {
      console.log(`✗ missing or empty: versions/${target}/${f}`);
      ok = false;
    } else {
      console.log(`✓ versions/${target}/${f} (${fs.statSync(p).size} bytes)`);
    }
  }
  const assets = path.join(dir, "assets");
  if (!isDir(assets)) {
    console.log(`✗ missing versions/${target}/assets/`);
    ok = false;
  } else {
    console.log(`✓ versions/${target}/assets/ (${fs.readdirSync(assets).length} files)`);
  }
  const loader = path.join(dir, "loader.user.js");
  if (fs.existsSync(loader)) {
    const txt = fs.readFileSync(loader, "utf8");
    const ver = txt.match(/@version\s+(.+)/);
    const src = txt.match(/const src = `(.+)`/);
    if (ver) console.log(`  loader @version: ${ver[1].trim()}`);
    if (src) console.log(`  loader src:      ${src[1]}`);
  }
  return ok;
}

// ---------------------------------------------------------------------------
// prompt helpers
// ---------------------------------------------------------------------------

// When set (via --yes/-y on the CLI), confirms auto-succeed so commands run
// non-interactively. Prompts that have no CLI argument still use the menu.
let AUTO_YES = false;

async function confirm(message, initial = false) {
  if (AUTO_YES) return true;
  const { ok } = await prompts({ type: "confirm", name: "ok", message, initial });
  return !!ok;
}

async function askText(message, initial) {
  if (AUTO_YES && initial !== undefined) return initial;
  const { value } = await prompts({ type: "text", name: "value", message, initial });
  return value;
}

async function askSelect(message, choices, initial = 0) {
  const { value } = await prompts({ type: "select", name: "value", message, choices, initial });
  return value;
}

// ---------------------------------------------------------------------------
// actions
// ---------------------------------------------------------------------------

async function actionCheck() {
  try {
    execSync(`${pm()} run check`, { stdio: "inherit", cwd: ROOT });
    return true;
  } catch {
    console.log("✗ Type-check failed");
    return false;
  }
}

function actionWatch() {
  execSync(`${pm()} run watch`, { stdio: "inherit", cwd: ROOT });
}

async function actionBuildVersion(args = []) {
  const pkg = readPkg();
  const version = args[0] || (await askText("Version to build (x.y.z):", pkg.version));
  if (!version) return;
  if (!isSemver(version)) {
    console.log("✗ Not a semver version (expected x.y.z). Use “refresh” for channels.");
    return;
  }
  if (isDir(versionDir(version)) && !(await confirm(`versions/${version}/ already exists. Overwrite?`))) return;
  runRollup({ version });
  verifyBuild(version);
}

async function refreshChannel(channel, skipConfirm = false) {
  const dir = versionDir(channel);
  if (isDir(dir) && !skipConfirm && !(await confirm(`versions/${channel}/ already exists. Rebuild & overwrite?`))) {
    return false;
  }
  runRollup({ version: channel });
  if (CHANNELS[channel].loader) writeChannelLoaders(channel);
  return true;
}

async function actionRefreshChannel(args = []) {
  const channel = args[0] || (await askSelect(
    "Channel to refresh:",
    CHANNEL_NAMES.map((c) => ({ title: c, value: c })),
  ));
  if (!channel) return;
  if (!CHANNELS[channel]) {
    console.log(`✗ Unknown channel: ${channel}`);
    return;
  }
  if (await refreshChannel(channel)) verifyBuild(channel);
}

async function actionRegenLoaders(args = []) {
  const channel = args[0] || (await askSelect(
    "Channel:",
    CHANNEL_NAMES.filter((c) => CHANNELS[c].loader).map((c) => ({ title: c, value: c })),
  ));
  if (!channel) return;
  if (!isDir(versionDir(channel))) {
    console.log(`✗ versions/${channel}/ does not exist; build it first with “refresh”.`);
    return;
  }
  writeChannelLoaders(channel);
}

async function createChangelog(version, ifAbsentOnly = false) {
  const file = path.join(ROOT, "src", "changelog", `${version}.txt`);
  if (fs.existsSync(file)) {
    if (ifAbsentOnly) {
      console.log(`• src/changelog/${version}.txt already exists`);
      return;
    }
    if (!(await confirm(`src/changelog/${version}.txt already exists. Overwrite?`))) return;
  }
  fs.writeFileSync(file, "- \n");
  console.log(`✓ created src/changelog/${version}.txt`);
}

async function actionChangelog(args = []) {
  const pkg = readPkg();
  const version = args[0] || (await askText("Changelog version:", pkg.version));
  if (!version) return;
  await createChangelog(version);
}

function actionGit() {
  const g = gitInfo();
  console.log(`Branch:        ${g.branch}`);
  console.log(`Working tree:  ${g.clean ? "clean" : "dirty"}`);
  if (!g.clean) console.log(`\n${g.status}`);
}

async function actionVerify(args = []) {
  const pkg = readPkg();
  const target = args[0] || (await askText("Target to verify (version or channel):", pkg.version));
  if (!target) return;
  verifyBuild(target);
}

async function actionRelease(args = []) {
  const pkg = readPkg();
  const git = gitInfo();
  if (!git.clean) console.log(`⚠️  Working tree is not clean (branch ${git.branch}).`);
  if (git.branch !== "main") console.log(`⚠️  Not on main (currently ${git.branch}). Stable releases usually go from main.`);

  // Hard gate: type-check must pass.
  if (!(await actionCheck())) return;

  const bump = args[0] || (await askSelect("Bump type:", [
    { title: "patch", value: "patch" },
    { title: "minor", value: "minor" },
    { title: "major", value: "major" },
    { title: "specific version", value: "specific" },
  ]));
  if (!bump) return;

  let newVer;
  if (bump === "specific") {
    const entered = args[1] || (await askText("New version (x.y.z):", pkg.version));
    if (!entered) return;
    newVer = semver.valid(entered);
    if (!newVer) {
      console.log(`✗ “${entered}” is not a valid version`);
      return;
    }
    if (!semver.gt(newVer, pkg.version) && !(await confirm(`${newVer} is not greater than current ${pkg.version}. Continue anyway?`))) {
      return;
    }
  } else {
    newVer = semver.inc(pkg.version, bump);
  }

  if (!(await confirm(`Release ${newVer} (current ${pkg.version})?`))) return;

  if (isDir(versionDir(newVer)) && !(await confirm(`versions/${newVer}/ already exists. Overwrite?`))) return;

  const wantStub = await confirm(`Create changelog stub src/changelog/${newVer}.txt if absent?`, true);
  if (wantStub) await createChangelog(newVer, true);

  // Bump package.json (restores the trailing newline generate.js dropped).
  const updated = { ...pkg, version: newVer };
  writePkg(updated);
  console.log(`✓ package.json → ${newVer}`);

  // Build the release version (rollup auto-generates the semver loader).
  runRollup({ version: newVer });
  verifyBuild(newVer);

  // Optionally refresh the `latest` channel (built directly, not copied).
  if (await confirm("Refresh the `latest` channel now?", git.branch === "main")) {
    await refreshChannel("latest", false);
    verifyBuild("latest");
  }

  console.log("\nDone. Review & commit these paths (the script does not auto-commit):");
  console.log(`  package.json`);
  console.log(`  versions/${newVer}/`);
  console.log(`  src/changelog/${newVer}.txt`);
}

// ---------------------------------------------------------------------------
// menu + CLI dispatch
// ---------------------------------------------------------------------------

const MENU = [
  { title: "Type-check", value: "check", description: "tsc --noEmit" },
  { title: "Dev build + serve", value: "watch", description: "rollup debug + http-server :3041" },
  { title: "Build a version (release)", value: "build", description: "semver target → versions/<v>/" },
  { title: "Release new version", value: "release", description: "bump + build + refresh latest" },
  { title: "Refresh a channel", value: "refresh", description: "build latest/beta/unstable/stable directly" },
  { title: "Regenerate channel loaders", value: "loaders", description: "loader.user.js + bookmark.js only" },
  { title: "Create changelog stub", value: "changelog", description: "src/changelog/<v>.txt" },
  { title: "Git status / branch", value: "git" },
  { title: "Verify a build", value: "verify" },
  { title: "Quit", value: "quit" },
];

async function runAction(action, args = []) {
  switch (action) {
    case "check": return actionCheck();
    case "watch": return actionWatch();
    case "build": return actionBuildVersion(args);
    case "release": return actionRelease(args);
    case "refresh": return actionRefreshChannel(args);
    case "loaders": return actionRegenLoaders(args);
    case "changelog": return actionChangelog(args);
    case "git": return actionGit();
    case "verify": return actionVerify(args);
    default: console.log(`Unknown action: ${action}`);
  }
}

async function menu() {
  while (true) {
    const pkg = readPkg();
    const g = gitInfo();
    console.log(`\nABCL build  —  version ${pkg.version}  |  branch ${g.branch}  |  tree ${g.clean ? "clean" : "dirty"}`);
    const action = await askSelect("What do you want to do?", MENU);
    if (!action || action === "quit") break;
    await runAction(action);
  }
}

async function dispatchCLI(argv) {
  // Flags: --yes / -y auto-confirms everything (non-interactive mode).
  const positional = [];
  for (const a of argv) {
    if (a === "--yes" || a === "-y") AUTO_YES = true;
    else positional.push(a);
  }
  const [cmd, ...rest] = positional;
  if (!cmd) return menu();
  await runAction(cmd, rest);
}

dispatchCLI(process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exit(1);
});
