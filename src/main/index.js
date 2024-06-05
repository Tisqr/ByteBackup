import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const fs = require('node:fs')
import path from 'node:path'

function createWindow() {
  const mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      enableRemoteModule: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer based on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

const handleCopy = async (dataSource, backupLoc) => {
  const copyItem = async (src, dest) => {
    try {
      const stats = fs.lstatSync(src)

      if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true })
        }
        const items = fs.readdirSync(src)
        for (const item of items) {
          await copyItem(join(src, item), join(dest, item))
        }
      } else {
        fs.copyFileSync(src, dest)
      }
    } catch (error) {
      console.error(`Failed to copy ${src} to ${dest}:`, error)
    }
  }

  for (const item of dataSource) {
    const fileName = path.basename(item.path)
    const destination = path.join(backupLoc, fileName)

    try {
      await copyItem(item.path, destination)
    } catch (error) {
      console.error(`Failed to handle item ${item.path}:`, error)
    }
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('copy-files', async (event, dataSource, backupLoc) => {
    await handleCopy(dataSource, backupLoc)
    return 'Copy Completed'
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
