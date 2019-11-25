import { EditorState } from "prosemirror-state";
import { StepMap } from "prosemirror-transform";
import { keymap } from "prosemirror-keymap";
import { undo, redo } from "prosemirror-history";
import { EditorView } from "prosemirror-view";
import { InputRule } from "prosemirror-inputrules";
import { Node, Plugin } from "tiptap";
import { PluginKey } from "tiptap";
import { nodeInputRule } from "tiptap-commands";
import { NodeSelection } from "prosemirror-state";
import { Selection } from "prosemirror-state";

import katex from "katex";
import MathView from "./MathView.vue";

/*
 * Defines a ComponentView for Math; modeled after the footnote example here:
 * https://prosemirror.net/examples/footnote/
 */
export default class Math extends Node {
  get name() {
    return "math";
  }

  get schema() {
    return {
      attrs: { cursorPos: { default: 0 } },
      group: "inline",
      content: "inline*",
      atom: true,
      inline: true,
      toDOM: node => ["div", { class: "Math" }, 0],
      parseDOM: [{ tag: "div.Math" }]
    };
  }

  get view() {
    return MathView;
  }

  inputRules({ type, getAttrs }) {
    return [
      new InputRule(/(?:\$)([^\$]+)(?:\$)$/, (state, match, start, end) => {
        const attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
        const [matchedText, content] = match;
        const { tr, schema } = state;
        if (matchedText) {
          // Create the new Math node.
          const node = type.create(attrs, schema.text(content));
          tr.replaceWith(start, end, node);
          // Select the new Math node.
          const rpos = tr.doc.resolve(
            tr.selection.anchor - tr.selection.$anchor.nodeBefore.nodeSize
          );
          tr.setSelection(new NodeSelection(rpos));
          // if (tr.doc.resolve(end).nodeAfter == null) {
        }
        return tr;
      })
    ];
  }

  /*
   * Called externally only from this Math
   * https://prosemirror.net/docs/ref/#view.NodeView.update
   */
  update(node) {
    console.log("update", this, node);
    if (!node.sameMarkup(this.vm.node)) return false;
    this.vm.node = node;
    if (this.vm.editor) {
      let state = this.vm.editor.state;
      let start = node.content.findDiffStart(state.doc.content);
      if (start != null) {
        let { a: endA, b: endB } = node.content.findDiffEnd(state.doc.content);
        let overlap = start - (endA > endB ? endB : endA);
        if (overlap > 0) {
          endA += overlap;
          endB += overlap;
        }
        this.vm.editor.dispatch(
          state.tr
            .replace(start, endB, node.slice(start, endA))
            .setMeta("fromOutside", true)
        );
      }
    }
    return true;
  }

  keys() {
    return {
      ArrowLeft: this.arrowHandler("left"),
      ArrowRight: this.arrowHandler("right"),
      ArrowUp: this.arrowHandler("up"),
      ArrowDown: this.arrowHandler("down")
    };
  }

  arrowHandler(dir) {
    return (state, dispatch, view) => {
      if (state.selection.empty) {
        let side = dir == "left" || dir == "up" ? -1 : 1;
        let head = state.selection.head;
        let nextPos = Selection.near(state.doc.resolve(head + side), side);
        if (nextPos.$head && nextPos.$head.parent.type.name == "math") {
          let nodePos =
            side == -1 ? head - nextPos.$head.parent.nodeSize : head;
          dispatch(
            state.tr.setNodeMarkup(nodePos, null, { cursorPos: head }, null)
          );
        }
      }
      return false;
    };
  }

  stopEvent(event) {
    return this.editor && this.editor.view.dom.contains(event.target);
  }

  destroy() {
    console.log("destroy", this);
  }

  ignoreMutation() {
    return true;
  }
}
