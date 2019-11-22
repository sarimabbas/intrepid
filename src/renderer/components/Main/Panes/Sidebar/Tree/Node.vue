<template>
  <li class="node-item">
    <div class="node-label">
      <span
        class="node-collapse"
        v-if="node.children && node.children.length"
        @click="toggleChildren"
      >
        <chevron-down-icon
          v-if="showChildren"
          size="1.5x"
          class="node-collapse-icon"
        />
        <chevron-right-icon v-else size="1.5x" class="node-collapse-icon" />
      </span>
      <span class="node-level" @click="handleNodeClick(node)"
        >H{{ node.data.level }}</span
      >
      <span class="node-text" @click="handleNodeClick(node)">{{
        node.title
      }}</span>
    </div>
    <ul v-if="node.children && node.children.length" v-show="showChildren">
      <node
        class="node-tree"
        v-for="child in node.children"
        :key="child.data.id"
        :node="child"
        :handleNodeClick="handleNodeClick"
      ></node>
    </ul>
  </li>
</template>

<script>
import { ChevronRightIcon, ChevronDownIcon } from "vue-feather-icons";
export default {
  name: "node",
  components: {
    ChevronRightIcon,
    ChevronDownIcon
  },
  props: ["node", "handleNodeClick"],
  data() {
    return {
      showChildren: true
    };
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren;
    }
  }
  //   watch: {
  //     node: function(newVal, oldVal) {
  //       console.log(newVal);
  //     }
  //   }
};
</script>

<style scoped>
.node-tree {
  margin-left: 16px;
  /* margin: 0; */
}

.node-collapse {
  display: flex;
  align-items: center;
  font-size: 0.6rem;
  font-weight: 700;
}

.node-level {
  margin-left: 5px;
  margin-right: 5px;
  font-size: 0.6rem;
  font-weight: 700;
}

.node-collapse-icon {
  margin: 0;
}
.node-label {
  display: flex;
  align-items: center;
  background-color: grey;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 2px;
  cursor: pointer;
}
.node-text {
  width: calc(100%);
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.8rem;
}
</style>
