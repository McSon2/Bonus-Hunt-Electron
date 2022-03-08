const {ipcRenderer, contextBridge} = require("electron")

const API = {
    window: {
        close: () => ipcRenderer.send("app/close"),
        minimize: () => ipcRenderer.send("app/minimize"),
        size: () => ipcRenderer.send("app/size"),
    }
}

contextBridge.exposeInMainWorld("app", API)