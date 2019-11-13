<script>
import SlVueTree, {
  ISlTreeNode,
  ISlTreeNodeModel,
  ICursorPosition
} from "sl-vue-tree";

import Node from "../Tree/Node";

import { getCurrentTocArray, convertTocArrayToTree } from "./helper.js";
import { mapState, mapActions } from "vuex";

import {
  CircleIcon,
  ChevronRightIcon,
  ChevronDownIcon
} from "vue-feather-icons";

export default {
  components: {
    SlVueTree,
    CircleIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    Node
  },
  methods: {
    nodeClicked(node) {
      document.getElementById(node.data.id).scrollIntoView({
        behavior: "smooth"
      });
    }
  },
  computed: {
    ...mapState("Document", ["s_headings"])
  }
};
</script>

<template>
  <div class="outline">
    <h1 class="heading-level">OUTLINE</h1>

    <!-- <sl-vue-tree v-model="s_headings" @nodeclick="nodeClicked">

      <template slot="title" slot-scope="{ node }">
        <div class="node-data">
          <span class="heading-level">H{{ node.data.level }}</span>
          <span class="heading-label">{{ node.title }}</span>
        </div>
      </template>

      <template slot="toggle" slot-scope="{ node }">
        <chevron-down-icon v-if="node.isExpanded" style="margin: 0" />
        <chevron-right-icon v-if="!node.isExpanded" style="margin: 0" />

      </template>
    </sl-vue-tree>-->
    <!-- <Tree :tree-data="s_headings" /> -->
    <ul class="node-data">
      <node
        v-for="node in s_headings"
        :node="node"
        :key="node.data.id"
        :handleNodeClick="nodeClicked"
      />
    </ul>
  </div>
</template> 

<style scoped>
.outline {
  /* width: calc(100%);
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
}

.node-data {
}

.heading-level {
  font-weight: 700;
  font-size: 10px;
  margin-bottom: 10px;
}

.heading-label {
  font-size: 14px;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<style>
.sl-vue-tree {
  position: relative;
  cursor: default;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

.sl-vue-tree.sl-vue-tree-root {
  border: 1px solid rgb(9, 22, 29);
  background-color: rgb(9, 22, 29);
  color: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
}

.sl-vue-tree-root > .sl-vue-tree-nodes-list {
  overflow: hidden;
  position: relative;
  padding-bottom: 4px;
}

.sl-vue-tree-selected > .sl-vue-tree-node-item {
  background-color: #13242d;
  color: white;
}

.sl-vue-tree-node-item:hover,
.sl-vue-tree-node-item.sl-vue-tree-cursor-hover {
  color: white;
}

.sl-vue-tree-node-item {
  position: relative;
  display: flex;
  flex-direction: row;

  padding-left: 10px;
  padding-right: 10px;
  line-height: 28px;
  border: 1px solid transparent;
}

.sl-vue-tree-node-item.sl-vue-tree-cursor-inside {
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.sl-vue-tree-gap {
  width: 25px;
  min-height: 1px;
}

.sl-vue-tree-toggle {
  display: inline-block;
  text-align: left;
  width: 20px;
  margin: 0;
  display: inline-flex;
  align-items: center;

  vertical-align: middle;
}

.sl-vue-tree-title {
  /* display: flex; */
  /* align-items: center; */
}

.sl-vue-tree-sidebar {
  margin-left: auto;
}

.sl-vue-tree-cursor {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.5);
  height: 1px;
  width: 100%;
}

.sl-vue-tree-drag-info {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.5;
  margin-left: 20px;
  padding: 5px 10px;
}
</style>