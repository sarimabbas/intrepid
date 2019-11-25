import { Node } from "tiptap";
import BookmarkView from "./BookmarkView.vue";

export default class Bookmark extends Node {
  get name() {
    return "bookmark";
  }

  get schema() {
    return {
      attrs: {
        url: {
          default: ""
        }
      },
      content: "inline*",
      group: "block",

      // these are only needed for copy/pasting existing components
      parseDOM: [
        {
          tag: `[data-type="${this.name}"]`,
          getAttrs: dom => ({
            url: dom.getAttribute("data-url")
          })
        }
      ],

      // although the Vue component decides the rendering, this is useful when exporting to HTML or Markdown
      toDOM: node => [
        "div",
        {
          "data-type": this.name,
          "data-url": node.attrs.url,
          src: node.attrs.url
        },
        `Bookmark for ${node.attrs.url}`
      ]
    };
  }

  commands({ type, schema }) {
    return attrs => (state, dispatch, view) => {
      const cursor = state.selection.$cursor;

      let currentNodeText = "";
      if (cursor.nodeBefore) {
        currentNodeText = cursor.nodeBefore.text;
      } else if (cursor.nodeAfter) {
        currentNodeText = cursor.nodeAfter.text;
      }

      const node = type.create({
        ...attrs,
        url: currentNodeText
      });

      const transaction = state.tr.replaceSelectionWith(node);
      dispatch(transaction);
    };
  }

  get view() {
    return BookmarkView;
  }
}
