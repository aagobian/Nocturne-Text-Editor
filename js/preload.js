// exposes connection to ipc
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  controlWindow: (action) => ipcRenderer.send('window-control', action),
});