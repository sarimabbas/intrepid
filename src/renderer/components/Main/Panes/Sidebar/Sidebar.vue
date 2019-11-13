<script>
import { SearchIcon } from "vue-feather-icons";
import PrefBasic from "./Preferences/PrefBasic/PrefBasic.vue";
import IconButton from "../../IconButton/IconButton";
import Outline from "./Outline/Outline";
export default {
  components: {
    SearchIcon,
    PrefBasic,
    Outline,
    IconButton
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
      <!-- <div class="tree"> -->
      <Outline />
      <!-- </div> -->
    </div>
    <!-- finish top -->

    <!-- bottom -->
    <div class="toolbar">
      <div class="toolbar-buttons">
        <PrefBasic />
        <!-- <IconButton>
          <search-icon size="1.5x" />
        </IconButton>-->
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