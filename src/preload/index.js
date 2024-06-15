const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  copyFiles: async (dataSource, backupLoc) =>
    ipcRenderer.invoke('copy-files', dataSource, backupLoc),
  updateFile: async (data) => ipcRenderer.invoke('update-file', data),
  getFile: () => ipcRenderer.invoke('get-file')
})
