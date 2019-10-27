<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import { SidebarIcon, ShareIcon } from "vue-feather-icons";

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
  History
} from "tiptap-extensions";
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
          new History()
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
          <blockquote>
            It's amazing 👏
            <br />
            – mom
          </blockquote>
        `
      })
    };
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
        <sidebar-icon />
        <share-icon />
      </div>
    </div>
  </div>
</template>


<style scoped>
.content {
  word-break: break-all;
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
  padding: 10px;
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