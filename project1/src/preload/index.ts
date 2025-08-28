import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

type CallbackT = (data: any) => void

// Custom APIs for renderer
const api = {
  // & For receiving custom events from main process to frontend via `preload/index.ts` file. (src: https://chatgpt.com/c/68af316f-a018-8329-8084-6c36526ad43c)
  onCustomEvent: (callback: CallbackT) => {
    console.log('🧿 preload.ts: Setup listener for custom-event ✅')
    // Remove previous stale listener on HMR on frontend (i.e., file changes in App.svelte file)
    ipcRenderer.removeAllListeners('custom-event')

    ipcRenderer.on('custom-event', (_event, data) => {
      return callback(data)
    })
  },
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
