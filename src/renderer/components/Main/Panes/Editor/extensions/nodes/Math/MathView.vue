<script>
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
export default {
  name: "Math",
  props: ["node", "view", "getPos", "selected"],
  mounted: function() {
    this.createEditor();
    this.editor.focus();
  },
  watch: {
    selected: function(selected) {
      if (selected) {
        if (!this.editor) this.createEditor();
        this.$nextTick(() => {
          let direction = this.node.attrs.cursorPos == this.getPos() ? 1 : -1;
          let targetPos =
            this.node.attrs.cursorPos == this.getPos()
              ? 0
              : this.node.nodeSize - 2;
          let selection = Selection.near(
            this.editor.state.doc.resolve(targetPos),
            direction
          );
          this.editor.dispatch(
            this.editor.state.tr.setSelection(selection).scrollIntoView()
          );
          this.editor.focus();
        });
      } else {
        if (this.editor) this.deleteEditor();
      }
    }
  },
  methods: {
    updateRender() {
      katex.render(this.editor.dom.textContent, this.$refs.render, {
        throwOnError: false,
        displayMode: false
      });
    },
    createEditor() {
      this.editor = new EditorView(this.$refs.editor, {
        state: EditorState.create({
          doc: this.node,
          plugins: [
            keymap({
              "Mod-z": () => undo(this.view.state, this.view.dispatch),
              "Mod-y": () => redo(this.view.state, this.view.dispatch)
            })
          ]
        }),
        dispatchTransaction: this.dispatchEditor.bind(this),
        handleDOMEvents: {
          mousedown: () => {
            if (this.view.hasFocus()) this.editor.focus();
          }
        }
      });
      this.updateRender();
      this.selected = true;

      console.log(this.getPos());
    },
    deleteEditor() {
      this.editor.destroy();
      this.editor = null;
      this.selected = false;
    },
    dispatchEditor(tr) {
      let { state, transactions } = this.editor.state.applyTransaction(tr);
      this.editor.updateState(state);
      if (!tr.getMeta("fromOutside")) {
        let outerTr = this.view.state.tr,
          offsetMap = StepMap.offset(this.getPos() + 1);
        for (let i = 0; i < transactions.length; i++) {
          let steps = transactions[i].steps;
          for (let j = 0; j < steps.length; j++)
            outerTr.step(steps[j].map(offsetMap));
        }
        if (outerTr.docChanged) this.view.dispatch(outerTr);
      }
    }
  }
};
</script>

<template>
  <div
    class="Math"
    v-bind:class="{ 'ProseMirror-selected': selected }"
    contentEditable="false"
  >
    <div class="katex-render" ref="render" v-show="!selected"></div>
    <div
      class="katex-editor"
      ref="editor"
      v-show="selected"
      @input="updateRender"
    ></div></div
></template>

<style></style>
