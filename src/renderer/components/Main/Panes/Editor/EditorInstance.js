import { currentWindow } from "../../../../common";
import store from "../../../../store";
import { createOutline } from "../Sidebar/Outline/helper";
import { Editor } from "tiptap";
import Image from "./extensions/Image";
import Link from "./extensions/Link";
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
  content: ``
});

export default EditorInstance;
