<script>
import { SearchIcon } from "vue-feather-icons";
import PrefBasic from "./Preferences/PrefBasic/PrefBasic.vue";
export default {
  components: {
    SearchIcon,
    PrefBasic
  }
};
</script>

<template>
  <div class="sidebar">
    <!-- top content -->
    <div class="top">
      <h1 class="title">Intrepid</h1>
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
  padding: 10px;
  color: white;
}

.toolbar-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>