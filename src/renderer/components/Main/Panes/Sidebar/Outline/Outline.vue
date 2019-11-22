<script>
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
    <!-- <Tree :tree-data="s_headings" /> -->
    <div class="scrollable">
      <ul class="node-data">
        <node
          v-for="node in s_headings"
          :node="node"
          :key="node.data.id"
          :handleNodeClick="nodeClicked"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.outline {
  height: 100%;
}

.scrollable {
  height: 70vh;
  overflow-y: auto;
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
