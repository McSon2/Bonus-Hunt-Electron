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


// DATABASE

const database = require('better-sqlite3-multiple-ciphers');
const data = path.join( app.getPath("userData"), "bh.db" );
const db = new database(data)

// IndexHTML DATABASE

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

ipcMain.handle("bonushunt", () => {
  const stmt = db.prepare('SELECT id, title, start,date,(Select count(*) from hunt where hunt.id_bonushunt = bonus_hunt.id) as nbbonus, ((SELECT SUM(payout) FROM hunt where hunt.id_bonushunt = bonus_hunt.id)-(SELECT start FROM bonus_hunt where bonus_hunt.id = hunt.id_bonushunt)) as profitloss from bonus_hunt JOIN hunt on bonus_hunt.id = hunt.id_bonushunt GROUP BY id');
  const res = stmt.all();
  return res;
})

ipcMain.on("newHunt", function (event, title,start,date) {
  const sql = db.prepare('INSERT INTO bonus_hunt (title,start,date) VALUES (:title, :start, :date)');
  sql.run({title,start,date})
})

ipcMain.on("deletehunt", function (event, id) {
  const stmt = db.prepare('DELETE from bonus_hunt WHERE id=:id');
  stmt.run ({id})
})

ipcMain.on("updatehunt", function (event, title,start,date,id) {
  const sql = db.prepare('UPDATE bonus_hunt SET title=:title, start=:start, date=:date WHERE id=:id');
  sql.run({title,start,date,id})
})

ipcMain.handle("getidhunt", function (event, title) {
  const stmt = db.prepare('SELECT id from bonus_hunt where title=:title');
  const res = stmt.all({title});
  return res
})


// BonusHTML DATABASE


ipcMain.handle("ProfitLossbyid", function (event, id) {
  const stmt = db.prepare('SELECT id, ((SELECT SUM(payout) FROM hunt where hunt.id_bonushunt = bonus_hunt.id)-(SELECT start FROM bonus_hunt where bonus_hunt.id = hunt.id_bonushunt)) as profitloss from bonus_hunt JOIN hunt on bonus_hunt.id = hunt.id_bonushunt WHERE id=:id GROUP BY id');
  const res = stmt.all({id});
  return res
})

ipcMain.handle("CountBonusbyid", function (event, id) {
  const stmt = db.prepare('SELECT count(*) as NB_Bonus FROM hunt where id_bonushunt=:id');
  const res = stmt.all({id});
  return res
})

ipcMain.handle("startbyid", function (event, id) {
  const stmt = db.prepare('SELECT start FROM bonus_hunt where id=:id');
  const res = stmt.all({id});
  return res
})

ipcMain.handle("hunt", function (event, id) {
  const stmt = db.prepare('SELECT hunt.id_bonushunt as idhunt, hunt.id_slots as id, slots.slot, slots.provider, hunt.bet_size, hunt.payout, hunt.multiplier from hunt join slots on hunt.id_slots = slots.id where id_bonushunt=:id');
  const res = stmt.all({id});
  return res
})

ipcMain.handle("slots", function (event, id) {
  const stmt = db.prepare('select id, slot FROM slots');
  const res = stmt.all();
  return res
})

ipcMain.on("newbonus", function (event, idhunt,slotid,betsize) {
  const sql = db.prepare('INSERT INTO hunt (id_bonushunt,id_slots,bet_size) VALUES (:idhunt, :slotid, :betsize)');
  sql.run({idhunt,slotid,betsize})
})

ipcMain.on("deletebonus", function (event, id) {
  const stmt = db.prepare('DELETE from hunt WHERE id_slots=:id');
  stmt.run ({id})
})

ipcMain.on("updatebonus", function (event, idhunt,id,bet,payout) {
  const sql = db.prepare('UPDATE hunt SET bet_size=:bet, payout=:payout WHERE id_bonushunt=:idhunt and id_slots=:id');
  sql.run({idhunt,id,bet,payout})
})

ipcMain.handle("amountwon", function (event, id) {
  const stmt = db.prepare('select sum(payout) as amountwon from hunt where id_bonushunt=:id');
  const res = stmt.all({id});
  return res
})

