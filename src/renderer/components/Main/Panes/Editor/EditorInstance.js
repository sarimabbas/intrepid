import { currentWindow } from "../../../../common";
import store from "../../../../store";
import { createOutline } from "../Sidebar/Outline/helper";
import { Editor } from "tiptap";
import Image from "./extensions/Image";
import Link from "./extensions/Link";
import HardBreak from "./extensions/HardBreak";
// import languages from "./extensions/languages";
import css from "highlight.js/lib/languages/css";
import {
  Blockquote,
  CodeBlock,
  CodeBlockHighlight,
  Heading,
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
  TrailingNode
} from "tiptap-extensions";

const EditorInstance = new Editor({
  onUpdate() {
    if (!currentWindow.isDocumentEdited()) {
      currentWindow.setDocumentEdited(true);
    }

    const headings = createOutline();

    // ostensibly a better way to access store outside of Vue
    store.dispatch("Document/m_headings_set", { headings: headings });

    // a more hacky way:
    // store._actions["Document/m_headings_set"][0]({
    //   headings: headings
    // });
  },

  extensions: [
    new Blockquote(),
    new BulletList(),
    new CodeBlock(),
    new CodeBlockHighlight({
      languages: {
        css
      }
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
    })
  ]
});

export default EditorInstance;
