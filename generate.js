const childProcess = require("child_process");
const pkg = require("./package.json");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
readline.question(`Release version ${pkg.version}? (y/n) (or number to release a different version): `, answer => {
  console.log(answer);
  if (answer === "y" || answer === "") {
    readline.close();
    childProcess.execSync(`rollup -c rollup.config.js --configVersion ${pkg.version} --configDeploy https://zoe-64.github.io/ABCL`, { stdio: "inherit" });
  } else {
    childProcess.execSync(`rollup -c rollup.config.js --configVersion ${answer} --configDeploy https://zoe-64.github.io/ABCL`, { stdio: "inherit" });
  }
});
