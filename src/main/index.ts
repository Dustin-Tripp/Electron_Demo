import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import si from 'systeminformation' // System monitoring
import { autoUpdater } from 'electron-updater'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // Check for updates
  if (!is.dev) {
    autoUpdater.checkForUpdatesAndNotify()

    // Listen for download progress and send it to the renderer process
    autoUpdater.on('download-progress', (progressObj) => {
      const { percent } = progressObj
      mainWindow.webContents.send('download-progress', percent) // Send progress to renderer
    })

    autoUpdater.on('update-downloaded', () => {
      autoUpdater.quitAndInstall() // Quit and install the update automatically
    })

    // Handle events for update progress and errors
    autoUpdater.on('update-available', () => {
      mainWindow.webContents.send('update-available', true)
    })
    autoUpdater.on('update-not-available', () => {
      console.log('No update available')
    })
    autoUpdater.on('error', (error) => {
      console.error('Error updating:', error)
    })
  }
}

app.whenReady().then(() => {
  app.commandLine.appendSwitch('disable-features', 'Autofill')
  app.commandLine.appendSwitch('disable-features', 'AutofillAssistant')
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.handle('get-system-stats', async () => {
    return {
      cpu: await si.currentLoad(),
      memory: await si.mem(),
      disk: await si.fsSize(),
      network: await si.networkStats()
    }
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
