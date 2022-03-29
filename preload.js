const {ipcRenderer, contextBridge} = require("electron");


const API = {
    window: {
        close: () => ipcRenderer.send("app/close"),
        minimize: () => ipcRenderer.send("app/minimize"),
        size: () => ipcRenderer.send("app/size"),
        reload: () => ipcRenderer.send("app/reload"),
        nbbonus: () => ipcRenderer.invoke("getNbbonus"),
        gettotalcost: () => ipcRenderer.invoke("getTotalCost"),
        getTotalWin: () => ipcRenderer.invoke("getTotalWin"),
        getProfitLoss: () => ipcRenderer.invoke("getProfitLoss"),
        date: () => ipcRenderer.invoke("date"),
        ProfitLoss: () => ipcRenderer.invoke("ProfitLoss"),
        bonushunt: () => ipcRenderer.invoke("bonushunt"),
        newHunt: (title,start,date) => ipcRenderer.send("newHunt", title,start,date),
        deletehunt: (id) => ipcRenderer.send("deletehunt", id),
        updatehunt: (title,start,date,id) => ipcRenderer.send("updatehunt", title,start,date,id),
        getidhunt: (title) => ipcRenderer.invoke("getidhunt", title),
        ProfitLossbyid: (id) => ipcRenderer.invoke("ProfitLossbyid", id),
        CountBonusbyid: (id) => ipcRenderer.invoke("CountBonusbyid", id),
        startbyid: (id) => ipcRenderer.invoke("startbyid", id),
        hunt: (id) => ipcRenderer.invoke("hunt", id),
        slots: (id) => ipcRenderer.invoke("slots", id),
        newbonus: (idhunt,slotid,betsize) => ipcRenderer.send("newbonus", idhunt,slotid,betsize),
        deletebonus: (id) => ipcRenderer.send("deletebonus", id),
        updatebonus: (idhunt,id,bet,payout) => ipcRenderer.send("updatebonus", idhunt,id,bet,payout),
        amountwon: (id) => ipcRenderer.invoke("amountwon", id),
        avgrequire: (id) => ipcRenderer.invoke("avgrequire", id),
        avg: (id) => ipcRenderer.invoke("avg", id),
        bex: (id) => ipcRenderer.invoke("bex", id),
        avgx: (id) => ipcRenderer.invoke("avgx", id),
        remain: (id) => ipcRenderer.invoke("remain", id),
        bonushuntpage: () => ipcRenderer.invoke("bonushuntpage"),
        avghuntwin: () => ipcRenderer.invoke("avghuntwin"),
        bestslot: (id) => ipcRenderer.sendSync("bestslot", id),
        worstslot: (id) => ipcRenderer.sendSync("worstslot", id),
        cent: (id) => ipcRenderer.invoke("cent", id),
        allslot: () => ipcRenderer.invoke("allslot"),
        provider: () => ipcRenderer.invoke("provider"),
        providerbyid: (id) => ipcRenderer.invoke("providerbyid", id),
        updateslot: (id,slot,provider,rtp,volatility,potential) => ipcRenderer.send("updateslot", id,slot,provider,rtp,volatility,potential),
        newslot: (slot,provider,rtp,volatility,potential) => ipcRenderer.send("newslot", slot,provider,rtp,volatility,potential)

    }
}

contextBridge.exposeInMainWorld("app", API)
