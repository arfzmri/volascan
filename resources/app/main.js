const { app, BrowserWindow } = require('electron');
const { createMenu } = require('./menu');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    icon: path.join(__dirname, 'assets', 'volascan.ico'),
    width: 1000,
    height: 745,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile('home.html');
  createMenu(win); 
  
  // Inject your CSS here
  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS(`
      /* Your CSS styles here */
      #outputData {
    background-color: #2A2A35;
    margin-bottom: 12px;
    color: #fff; 
    padding: 5px; 
    overflow-y: auto;
    width: 900px; 
    height: 400px; 
    border-radius: 0px; 
    font-family: 'Courier New', monospace;
    text-align: left;
    font-size: 12px; 
    scrollbar-color: #a9a9ae #25252f;
    scrollbar-width: thin;
}
    `);
  });
}

app.whenReady().then(createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

