const path = require('path'); 
const {app, BrowserWindow, Menu, ipcMain} = require('electron');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Nocturne',
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, './js/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        }

    });

    mainWindow.loadFile(path.join(__dirname, './render/index.html'));

    // Adds inspect element button on right click for debugging purposes.
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
      
    // Event listener for header buttons.
    ipcMain.on('window-control', (event, action) => {
        if (action === 'minimize') {
            mainWindow.minimize();
        } 
        else if (action === 'maximize') {
            if (mainWindow.isMaximized()) {
                mainWindow.unmaximize()
            } 
            else {
                mainWindow.maximize();
            }
        }
        else if (action === 'close') {
            mainWindow.close();
        }
    });

    // Quits app if all windows are closed.
    // TODO: Prevent error from occurring when closing
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
      
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
}

app.whenReady().then(() => {
    createMainWindow();
});