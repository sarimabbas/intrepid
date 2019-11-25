import { currentWindow, ipcRenderer } from "../../../../common";
import store from "../../../../store";
import { createOutline } from "../Sidebar/Outline/helper";
import { Editor } from "tiptap";

import Image from "./extensions/nodes/Image";
import HardBreak from "./extensions/nodes/HardBreak";
import CodeBlockHighlight from "./extensions/nodes/CodeBlockHighlight";
import Heading from "./extensions/nodes/Heading";
import languages from "./extensions/languages";
import Embed from "./extensions/nodes/Embed/Embed";
import Bookmark from "./extensions/nodes/Bookmark/Bookmark";
import Katex from "./extensions/nodes/Katex/Katex";
import Math from "./extensions/nodes/Math/Math";

import {
  Blockquote,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  Placeholder,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Strike,
  Underline,
  History,
  TrailingNode,
  Focus,
  Search,
  Link
} from "tiptap-extensions";

const EditorInstance = new Editor({
  onUpdate() {
    if (!currentWindow.isDocumentEdited()) {
      currentWindow.setDocumentEdited(true);
      store.dispatch("Document/m_pending_save", { needs_save: true });
      ipcRenderer.send("prevent-close", true);
    }

    // ostensibly a better way to access store outside of Vue
    const headings = createOutline();
    store.dispatch("Document/m_headings", { headings: headings });
  },
  autoFocus: true,
  extensions: [
    new Blockquote(),
    new BulletList(),
    new CodeBlockHighlight({
      languages: languages
    }),
    new HardBreak(),
    new Heading({ levels: [1, 2, 3, 4, 5, 6] }),
    new HorizontalRule(),
    new ListItem(),
    new OrderedList(),
    new Placeholder({
      emptyNodeClass: "is-empty",
      emptyNodeText: "Write something...",
      showOnlyWhenEditable: true
    }),
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
    }),
    new Focus({
      className: store.state.Preferences.s_focus_cursor
        ? "tiptap-has-focus"
        : "",
      nested: false
    }),
    new Search({
      disableRegex: false
    }),
    new Embed(),
    new Bookmark(),
    new Katex()
  ]
});

export default EditorInstance;
