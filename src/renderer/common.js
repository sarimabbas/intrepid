const { remote, ipcRenderer, shell } = require("electron");
const currentWindow = remote.getCurrentWindow();
const fs = remote.require("fs");
const jetpack = remote.require("fs-jetpack");
// const LinkPreview = remote.require("link-preview-js");
const { Menu, dialog, app } = remote;
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
  mime,
  app
};
