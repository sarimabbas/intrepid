<template></template>

<script>
import template from "./template";
import { mapState, mapActions } from "vuex";
const { remote, ipcRenderer } = require("electron");
const { Menu, MenuItem, dialog } = remote;
const fs = remote.require("fs");
const jetpack = remote.require("fs-jetpack");

import EditorInstance from "../Panes/Editor/EditorInstance";

export default {
  methods: {
    openFile() {
      // if some contents are there in a new window, prompt user to save

      // if a file is already open and unsaved, prompt user to save

      // open dialog for .crncl file selection
      const file_paths = dialog.showOpenDialogSync({
        properties: ["openDirectory", "treatPackageAsDirectory"],
        filters: [{ name: "Chronicle Files", extensions: [".crncl"] }]
      });
      const file_path = file_paths[0];
      this.m_current_file_set({ file_path });

      // check for a JSON file inside
      const content = jetpack.read(file_path + "/content.json");
      EditorInstance.setContent(JSON.parse(content));
    },
    saveFile() {
      let file_path = this.s_current_file_path;

      // if path doesn't exist, ask where to save it
      if (!file_path) {
        file_path = dialog.showSaveDialogSync({
          showsTagField: true,
          defaultPath: "Untitled.crncl"
        });

        if (!file_path) {
          return;
        }
      }

      console.log(file_path);

      // flush contents to current path
      const content = EditorInstance.getJSON();
      const json = JSON.stringify(content);
      try {
        jetpack.dir(file_path);
        fs.writeFileSync(file_path + "/content.json", json, "utf-8");
      } catch (e) {
        console.log(e);
      }
    },
    ...mapActions("Document", ["m_current_file_set"])
  },
  computed: {
    ...mapState("Document", ["s_current_file_path"])
  },
  created() {
    // create menu
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // register listeners
    ipcRenderer.on("file-open", (event, data) => {
      this.openFile();
    });

    ipcRenderer.on("file-save", (event, data) => {
      this.saveFile();
    });
  }
};
</script>

<style>
</style>