<template>
  <li class="node-item">
    <div class="node-label" @click="handleNodeClick(node)">
      <span class="node-level">H{{ node.data.level }}</span>
      <span class="node-text">{{ node.title }}</span>
    </div>
    <ul v-if="node.children && node.children.length">
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
export default {
  name: "node",
  props: ["node", "handleNodeClick"]
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
.node-level {
  margin-right: 5px;
  font-size: 0.6rem;
  font-weight: 700;
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
  font-size: 0.9rem;
}
</style>
