const { Menu, app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow; // Variable to hold the main window reference

const createMenu = (window) => {
    mainWindow = window; // Set the main window reference

    const template = [
        {
            label: 'Tools',
            submenu: [
                {
                    label: 'Home',
                    click: () => {
                        loadPage('home.html');
                    },
                },
                {
                    label: 'Acquisition',
                    click: () => {
                        loadPage('acquisition.html');
                    },
                },
                {
                    label: 'Analyze',
                    click: () => {
                        loadPage('analyze.html');
                    },
                },
                {
                    label: 'Report',
                    click: () => {
                        loadPage('report.html');
                    },
                },
                { type: 'separator' },
                {
                    label: 'Exit',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => {
                        app.quit();
                    },
                },
            ],
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'CmdOrCtrl+Shift+I',
                    click: () => {
                        mainWindow.webContents.toggleDevTools();
                    },
                },
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: () => {
                        mainWindow.reload();
                    },
                },
            ],
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Manual',
                    click: () => {
                        loadPage('manual.html');
                    },
                },
                {
                    label: 'Troubleshooting', // Fixed typo here
                    click: () => {
                        loadPage('troubleshoot.html');
                    },
                },
            ],
        },
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};

const loadPage = (filename) => {
    if (mainWindow) {
        mainWindow.loadFile(path.join(__dirname, filename));
    }
};

module.exports = { createMenu };
