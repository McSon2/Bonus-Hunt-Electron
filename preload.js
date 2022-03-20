const {ipcRenderer, contextBridge} = require("electron");
const db = require("./js/db");

const getNbonus = () => {
    return db.getNbonus();
}

const getTotalCost = () => {
    return db.getTotalCost();
}

const getTotalWin = () => {
    return db.getTotalWin();
}

const getProfitLoss = () => {
    return db.getProfitLoss();
}

const newHunt = (title,start,date) => {
    db.newHunt(title,start,date);
}

const date = () => {
    return db.date();
}

const ProfitLoss = () => {
    return db.ProfitLoss();
}

const bonushunt = () => {
    return db.bonushunt();
}

const deletehunt = (id) => {
    db.deletehunt(id);
}

const updatehunt = (title,start,date,id) => {
    db.updatehunt(title,start,date,id);
}

const ProfitLossbyid = (id) => {
    db.ProfitLossbyid(id);
    return db.ProfitLossbyid(id);
}

const CountBonusbyid = (id) => {
    db.CountBonusbyid(id);
    return db.CountBonusbyid(id);
}

const startbyid = (id) => {
    db.startbyid(id);
    return db.startbyid(id);
}

const hunt = (id) => {
    db.hunt(id);
    return db.hunt(id);
}

const slots = () => {
    return db.slots();
}

const newbonus = (idhunt,slotid,betsize) => {
    db.newbonus(idhunt,slotid,betsize);
}

const deletebonus = (id) => {
    db.deletebonus(id);
}

const getidhunt = (title) => {
    db.getidhunt(title);
    return db.getidhunt(title);
}


const API = {
    window: {
        close: () => ipcRenderer.send("app/close"),
        minimize: () => ipcRenderer.send("app/minimize"),
        size: () => ipcRenderer.send("app/size"),
        reload: () => ipcRenderer.send("app/reload")
    }
}


contextBridge.exposeInMainWorld("app", API)
contextBridge.exposeInMainWorld("api", {
    getNbonus: getNbonus,
    getTotalCost: getTotalCost,
    getTotalWin: getTotalWin,
    getProfitLoss: getProfitLoss,
    newHunt: newHunt,
    date: date,
    bonushunt: bonushunt,
    deletehunt: deletehunt,
    ProfitLoss: ProfitLoss,
    updatehunt: updatehunt,
    ProfitLossbyid: ProfitLossbyid,
    CountBonusbyid: CountBonusbyid,
    startbyid: startbyid,
    hunt: hunt,
    slots: slots,
    newbonus: newbonus,
    deletebonus: deletebonus,
    getidhunt: getidhunt
})
