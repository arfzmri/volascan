const { Menu, app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow; 

const createMenu = (window) => {
    mainWindow = window; 

    const template = [
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
            label: 'View',
            click: () => {
                loadPage('view.html');
            },
        },
        {
            label: 'Report',
            click: () => {
                loadPage('report.html');
            },
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
                    label: 'Troubleshooting',
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
