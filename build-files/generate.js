const childProcess = require("child_process");
const pkg = require("../package.json");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function isVersionGreater(newVersion, currentVersion) {
  const newParts = newVersion.split(".").map(Number);
  const currentParts = currentVersion.split(".").map(Number);

  for (let i = 0; i < Math.max(newParts.length, currentParts.length); i++) {
    const newPart = newParts[i] || 0;
    const currentPart = currentParts[i] || 0;
    if (newPart > currentPart) return true;
    if (newPart < currentPart) return false;
  }
  return false;
}

function updatePackageJsonVersion(newVersion) {
  const packagePath = "../package.json";
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  packageJson.version = newVersion;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  console.log(`✅ Updated package.json version to ${newVersion}`);
}

readline.question(`Release version ${pkg.version}? (y/{version}) (or number to release a different version): `, answer => {
  let releaseVersion = pkg.version;

  if (answer === "y" || answer === "") {
    releaseVersion = pkg.version;
  } else {
    releaseVersion = answer;
  }

  // Check if new version is greater than current
  if (isVersionGreater(releaseVersion, pkg.version)) {
    console.log(`📦 Updating version from ${pkg.version} to ${releaseVersion}`);
    updatePackageJsonVersion(releaseVersion);
  } else if (releaseVersion !== pkg.version) {
    console.log(`⚠️  Version ${releaseVersion} is not greater than current version ${pkg.version}. Skipping update.`);
  } else {
    console.log(`📦 Keeping current version ${pkg.version}`);
  }

  // Run rollup with the release version
  childProcess.execSync(`rollup -c rollup.config.js --configVersion ${releaseVersion} --configDeploy https://zoe-64.github.io/ABCL`, {
    stdio: "inherit",
  });

  readline.close();
});
