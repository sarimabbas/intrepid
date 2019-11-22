<template></template>

<script>
import template from "./template";
import { mapState, mapActions } from "vuex";

import {
  remote,
  ipcRenderer,
  Menu,
  dialog,
  fs,
  jetpack,
  currentWindow,
  app
} from "../../../common";

import EditorInstance from "../Panes/Editor/EditorInstance";

export default {
  methods: {
    showFindReplace() {
      this.m_find_replace();
    },
    openFile(file_path) {
      // if some contents are there in a new window, prompt user to save

      // if a file is already open and unsaved, prompt user to save

      if (!file_path) {
        return;
      }

      this.m_current_file_path({ file_path });
      currentWindow.setRepresentedFilename(file_path);
      currentWindow.setTitle("Intrepid - " + file_path);
      app.addRecentDocument(file_path);

      // check for a JSON file inside
      const content = jetpack.read(file_path + "/content.json");
      EditorInstance.setContent(JSON.parse(content));
    },
    openFileUsingDialog() {
      const file_paths = dialog.showOpenDialogSync({
        properties: ["openDirectory", "treatPackageAsDirectory"],
        filters: [{ name: "Chronicle Files", extensions: [".crncl"] }]
      });

      if (!file_paths) {
        return;
      }

      this.openFile(file_paths[0]);
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

      this.m_current_file_path({ file_path });
      currentWindow.setTitle("Intrepid - " + file_path);
      currentWindow.setRepresentedFilename(file_path);

      // e.g. file_path === .../.../Untitled.crncl

      // flush contents to current path
      const content = EditorInstance.getJSON();
      const json = JSON.stringify(content);
      try {
        jetpack.dir(file_path);
        fs.writeFileSync(file_path + "/content.json", json, "utf-8");
      } catch (e) {
        console.log(e);
      }

      currentWindow.setDocumentEdited(false);
      this.m_pending_save({ needs_save: false });
      ipcRenderer.send("prevent-close", false);
    },
    ...mapActions("Document", ["m_current_file_path", "m_pending_save"]),
    ...mapActions("Interface", ["m_find_replace"])
  },
  computed: {
    ...mapState("Document", ["s_current_file_path", "s_pending_save"])
  },
  created() {
    // create menu
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // register listeners
    ipcRenderer.on("file-open-user", (event, data) => {
      this.openFileUsingDialog();
    });

    ipcRenderer.on("file-open-system", (event, path) => {
      this.openFile(path);
    });

    ipcRenderer.on("file-save", (event, data) => {
      this.saveFile();
    });

    ipcRenderer.on("window-close", (event, data) => {
      this.closeWindow();
    });

    ipcRenderer.on("find-replace", (event, data) => {
      this.showFindReplace();
    });
  }
};
</script>

<style></style>
