const typescript = require("@rollup/plugin-typescript");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const replace = require("@rollup/plugin-replace");
const cleanup = require("rollup-plugin-cleanup");
const copy = require("rollup-plugin-copy");
const terser = require("@rollup/plugin-terser");
const json = require("@rollup/plugin-json");
const path = require("path");
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
    if (pkg.repository.url.startsWith("git+"))
      return `"${pkg.repository.url.replace("git+", "").replace(".git", "")}"`;
    return `"${pkg.repository.url.replace(".git", "")}"`;
  })(),
};

const scriptId = `"${buildSettings.scriptId ?? ""}"`;
const loadFlag = `${pkg.buildSettings.identifier.replace(
  /[^A-Za-z0-9]/g,
  ""
)}_Loaded`;
const destDir = `${process.env.INIT_CWD}/public/`;

const default_config = (debug) => ({
  input: `src/${buildSettings.input}`,
  output: {
    file: `${destDir}/${deployFileName}`,
    format: "iife",
    sourcemap: debug ? "inline" : true,
    banner: ``,
  },
  treeshake: true,
});

const plugins_debug = (deploySite) => [
  copy({
    targets: [
      {
        src: `loader.user.js`,
        dest: destDir,
        transform: (contents) =>
          contents
            .toString()
            .replace(
              "__DEPLOY_SITE__",
              `${deploySite}/${loaderFileInfo.deploy}`
            )
            .replace("__FAVICON__", `${deploySite}/assets/favicon.ico`)
            .replace("__DESCRIPTION__", loaderFileInfo.description)
            .replace(
              "__NAME__",
              deploySite.indexOf("localhost") > -1
                ? loaderFileInfo.name + " (Local)"
                : deploySite.indexOf("/dev/") > -1
                ? loaderFileInfo.name + " (Dev)"
                : loaderFileInfo.name
            )
            .replace("__AUTHOR__", loaderFileInfo.author)
            .replace("__LOAD_FLAG__", loadFlag)
            .replace("__SCRIPT_ID__", scriptId),
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
];

const plugins = (deploySite) => [
  ...plugins_debug(deploySite),
  terser({ sourceMap: true }),
];

module.exports = (cliArgs) => {
  const debug = !!cliArgs.configDebug;
  const deploy = cliArgs.configDeploy;
  if (!deploy) throw new Error("No deploy site specified");
  console.log(`${debug ? "dev" : "release"} is set deployed to ${deploy}`);

  if (debug)
    return { ...default_config(debug), plugins: plugins_debug(deploy) };
  return { ...default_config(debug), plugins: plugins(deploy) };
};