ipcMain.handle("avgrequire", function (event, id) {
  const stmt = db.prepare('SELECT ((bonus_hunt.start - SUM(hunt.payout)) / (SELECT COUNT(*) FROM hunt WHERE hunt.payout IS NULL)) as BE FROM hunt JOIN bonus_hunt on bonus_hunt.id = hunt.id_bonushunt where id_bonushunt=:id');
  const res = stmt.all({id});
  return res
})

ipcMain.handle("avg", function (event, id) {
  const stmt = db.prepare('SELECT avg(hunt.payout) as AVG FROM hunt where id_bonushunt=:id');
  const res = stmt.all({id});
  return res
})

ipcMain.handle("bex", function (event, id) {
  const stmt = db.prepare('SELECT ((SELECT ((bonus_hunt.start - SUM(hunt.payout)) / (SELECT COUNT(*) FROM hunt WHERE hunt.payout IS NULL)) FROM hunt JOIN bonus_hunt on bonus_hunt.id = hunt.id_bonushunt where id_bonushunt=:id) / avg(hunt.bet_size)) as BEX FROM hunt WHERE hunt.payout IS NULL');
  const res = stmt.all({id});
  return res
})

ipcMain.handle("avgx", function (event, id) {
  const stmt = db.prepare('SELECT avg(hunt.multiplier) as AVGX FROM hunt where id_bonushunt=:id');
  const res = stmt.all({id});
  return res
})

ipcMain.handle("remain", function (event, id) {
  const stmt = db.prepare('SELECT COUNT(*) as Remain FROM hunt WHERE hunt.payout IS NULL and id_bonushunt=:id');
  const res = stmt.all({id});
  return res
})

ipcMain.handle("cent", function (event, id) {
  const stmt = db.prepare('SELECT COUNT(*) as cent FROM hunt WHERE hunt.multiplier >= 100 and id_bonushunt=:id');
  const res = stmt.all({id});
  return res
})

//BonushuntHTML

ipcMain.handle("bonushuntpage", () => {
  const stmt = db.prepare('SELECT id, title, start,date,(Select count(*) from hunt where hunt.id_bonushunt = bonus_hunt.id) as nbbonus from bonus_hunt group by id');
  const res = stmt.all();
  return res;
})

ipcMain.handle("avghuntwin", () => {
  const stmt = db.prepare('SELECT ((Select sum(payout))/(Select count(*))/(Select count(*) from bonus_hunt)) as avg from hunt');
  const res = stmt.all();
  return res;
})

ipcMain.on("bestslot", function (event, id) {
  const stmt = db.prepare('select slot,max(payout) as best from (select payout, slots.slot, bonus_hunt.id from hunt join slots on hunt.id_slots = slots.id join bonus_hunt on hunt.id_bonushunt = bonus_hunt.id) where id=:id');
  const res = stmt.all({id});
  event.returnValue = res
})

ipcMain.on("worstslot", function (event, id) {
  const stmt = db.prepare('select slot,min(payout) as worst from (select payout, slots.slot, bonus_hunt.id from hunt join slots on hunt.id_slots = slots.id join bonus_hunt on hunt.id_bonushunt = bonus_hunt.id) where id=:id');
  const res = stmt.all({id});
  event.returnValue = res
})

//slotHTML

ipcMain.handle("allslot", () => {
  const stmt = db.prepare('SELECT id,slot,provider,rtp,volatility,potential from slots');
    const res = stmt.all();
    return res;
})

ipcMain.on("updateslot", function (event, id,slot,provider,rtp,volatility,potential) {
  const sql = db.prepare('UPDATE slots SET slot=:slot, provider=:provider, rtp=:rtp, volatility=:volatility, potential=:potential WHERE id=:id');
    sql.run({id,slot,provider,rtp,volatility,potential})
})

ipcMain.handle("provider", () => {
  const stmt = db.prepare('SELECT id, provider from slots group by provider');
    const res = stmt.all();
    return res;
})

ipcMain.handle("providerbyid", function (event, id) {
  const stmt = db.prepare('SELECT provider FROM slots where id=:id');
    const res = stmt.all({id});
    return res
})

ipcMain.on("newslot", function (event, slot,provider,rtp,volatility,potential) {
  const sql = db.prepare('INSERT INTO slots (slot,provider,rtp,volatility,potential) VALUES (:slot, :provider, :rtp, :volatility, :potential)');
  sql.run({slot,provider,rtp,volatility,potential})
})