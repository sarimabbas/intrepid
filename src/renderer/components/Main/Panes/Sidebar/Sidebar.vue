<script>
import { SearchIcon } from "vue-feather-icons";
import PrefBasic from "./Preferences/PrefBasic/PrefBasic.vue";
import Outline from "./Outline/Outline";
export default {
  components: {
    SearchIcon,
    PrefBasic,
    Outline
  }
};
</script>

<template>
  <div class="sidebar">
    <!-- top content -->
    <div class="top">
      <div class="logo">
        <h1 class="title">Intrepid</h1>
      </div>

      <br />
      <br />
      <br />
      <div class="tree">
        <Outline />
      </div>
    </div>
    <!-- finish top -->

    <!-- bottom -->
    <div class="toolbar">
      <div class="toolbar-buttons">
        <PrefBasic />
        <search-icon />
      </div>
    </div>
    <!-- finish bottom -->
  </div>
</template>



<style scoped>
.logo {
  cursor: default;
  user-select: none;
}

.title {
  color: white;
}

.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}

.top {
  color: white;
  padding: 10px;
}

.toolbar {
  background-color: #333333;
  padding: 7px;
  color: white;
}

.toolbar-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tree {
  cursor: default;
  user-select: none;
}
</style>