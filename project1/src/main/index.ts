import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  console.log('❤️ `createWindow()` [MAIN_PROCESS]') // Printed to cli

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  let intervalId: NodeJS.Timeout | null = null;

  // const intervalMs = 25 /* 25 mins*/ * 60 * 1_000
  const intervalMs = 10 * 1_000

  async function bringWindowToTop() {
    console.log('🚀Bringing window to top...'); // Printed to cli
    // * Learn: Do *NOT* use alert(..) because we get --- `Uncaught Exception: ReferenceError: alert is not defined`
    // alert('This is alert message.')
    // * Send event to frontend to update quote. We expose `custom-event` via file file://./../../src/preload/index.ts) 🎉
    mainWindow?.webContents.send("custom-event", { action: "UPDATE_QUOTE", interval: intervalMs });
    // await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second
    // * Center the window
    // mainWindow.center(); // move window to screen center [Tested ✅]
    // Learn: Works when the window is behind & also when the window was minimised. [Tested ✅]
    mainWindow.setAlwaysOnTop(true);  // Enable always-on-top
    mainWindow.show();                // Bring to front
  }

  // & Learn: Use `nr watch` so code changes in this file auto-reloads the app.
  //    Also, `nr dev` command only reloads the renderer process code changes via HMR.

  // * LEARN: & This event is triggered when app is first loaded & also when the page is REFRESHED✅ in frontend. (TIME SPENT: 3 HOUR)
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    console.log('❤️ EVENT `ready-to-show` [MAIN_PROCESS]') // Printed to cli
    // Necesary to remove stale interval when user refreshes the page in frontend.
    if (intervalId) { // Clear old interval if it exists
      console.log('\t❌Clearing old interval (MAIN PROCESS)')
      clearInterval(intervalId);
      intervalId = null;
    }
    bringWindowToTop()
    // ? Bring window to top every 10 seconds, src: https://chatgpt.com/c/68867d7e-1d3c-8007-845b-40c511a43cb9
    intervalId = setInterval(bringWindowToTop, intervalMs + 1_000); // +1 second buffer to ensure interval time has passed and frontend shows 0 seconds properly.
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // ? Use `option+cmd+i` or `f12`  to open/close DevTools manually.
  // ? Open DevTools by default (src: https://chatgpt.com/c/68af249b-8870-832d-9929-1aef61f8eedd)
  mainWindow.webContents.openDevTools({ mode: 'right' }); // `mode` can be "right", "bottom", "undocked", "detach"

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => {
    console.log('pong')
  })

  // & From client to main process
  // Src: https://chatgpt.com/c/68af249b-8870-832d-9929-1aef61f8eedd
  ipcMain.on('ding', (_event, data) => {
    console.log('Got data:', data); // { msg: 'hello', count: 5 }
  });

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  console.log('👋 All windows closed. Quitting app...') // Printed to cli
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
