const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const childProcess = require("child_process");
const pkg = JSON.parse(fs.readFileSync("./package.json"));

readline.question(
  `Enter the version number you want to publish (press enter to increment version ${pkg.version} by (0.0.+1), or type a new version): `,
  version => {
    const newVersion = version || "patch";

    try {
      childProcess.execSync(`npm --no-git-tag-version version ${newVersion}`, { stdio: "inherit" });
      const newPkg = JSON.parse(fs.readFileSync("./package.json"));
      childProcess.execSync(`nodemon --exec "npm run build:local && http-server ./versions/${newPkg.version}/ -p 3042 --cors" -e js,ts --ignore ./versions`, {
        stdio: "inherit",
      });
    } catch (error) {
      console.error("Error making changes:", error.message);
    }
    readline.close();
  },
);
