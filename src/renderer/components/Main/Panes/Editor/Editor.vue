<script>
import { mapState, mapActions } from "vuex";
import { EditorContent, EditorMenuBar } from "tiptap";
import Menubar from "./Menubar/Menubar.vue";
import Toolbar from "./Toolbar/Toolbar";
import EditorInstance from "./EditorInstance";

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    Menubar,
    Toolbar
  },
  data() {
    return {
      editor: EditorInstance
    };
  },
  computed: {
    ...mapState("Document", ["s_current_file_path"])
  },
  methods: {},
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
    <Toolbar />

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
  padding: 0px 25px;
  overflow-y: scroll;
  flex: 1 1 auto;
}

.pm-custom > div:first-child {
  height: 100%;
}

.content {
  word-break: break-all;
}
</style>

<style>
[contenteditable]:focus {
  outline: 0px solid transparent;
}

/* top and bottom "padding" on editor */
/* https://stackoverflow.com/questions/13471910/
css-applying-padding-to-box-with-scroll-bottom-padding-doesnt-work
*/
[contenteditable]:after {
  content: "";
  height: 20px;
  display: block;
}

[contenteditable]:before {
  content: "";
  height: 20px;
  display: block;
}

/* pre {
  overflow-x: auto !important;
  word-break: all;
} */

p.is-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: lightgray;
  pointer-events: none;
  height: 0;
}

pre,
pre code {
  background-color: #282a36 !important;
  color: #f8f8f2 !important;
  border-radius: 5px;
}
</style>