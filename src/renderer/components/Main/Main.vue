<script>
import Panes from "./Panes/Panes.vue";
import Menu from "./Menu/Menu.vue";
export default {
  components: { Panes, Menu }
};
</script>

<template>
  <div id="main">
    <Menu />
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

