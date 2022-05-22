const { app, BrowserWindow ,ipcRenderer, ipcMain,webContents} = require('electron')
const path = require('path')
const screenshot = require('screenshot-desktop')
const {shotEmitter} = require("./emitInstance")
// const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

async function shotImg(){
	let path = await screenshot({ filename: 'shot.jpg' }).then(path => {
    return path
  })
  return path
}

app.whenReady().then(async() => {
	// await installExtension(REACT_DEVELOPER_TOOLS)
	// 	.then((name) => console.log(`Added Extension:  ${name}`))
	// 	.catch((err) => console.log('An error occurred: ', err));

  createWindow()

	ipcMain.handle('dialog:openFile',shotImg)

  await screenshot({ filename: 'shot.jpg' }).then(imgpath => {
		console.log(imgpath);
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
