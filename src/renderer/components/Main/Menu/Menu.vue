<template></template>

<script>
import template from "./template";
import { mapState, mapActions } from "vuex";
const { remote, ipcRenderer } = require("electron");
const { Menu, MenuItem, dialog } = remote;
const currentWindow = remote.getCurrentWindow();

export default {
  methods: {
    openFile() {
      console.log("BEFORE");
      console.log(this.s_current_file);
    },
    ...mapActions("Document", ["m_current_file_set"])
  },
  computed: {
    ...mapState("Document", ["s_current_file"])
  },
  created() {
    // create menu
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // register listeners
    ipcRenderer.on("file-open", (event, data) => {
      this.openFile();
    });
  }
};
</script>

<style>
</style>