import { app, BrowserWindow, ipcMain, dialog } from "electron";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\");
}

let preventClose = false;

let mainWindow;
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false
    },
    vibrancy: "ultra-dark",
    backgroundColor: "#80FFFFFF"
  });

  mainWindow.loadURL(winURL);

  mainWindow.on("close", event => {
    if (preventClose) {
      const choice = dialog.showMessageBoxSync({
        type: "question",
        buttons: ["Save", "Cancel", "Don't Save"],
        title: "Confirm",
        message: "Do you want to save the changes you've made?",
        detail: "Your changes will be lost if you do not save them."
      });

      if (choice == 0 || choice == 1) {
        event.preventDefault();
        if (choice == 0) {
          mainWindow.webContents.send("file-save");
        }
      }
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

ipcMain.on("prevent-close", (event, data) => {
  preventClose = data;
});

app.on("will-finish-launching", function() {
  app.on("open-file", function(ev, path) {
    mainWindow.webContents.send("file-open-system", path);
  });
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
