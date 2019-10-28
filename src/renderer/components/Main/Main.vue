<script>
import Panes from "./Panes/Panes.vue";
export default {
  components: { Panes }
};
</script>

<template>
  <div id="main">
    <Panes />
  </div>
</template>


<style>
#main {
  height: 100vh;
  width: 100%;
}

.vue-feather {
  cursor: pointer;
}
</style>

