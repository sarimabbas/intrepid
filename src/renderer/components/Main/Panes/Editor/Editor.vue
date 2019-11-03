<script>
import { mapState, mapActions } from "vuex";
import { EditorContent, EditorMenuBar } from "tiptap";
import { SidebarIcon, ShareIcon } from "vue-feather-icons";
import Menubar from "./extensions/Menubar";

import EditorInstance from "./EditorInstance";

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    SidebarIcon,
    ShareIcon,
    Menubar
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
    <!-- menu controls -->
    <header class="menu-controls">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <Menubar :commands="commands" :is-active="isActive" />
      </editor-menu-bar>
    </header>

    <!-- writing area -->
    <content class="pm-custom">
      <editor-content :editor="editor" class="content" />
    </content>

    <!-- bottom preferences -->
    <footer class="toolbar">
      <div class="toolbar-buttons">
        <div class="sidebar">
          <sidebar-icon @click="m_sidebar_toggle" />
        </div>
        <share-icon />
      </div>
    </footer>

    <!-- end -->
  </div>
</template>


<style scoped>
/* flex base */
.editor {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  background-color: white;
}

/* flex top */
.menu-controls {
  padding: 5px;
  background-color: #222222;
}

/* flex middle (expand) + settings */
.pm-custom {
  padding: 0px 50px;
  overflow-y: scroll;
  flex: 1 1 auto;
}

.pm-custom > div:first-child {
  height: 100%;
}

.content {
  word-break: break-all;
}

/* flex bottom */
.toolbar {
  background-color: #222222;
  padding: 7px;
  color: white;
}

.sidebar {
  cursor: pointer;
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

pre {
  overflow-x: auto !important;
  word-break: all;
}
code {
  display: block !important;
  word-break: all;
}
</style>