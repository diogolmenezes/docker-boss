'use strict'

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;
const docker = require('./lib/docker');
let window;

app.on('ready', () => {
  //docker.stopAllContainers();
  docker.listContainers(true, (err, containers) => {
    dialog.showMessageBox({ type: 'info', title: 'teste', buttons: ['Ok'], message: `Os containers são ${containers.map((x) => x.Names).join(', ')}` })
  })
});

function windowTest() {
  window = new BrowserWindow({ width: 800, height: 600 });

  window.on('closed', () => {
    window = null;
  });
}

// function dockerTest() {
//   var docker = new Docker({ socketPath: '/var/run/docker.sock' });

//   docker.listContainers((err, containers) => {
//     console.log(containers)
//     if (err)
//       dialog.showErrorBox('Erro', err)
//     else
//       dialog.showMessageBox({ type: 'info', title: 'teste', buttons: ['Ok'], message: `Os containers são ${containers.map((x) => x.Names).join(', ')}` })
//   });
// }