const typescript = require("@rollup/plugin-typescript");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const replace = require("@rollup/plugin-replace");
const cleanup = require("rollup-plugin-cleanup");
const copy = require("rollup-plugin-copy");
const terser = require("@rollup/plugin-terser");
const json = require("@rollup/plugin-json");
const postcss = require("rollup-plugin-postcss");
const alias = require("@rollup/plugin-alias");

const pkg = require("./package.json");
const deployFileName = "abcl.js";

const buildSettings = {
  input: pkg.buildSettings.input,
  scriptId: pkg.buildSettings.scriptId,
};

const loaderFileInfo = {
  deploy: `${deployFileName}`,
  description: `${pkg.description}`,
  name: `${pkg.displayName} (Loader)`,
  author: `${pkg.author}`,
};

const modInfo = {
  name: `"${pkg.displayName}"`,
  version: `"${pkg.version}"`,
  identifier: `"${pkg.buildSettings.identifier.replace(/[^A-Za-z0-9]/g, "")}"`,
  repo: (() => {
    if (!pkg.repository || !pkg.repository.url) return "undefined";
    if (pkg.repository.url.startsWith("git+")) return `"${pkg.repository.url.replace("git+", "").replace(".git", "")}"`;
    return `"${pkg.repository.url.replace(".git", "")}"`;
  })(),
};

const scriptId = `"${buildSettings.scriptId ?? ""}"`;
const loadFlag = `${pkg.buildSettings.identifier.replace(/[^A-Za-z0-9]/g, "")}_Loaded`;

const default_config = (debug, destDir) => ({
  input: `src/${buildSettings.input}`,
  output: {
    file: `${destDir}/${deployFileName}`,
    format: "iife",
    sourcemap: debug ? "inline" : true,
    banner: ``,
  },
  treeshake: true,
});
const plugins_debug = (deploySite, destDir) => [
  copy({
    targets: [
      /\d+.\d+.\d+/.test(loaderFileInfo.version) && {
        src: `./build-files/loader.user.js`,
        dest: destDir,
        transform: contents =>
          contents
            .toString()
            .replaceAll("__DEPLOY_SITE__", `${deploySite}`)
            .replaceAll("__VERSION__", loaderFileInfo.version)
            .replaceAll("__DESCRIPTION__", loaderFileInfo.description)
            .replaceAll(
              "__NAME__",
              deploySite.indexOf("localhost") > -1
                ? loaderFileInfo.name + " (Local)"
                : deploySite.indexOf("/dev/") > -1
                ? loaderFileInfo.name + " (Dev)"
                : loaderFileInfo.name,
            )
            .replaceAll("__AUTHOR__", loaderFileInfo.author)
            .replaceAll("__LOAD_FLAG__", loadFlag)
            .replaceAll("__SCRIPT_ID__", scriptId),
      },
      {
        src: `src/assets/*`,
        dest: `${destDir}/assets`,
      },
    ],
  }),
  replace({
    modName: modInfo.name,
    modVersion: modInfo.version,
    modRepo: modInfo.repo,
    publicURL: `"${deploySite}/assets"`,
    modLoadFlag: loadFlag,
    modIdentifier: modInfo.identifier,
    modScriptId: scriptId,
    preventAssignment: false,
    "use client": "",
  }),
  commonjs(),
  resolve({ browser: true }),
  typescript({
    exclude: ["**/__tests__", "**/*.test.ts"],
    tsconfig: `tsconfig.json`,
    inlineSources: true,
  }),
  cleanup(),
  json(),
  postcss({
    inject: true,
    minimize: true,
  }),
  alias({
    entries: [
      { find: "react", replacement: "preact/compat" },
      { find: "react-dom/test-utils", replacement: "preact/test-utils" },
      { find: "react-dom", replacement: "preact/compat" },
      { find: "react/jsx-runtime", replacement: "preact/jsx-runtime" },
    ],
  }),
];

const plugins = (deploySite, destDir) => [...plugins_debug(deploySite, destDir), terser({ sourceMap: true })];

module.exports = cliArgs => {
  const version = cliArgs.configVersion;
  loaderFileInfo.version = version;
  const destDir = `${process.env.INIT_CWD}/versions/${version}`;
  console.log(`Version ${version} is set to be published`);
  if (!version) throw new Error("No version specified");
  const debug = !!cliArgs.configDebug;
  const deploy = cliArgs.configDeploy;
  if (!deploy) throw new Error("No deploy site specified");
  console.log(`${debug ? "dev" : "release"} is set deployed to ${deploy}`);

  if (debug) return { ...default_config(debug, destDir), plugins: plugins_debug(deploy, destDir) };
  return { ...default_config(debug, destDir), plugins: plugins(deploy + `/versions/${version}`, destDir) };
};
