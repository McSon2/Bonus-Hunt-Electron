const {ipcRenderer, contextBridge} = require("electron");
const db = require("./js/db");

const getNbonus = () => {
    return db.getNbonus();
}

const getTotalCost = () => {
    return db.getTotalCost();
}

const API = {
    window: {
        close: () => ipcRenderer.send("app/close"),
        minimize: () => ipcRenderer.send("app/minimize"),
        size: () => ipcRenderer.send("app/size"),
    }
}


contextBridge.exposeInMainWorld("app", API)
contextBridge.exposeInMainWorld("api", {
    getNbonus: getNbonus,
    getTotalCost: getTotalCost
})
