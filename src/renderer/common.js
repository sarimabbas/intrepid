const { remote, ipcRenderer, shell } = require("electron");
const currentWindow = remote.getCurrentWindow();
const fs = remote.require("fs");
const jetpack = remote.require("fs-jetpack");
const { Menu, dialog } = remote;
const mime = require("mime");

module.exports = {
  remote,
  ipcRenderer,
  currentWindow,
  fs,
  jetpack,
  Menu,
  dialog,
  shell,
  mime
};
