const path = require('path');
const {app, BrowserWindow} = require('electron');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Nocturne',
        width: 800,
        height: 600,
    });

    mainWindow.loadFile(path.join(__dirname, './render/index.html'));
}

app.whenReady().then(() => {
    createMainWindow();
});