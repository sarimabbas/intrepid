<script>
import SlVueTree, {
  ISlTreeNode,
  ISlTreeNodeModel,
  ICursorPosition
} from "sl-vue-tree";

import { getCurrentTocArray, convertTocArrayToTree } from "./helper.js";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    SlVueTree
  },
  methods: {},
  computed: {
    ...mapState("Document", ["s_headings"])
  }
};
</script>

<template>
  <div>
    <h1>Outline</h1>
    <sl-vue-tree v-model="s_headings" />
  </div>
</template>

<style>
</style>