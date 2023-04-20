// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { autoUpdater } = require("electron-updater");
const path = require('path');
const fs = require("fs");
const ipc = ipcMain;
const isDev = require('electron-is-dev');
require('@electron/remote/main').initialize();

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 850,
    icon: "logo.ico",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      javascript: true,
    },
    transparent: true,
    frame: false,
    autoHideMenuBar: true,
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`)

  ipc.on('closeApp', () => {
    mainWindow.close();
  })

  ipc.on('maximizeApp', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  })

  ipc.on('minimizeApp', () => {
    mainWindow.minimize();
  })

  // alert(isDev)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  if (!isDev) {
    autoUpdater.checkForUpdates();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

autoUpdater.on("update-available", (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['OK'],
    title: 'Notification de mise à jour',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'Une nouvelle version du Logiciel est en téléchargement...'
  }
  dialog.showMessageBox(dialogOpts, (response) => {

  });
})

autoUpdater.on("update-downloaded", (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Redémarrer', 'Me le rappeler plus tard'],
    title: 'Mise à jour Yambi Class SMIS',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'Une nouvelle version du Logiciel a été téléchargée. Redémarrer Yambi Class SMIS pour appliquer les modifications.'
  };
  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.