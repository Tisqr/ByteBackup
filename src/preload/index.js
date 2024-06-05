const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  copyFiles: async (dataSource, backupLoc) =>
    ipcRenderer.invoke('copy-files', dataSource, backupLoc)
})

contextBridge.exposeInMainWorld('store', {
  copyFiles: async (key, value) => ipcRenderer.invoke('store-set', key, value)
})
