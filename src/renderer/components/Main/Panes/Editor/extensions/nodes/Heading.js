const uuidv1 = require("uuid/v1");
import { Node } from "tiptap";
import {
  setBlockType,
  textblockTypeInputRule,
  toggleBlockType,
  pasteRule
} from "tiptap-commands";

export default class Heading extends Node {
  get name() {
    return "heading";
  }

  get defaultOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6]
    };
  }

  get schema() {
    return {
      attrs: {
        level: {
          default: 1
        },
        id: {
          default: ""
        }
      },
      content: "inline*",
      group: "block",
      defining: true,
      draggable: false,
      parseDOM: this.options.levels.map(level => ({
        tag: `h${level}`,
        getAttrs: dom => ({
          id: dom.getAttribute("id")
        })
      })),
      // https://prosemirror.net/docs/ref/#model.DOMOutputSpec
      toDOM: node => [`h${node.attrs.level}`, { id: node.attrs.id }, 0]
    };
  }

  commands({ type, schema }) {
    return attrs =>
      toggleBlockType(type, schema.nodes.paragraph, {
        ...attrs,
        id: uuidv1()
      });
  }

  keys({ type }) {
    return this.options.levels.reduce(
      (items, level) => ({
        ...items,
        ...{
          [`Shift-Ctrl-${level}`]: setBlockType(type, { level, id: uuidv1() })
        }
      }),
      {}
    );
  }

  inputRules({ type }) {
    return this.options.levels.map(level =>
      textblockTypeInputRule(new RegExp(`^(#{1,${level}})\\s$`), type, () => ({
        level,
        id: uuidv1()
      }))
    );
  }

  // TODO Bugfix: when pasting headings, the ID is duplicated
  //   pasteRules({ type }) {
  //     return this.options.levels.map(level =>
  //       pasteRule(new RegExp(`^(#{1,${level}})\\s$`), type, () => ({
  //         level,
  //         id: uuidv1()
  //       }))
  //     );
  //   }
}
