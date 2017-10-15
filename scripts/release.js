const path = require('path');
const { version } = require('../package.json');
const fse = require('fs-extra-promise');
const { exec, spawn } = require('child-process-promise');
const semver = require('semver');
const { confirm } = require('node-ask');

const releasePath = path.resolve(__dirname, '../release');
const releaseAssetsPath = path.resolve(__dirname, '../release-assets');
const distPath = path.resolve(__dirname, '../dist');
const repoUrl = 'https://github.com/ocboogie/ocboogie.github.io.git';
const repobranch = 'master';

function removeAllButGit(dirPath) {
  return fse.readdirAsync(dirPath).then((files) => {
    const promises = [];
    files.forEach((file) => {
      if (file !== '.git') {
        const fullPathFileName = path.join(dirPath, file);
        promises.push(fse.removeAsync(fullPathFileName));
      }
    });
    return Promise.all(promises);
  });
}

// Assert valid package version.
if (semver.valid(version) === null) {
  console.log('The package version must be valid.');
  process.exit(1);
}

// Ensure that the release folder is there.
fse.ensureDirAsync(releasePath).then(() => {
  // Empty the release folder.
  return fse.emptyDir(releasePath);
})
  .delay(350) // To prevent git clone errors
  .then(() => {
    // Clone repository to the release folder.
    return exec(`git clone ${repoUrl} .`, { cwd: releasePath });
  })
  .then(() => {
    // Checkout repository branch.
    return exec(`git checkout ${repobranch}`, { cwd: releasePath });
  })
  .then(() => {
    // Get last commit's message, which should be the version.
    return exec('git log -1 --pretty=%B', { cwd: releasePath });
  })
  .then((result) => {
    const gitVersion = result.stdout.toString().trim();
    // Assert that it's a new version
    if (semver.valid(gitVersion) !== null && semver.lte(version, gitVersion)) {
      console.log('Please update the version in package.json to release');
      process.exit(1);
    }
    // Ensure that the dist folder exists
    return fse.ensureDirAsync(distPath);
  })
  .then(() => {
    // Ensure that the release assets folder exists
    return fse.ensureDirAsync(releaseAssetsPath);
  })
  .then(() => {
    return removeAllButGit(releasePath);
  })
  .then(() => {
    // Copy over the dist files
    return fse.copyAsync(distPath, releasePath);
  })
  .then(() => {
    // Copy over the release assets
    return fse.copyAsync(releaseAssetsPath, releasePath);
  })
  .then(() => {
    // Stage all files
    return exec('git add -A', { cwd: releasePath });
  })
  .then(() => {
    // Commit files with the name of the version
    console.log('test 1');
    return exec(`git commit -m ${version}`, { cwd: releasePath });
  })
  .then(() => {
    console.log('test 2');
    // Log summary
    return exec('git show --color --summary', { cwd: releasePath });
  })
  .then((result) => {
    console.log(result.stdout);
    // Log files changed
    return exec('git diff --name-status HEAD HEAD~1 --color', { cwd: releasePath });
  })
  .then((result) => {
    console.log(result.stdout);
    return confirm('Are you sure you want to push to repo? ');
  })
  // eslint-disable-next-line consistent-return
  .then((answer) => {
    if (!answer) {
      console.log('Not pushing');
      process.exit(1);
    }
    const gitPushPromise = spawn('git', ['push'], { cwd: releasePath });

    const gitPushChildProcess = gitPushPromise.childProcess;

    gitPushChildProcess.stdout.on('data', (data) => {
      console.log('git push: ', data.toString());
    });
    gitPushChildProcess.stderr.on('data', (data) => {
      console.log('git push: ', data.toString());
    });
    return gitPushPromise;
  })
  .catch((err) => {
    console.log(err);
  })
  .done(() => {
    console.log('Pushed to remote successfully');
  });
