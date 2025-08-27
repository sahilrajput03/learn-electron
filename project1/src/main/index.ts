import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  console.log('❤️ Running main process code - `createWindow()`') // Printed to cli

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

  // & Learn: Use `nr watch` so code changes in this file auto-reloads the app.
  //    Also, `nr dev` command only reloads the renderer process code changes via HMR.

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    console.log('🚀App is ready to show window.') // Printed to cli

    // ? Bring window to top every 10 seconds, src: https://chatgpt.com/c/68867d7e-1d3c-8007-845b-40c511a43cb9
    setInterval(() => {
      console.log('🚀Bringing window to top...'); // Printed to cli
      // * Learn: Do *NOT* use alert(..) because we get --- `Uncaught Exception: ReferenceError: alert is not defined`
      // alert('This is alert message.')
      mainWindow.center(); // move window to screen center [Tested ✅]
      // Learn: Works when the window is behind & also when the window was minimised. [Tested ✅]
      mainWindow.setAlwaysOnTop(true);  // Enable always-on-top
      mainWindow.show();                // Bring to front
    }, 10_000); // 10 seconds
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // ? Use f12 key to open/close DevTools manually.
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
  ipcMain.on('ping', () => console.log('pong'))

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
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
