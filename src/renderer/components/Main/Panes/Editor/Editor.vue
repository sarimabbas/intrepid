<script>
const remote = require("electron").remote;
const electronFs = remote.require("fs");
const electronDialog = remote.dialog;

import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import { SidebarIcon, ShareIcon } from "vue-feather-icons";
// import Log from "electron-log";
import { mapState, mapActions } from "vuex";

import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  TrailingNode
} from "tiptap-extensions";

import Image from "./extensions/Image";

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    SidebarIcon,
    ShareIcon
  },
  data() {
    return {
      editor: new Editor({
        onUpdate: ({ getJSON }) => {
          const content = getJSON();
          const json = JSON.stringify(content);
          try {
            const dir = "./myfile.crncl";
            if (!electronFs.existsSync(dir)) {
              electronFs.mkdirSync(dir);
            }
            electronFs.writeFileSync(dir + "/myfile.json", json, "utf-8");
          } catch (e) {
            alert(e);
          }
        },
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3, 4, 5, 6] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new TrailingNode({
            node: "paragraph"
          })
        ],
        content: `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a very <em>basic</em> example of tiptap.
          </p>
          <pre><code>body { display: none; }</code></pre>
          <ul>
            <li>
              A regular list
            </li>
            <li>
              With regular items
            </li>
          </ul>
                    <pre><code>Also, sometimes it's hard to remember to type \`cmd/ctrl + enter\` to leave a code block.</code></pre>
        `
      })
    };
  },
  computed: {
    ...mapState("Interface", ["s_sidebar_toggle"])
  },
  methods: {
    ...mapActions("Interface", ["m_sidebar_toggle"])
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