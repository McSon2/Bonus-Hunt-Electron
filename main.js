const { app, BrowserWindow, ipcMain } = require("electron");
const { dirname } = require("path");
const path = require("path");
const fs = require("fs");
const { electron, send } = require("process");
const { URLSearchParams } = require("url");
const ipc = ipcMain;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

var file = path.join( app.getPath("userData"), "bh.db" );

if (fs.existsSync (file)) {
}
  else {
    fs.copyFileSync('bh.db',file)
  }

//Window
function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    minWidth: 1024,
    minHeight: 640,
    closable: true,
    darkTheme: true,
    frame: false,
    icon: path.join(__dirname, "./images/ico.ico"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      devTools: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  
  win.loadFile("index.html");
  win.webContents.openDevTools();

  ipc.on("app/close", () => {
    app.quit();
  })
  
  ipc.on("app/minimize", () => {
    win.minimize()
  })

  ipc.on("app/reload", () => {
    win.reload()
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

const database = require('better-sqlite3-multiple-ciphers');
const data = path.join( app.getPath("userData"), "bh.db" );
const db = new database(data)

console.log(db)


ipcMain.handle("getNbbonus", () => {
  const stmt = db.prepare('SELECT count(*) as nbonus FROM bonus_hunt');
  const res = stmt.all();
  return res;
})

ipcMain.handle("getTotalCost", () => {
  const stmt = db.prepare('SELECT SUM(start) as totalcost FROM bonus_hunt');
  const res = stmt.all();
  return res;
})

ipcMain.handle("getTotalWin", () => {
  const stmt = db.prepare('SELECT SUM(payout) as totalwin FROM hunt');
  const res = stmt.all();
  return res;
})

ipcMain.handle("getProfitLoss", () => {
  const stmt = db.prepare('SELECT ((SELECT SUM(payout) as totalwin FROM hunt)-(SELECT SUM(start) as totalcost FROM bonus_hunt)) as ProfitLoss');
  const res = stmt.all();
  return res;
})

ipcMain.handle("date", () => {
  const stmt = db.prepare('SELECT date FROM bonus_hunt');
  const res = stmt.all();
  return res;
})

ipcMain.handle("ProfitLoss", () => {
  const stmt = db.prepare('SELECT ((SELECT SUM(payout) FROM hunt where hunt.id_bonushunt = bonus_hunt.id)-(SELECT start FROM bonus_hunt where bonus_hunt.id = hunt.id_bonushunt)) as profitloss from bonus_hunt JOIN hunt on bonus_hunt.id = hunt.id_bonushunt GROUP BY id');
  const res = stmt.all();
  return res;
})