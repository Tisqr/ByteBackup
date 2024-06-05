const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  copyFiles: async (dataSource, backupLoc) =>
    ipcRenderer.invoke('copy-files', dataSource, backupLoc)
})
