import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const fs = require('node:fs').promises
const path = require('path')

function createWindow() {
  const mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 670,
    show: false,
    autoHideMenuBar: true,
    icon: icon,
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

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

const handleUpdateFile = async (data) => {
  const appPath = app.getPath('userData')
  const filePath = path.join(appPath, 'db.json')
  try {
    fs.writeFile(filePath, data)
  } catch (err) {
    console.error(err)
  }
}

const handleGetFile = async () => {
  try {
    const data = await fs.readFile(path.join(app.getPath('userData'), 'db.json'), 'utf8')
    return data
  } catch (error) {
    console.error('Error reading file:', error)
    throw error
  }
}

const handleCopy = async (dataSource, backupLoc) => {
  const copyItem = async (src, dest) => {
    try {
      const stats = await fs.lstat(src)

      if (stats.isDirectory()) {
        if (!(await fs.exists(dest))) {
          await fs.mkdir(dest, { recursive: true })
        }
        const items = await fs.readdir(src)
        for (const item of items) {
          await copyItem(join(src, item), join(dest, item))
        }
      } else {
        await fs.copyFile(src, dest)
      }
    } catch (error) {
      console.error(`Failed to copy ${src} to ${dest}:`, error)
    }
  }

  for (const item of dataSource) {
    const fileName = path.basename(item.path)
    const destination = join(backupLoc, fileName)

    try {
      await copyItem(item.path, destination)
    } catch (error) {
      console.error(`Failed to handle item ${item.path}:`, error)
    }
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.bytebackup')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('copy-files', async (event, dataSource, backupLoc) => {
    await handleCopy(dataSource, backupLoc)
  })

  ipcMain.handle('update-file', async (event, data) => {
    await handleUpdateFile(data)
  })

  ipcMain.handle('get-file', async () => {
    return handleGetFile()
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
