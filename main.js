const { app, BrowserWindow } = require("electron");
const path = require("path");
const { dialog } = require("electron");
const fs = require("fs");
let win = null;

function createWindow() {
  fs.access("/etc/backslashlinux/version.conf", fs.constants.F_OK, (err) => {
    if (err) {
      const options = {
        type: "error",
        buttons: ["Ok"],
        title: "Unsupported System",
        message: "Unsupported System",
        detail:
          "This app is only supported on BackSlash Linux systems. Please download and install BackSlash Linux to run this app.",
      };

      dialog.showMessageBox(null, options).then((result) => {
        if (result.response === 0) {
          app.quit();
        }
      });
    } else {
      fs.existsSync("/etc/backslashlinux/version.conf");
      // Create the browser window.
      win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
        },
        frame: false,
        icon: path.join(__dirname, "icon.png"),
        resizable: false,
      });
      win.loadFile("app/index.html");

      // Open the DevTools.
      // win.webContents.openDevTools()
      win.on("closed", () => {
        win = null;
      });
    }
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
