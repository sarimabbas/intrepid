const { remote } = require("electron");
const currentWindow = remote.getCurrentWindow();
import { Editor } from "tiptap";
import Image from "./extensions/Image";
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

const EditorInstance = new Editor({
    onUpdate() {
        currentWindow.setDocumentEdited(true);
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
