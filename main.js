const electron = require("electron");
const app = electron.app;
const ipcMain = electron.ipcMain;
const { autoUpdater } = require("electron-updater");
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const log = a => {
  mainWindow.webContents.send("log", a);
  console.log(a);
};
// require('electron-reload')(path.join(__dirname, 'site'));
let mainWindow;
let KORONA;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 350, frame: false });

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "site", "index.html"),
      protocol: "file:",
      slashes: true,
      icon: "/assets/icon-8.png"
    })
  );

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", function() {
  createWindow();
  autoUpdater.checkForUpdates();
});

//AUTOUPDATE//AUTOUPDATE
autoUpdater.on("update-available", info => {
  log("uusi update asennettavissa");
});

autoUpdater.on("update-not-available", info => {
  log("uusi update asennettavissa");
});

autoUpdater.on("update-downloaded", info => {
  log("updaatti valmis! :)");
  mainWindow.webContents.send("updateReady");
});

// when receiving a quitAndInstall signal, quit and install the new version ;)
ipcMain.on("quitAndInstall", (event, arg) => {
  log("Test update");
  try {
    autoUpdater.quitAndInstall();
  } catch(err) {
    log(err)
  }
});
//AUTOUPDATE//AUTOUPDATE

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

process.on("unhandledRejection", (reason, p) => {
  log(reason, "Unhandled Rejection at Promise", p);
});
