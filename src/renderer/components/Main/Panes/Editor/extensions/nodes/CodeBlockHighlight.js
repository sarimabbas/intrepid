import { Node } from "tiptap";
import low from "lowlight/lib/core";
import {
  toggleBlockType,
  setBlockType,
  textblockTypeInputRule,
  sinkListItem,
  chainCommands,
  insertText
} from "tiptap-commands";
import HighlightPlugin from "../plugins/Highlight";

export default class CodeBlockHighlight extends Node {
  constructor(options = {}) {
    super(options);
    try {
      Object.entries(this.options.languages).forEach(([name, mapping]) => {
        low.registerLanguage(name, mapping);
      });
    } catch (err) {
      throw new Error(
        "Invalid syntax highlight definitions: define at least one highlight.js language mapping"
      );
    }
  }

  get name() {
    return "code_block";
  }

  get defaultOptions() {
    return {
      languages: {}
    };
  }

  get schema() {
    return {
      content: "text*",
      marks: "",
      group: "block",
      code: true,
      defining: true,
      draggable: true,
      parseDOM: [{ tag: "pre", preserveWhitespace: "full" }],
      toDOM: () => ["pre", ["code", 0]]
    };
  }

  commands({ type, schema }) {
    return () => toggleBlockType(type, schema.nodes.paragraph);
  }

  keys({ type }) {
    const command = type => {
      console.log(type);
    };
    return {
      "Shift-Ctrl-\\": setBlockType(type)
      //  TODO: Tab: chainCommands(() => console.log(type))
    };
  }

  inputRules({ type }) {
    return [textblockTypeInputRule(/^```$/, type)];
  }

  get plugins() {
    return [HighlightPlugin({ name: this.name })];
  }
}
