const {ipcRenderer, contextBridge} = require("electron");
const testMgr = require("./js/testmgr");

const getNames = () => {
    return testMgr.getNames();
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
    getNames: getNames
})

