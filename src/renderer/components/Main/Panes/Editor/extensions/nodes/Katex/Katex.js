import { Node } from "tiptap";
import KatexView from "./KatexView.vue";

export default class Katex extends Node {
  get name() {
    return "katex";
  }

  get schema() {
    return {
      attrs: {
        expression: {
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
            expression: dom.getAttribute("data-expression")
          })
        }
      ],

      // although the Vue component decides the rendering, this is useful when exporting to HTML or Markdown
      toDOM: node => [
        "div",
        {
          "data-type": this.name,
          "data-expression": node.attrs.expression
        },
        node.attrs.expression
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
        expression: currentNodeText
      });

      const transaction = state.tr.replaceSelectionWith(node);
      dispatch(transaction);
    };
  }

  get view() {
    return KatexView;
  }
}
