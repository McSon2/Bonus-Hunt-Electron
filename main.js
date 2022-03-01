const {app, BrowserWindow} = require ('electron')
const { dirname } = require('path')
const path = require('path')

//Window
function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname,"preload.js")
        }
    })

    win.loadFile ("index.html")
}

// When Electron Ready
app.whenReady().then(() => {
    createWindow()

    app.on('activate',() => {
        if(BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})