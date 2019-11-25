<script>
import KatexElement from "./KatexElement";
export default {
  props: ["node", "updateAttrs", "view"],
  components: {
    KatexElement
  }
};
</script>

<template>
  <div
    class="katex"
    v-if="true"
    :data-expression="node.attrs.expression"
    data-type="katex"
    ref="katex"
  >
    <KatexElement :expression="node.attrs.expression" />
  </div>
</template>

<style scoped></style>
