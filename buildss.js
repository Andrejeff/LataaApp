var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: './dist/win/LataaApp-win32-x64',
  outputDirectory: './dist/win/build',
  authors: 'jeffe',
  exe: 'LataaApp.exe',
  title: "LataaApp",
  setupExe: "LataaAppSetup.exe",
  setupIcon: "./assets/icon.ico"
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));