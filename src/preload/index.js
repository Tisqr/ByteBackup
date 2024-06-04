const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  copyFile: (source, destination) => ipcRenderer.invoke('copy-file', source, destination)
})
