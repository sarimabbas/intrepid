import { Node } from "tiptap";
import EmbedView from "./EmbedView.vue";
import {
  setBlockType,
  textblockTypeInputRule,
  toggleBlockType,
  pasteRule,
  toggleWrap
} from "tiptap-commands";
import { getMarkAttrs } from "tiptap-utils";

export default class Embed extends Node {
  get name() {
    return "embed";
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
          tag: "iframe[src]",
          getAttrs: dom => ({
            url: dom.getAttribute("src")
          })
        }
      ],
      toDOM: node => ["iframe", { src: node.attrs.url }, 0]
    };
  }

  commands({ type, schema }) {
    return attrs => (state, dispatch, view) => {
      const cursor = state.selection.$cursor;

      let text = "";
      if (cursor.nodeBefore) {
        text = cursor.nodeBefore.text;
      } else if (cursor.nodeAfter) {
        text = cursor.nodeAfter.text;
      }

      const node = type.create({
        ...attrs,
        url: text
      });

      const transaction = state.tr.replaceSelectionWith(node);
      dispatch(transaction);

      //   console.log(state);
      //     getMarkAttrs();
      //   return toggleBlockType(type, schema.nodes.paragraph, {
      //     ...attrs,
      //     url: "https://www.youtube.com/watch?v=guEn4MkE0sw"
      //   });
    };
  }

  get view() {
    return EmbedView;
  }
}
