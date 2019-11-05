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

.tiptap-has-focus {
  border-radius: 3px;
  box-shadow: 0 0 0 3px #3ea4ffe6;
  padding: 5px;
}
</style>

