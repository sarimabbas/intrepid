

<script>
export default {
  props: ["node", "updateAttrs", "view"],
  computed: {
    isValidURL: function() {
      const url = this.node.attrs.url;
      if (url) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<template>
  <iframe class="embed" v-if="isValidURL" :src="node.attrs.url" frameborder="0" width="100%"></iframe>
  <div class="error" v-else>Embed error: URL invalid or service unsupported.</div>
</template>


<style scoped>
.error {
  padding: 10px;
  background-color: #222222;
  border-radius: 5px;
  text-align: center;
  color: white;
  font-size: 0.8rem;
}

.embed {
  height: 300px;
  background-color: #222222;
  border-radius: 5px;
}
</style>