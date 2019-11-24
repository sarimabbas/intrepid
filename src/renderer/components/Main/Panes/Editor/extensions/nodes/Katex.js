import { Node } from "tiptap";
import {
  nodeInputRule,
  textblockTypeInputRule,
  wrappingInputRule
} from "tiptap-commands";

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
      group: "block",
      toDOM: () => ["div", { "data-type": this.name }, 0],
      parseDOM: [
        {
          tag: `[data-type="${this.name}"]`,
          getAttrs: dom => ({
            expression: dom.getAttribute("expression")
          })
        }
      ],
      toDOM: node => [
        "div",
        {
          "data-type": this.name,
          expression: node.attrs.expression
        }
      ]
    };
  }

  inputRules({ type }) {
    return [
      textblockTypeInputRule(/^(\$\$\$)(\s*)(.*)$/g, type, matches => {
        console.log(matches);
        return {
          expression: matches[2]
        };
      })
    ];
  }

  // return a vue component
  // this can be an object or an imported component
  get view() {
    return {
      props: ["node", "updateAttrs", "view"],
      template: `
        <div/>
      `
    };
  }
}
