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
    ProfitLoss: ProfitLoss,
    bonushunt: bonushunt,
    deletehunt:deletehunt
})
