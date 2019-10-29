<script>
const remote = require("electron").remote;
const electronFs = remote.require("fs");
const electronDialog = remote.dialog;

import { EditorContent, EditorMenuBar } from "tiptap";
import { SidebarIcon, ShareIcon } from "vue-feather-icons";
import { mapState, mapActions } from "vuex";

import EditorInstance from "./EditorInstance";

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    SidebarIcon,
    ShareIcon
  },
  data() {
    return {
      editor: EditorInstance
    };
  },
  computed: {
    ...mapState("Interface", ["s_sidebar_toggle"]),
    ...mapState("Document", ["s_current_file_path"])
  },
  methods: {
    ...mapActions("Interface", ["m_sidebar_toggle"])
  },
  watch: {
    // s_current_file_path: function(new_path, old_path) {
    //   console.log("WOOHooos");
    //   this.editor.setContent("<p>Wooohooos</p>");
    // }
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<template>
  <div class="editor">
    <!-- content -->
    <div class="pm-custom">
      <div class="content">
        <editor-content :editor="editor" />
      </div>
    </div>
    <!-- bottom preferences -->
    <div class="toolbar">
      <div class="toolbar-buttons">
        <div class="sidebar">
          <sidebar-icon @click="m_sidebar_toggle" />
        </div>
        {{s_current_file_path}}
        <share-icon />
      </div>
    </div>
  </div>
</template>


<style scoped>
.content {
  word-break: break-all;
}

.sidebar {
  cursor: pointer;
}

.editor {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  background-color: white;
}

.pm-custom {
  padding: 50px 50px;
  overflow-y: scroll;
}

pre,
code {
  word-break: break-all;
}

.pm-custom > div:first-child {
  height: 100%;
}

.toolbar {
  background-color: #222222;
  padding: 7px;
  color: white;
}

.toolbar-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

<style>
[contenteditable]:focus {
  outline: 0px solid transparent;
}
</style>