import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

type PercentCallback = (event: Electron.IpcRendererEvent, percent: number) => void

// Custom APIs for renderer
const api = {
  onDownloadProgress: (callback: PercentCallback): Electron.IpcRenderer =>
    ipcRenderer.on('download-progress', callback),

  removeDownloadProgressListener: (): Electron.IpcRenderer =>
    ipcRenderer.removeAllListeners('download-progress'),

  onUpdateAvailable: (callback: (event: Electron.IpcRendererEvent) => void): Electron.IpcRenderer =>
    ipcRenderer.on('update-available', callback)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
