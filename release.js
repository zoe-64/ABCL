const childProcess = require("child_process");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
childProcess.execSync("npm --no-git-tag-version version minor");
const pkg = require("./package.json");
readline.question(`Release version ${pkg.version}? (y/n) (or number to release a different version): `, answer => {
  if (answer === "y" || answer === "") {
    readline.close();
    childProcess.execSync(`rollup -c rollup.config.js --configVersion latest --configDeploy https://zoe-64.github.io/ABCL`, { stdio: "inherit" });
    childProcess.execSync(`rollup -c rollup.config.js --configVersion ${pkg.version} --configDeploy https://zoe-64.github.io/ABCL`, { stdio: "inherit" });
  } else if (!isNaN(answer)) {
    const folderPath = `./versions/${answer}`;
    if (fs.existsSync(folderPath)) {
      childProcess.execSync(`rm -rf ./versions/latest`, { stdio: "inherit" });
      childProcess.execSync(`cp -r ${folderPath} ./versions/latest`, { stdio: "inherit" });
    } else {
      console.log(`Version ${answer} does not exist`);
    }
  } else {
    console.log("Invalid input, aborting.");
    return;
  }
});
