const path = require('path'); 
const {app, BrowserWindow, Menu} = require('electron');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Nocturne',
        width: 800,
        height: 600,

    });

    mainWindow.loadFile(path.join(__dirname, './render/index.html'));
    
    const contextMenu = Menu.buildFromTemplate([
        {
          label: 'Inspect Element',
          click: () => {
            mainWindow.webContents.openDevTools({ mode: 'detach' });
          },
        },
      ]);
      
        mainWindow.webContents.on('context-menu', (event) => {
        event.preventDefault();
        contextMenu.popup();
      });
}

app.whenReady().then(() => {
    createMainWindow();
});