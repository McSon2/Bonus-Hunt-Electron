const { app, BrowserWindow, ipcMain } = require("electron");
const { dirname } = require("path");
const path = require("path");
const ipc = ipcMain;

//Window
function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1024,
    minHeight: 640,
    closable: true,
    darkTheme: true,
    frame: false,
    icon: path.join(__dirname, "/ico.ico"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();

  ipc.on("app/close", () => {
    app.quit()
  })
  
  ipc.on("app/minimize", () => {
    win.minimize()
  })
  
  ipc.on("app/size", () => {
    if (win.isMaximized()) {
      win.restore();
      win.resizable = true
    } else {
      win.maximize();
      win.resizable = false
    }
  })
}

// When Electron Ready
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});