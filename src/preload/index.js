const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  copyFiles: async (dataSource, backupLoc) =>
    ipcRenderer.invoke('copy-files', dataSource, backupLoc),
  updateFile: async (data) => ipcRenderer.invoke('update-file', data), // Moved into the same object
  getFile: () => ipcRenderer.invoke('get-file')
})
