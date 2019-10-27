<script>
import { MoreHorizontalIcon, SearchIcon } from "vue-feather-icons";
export default {
  components: {
    MoreHorizontalIcon,
    SearchIcon
  }
};
</script>

<template>
  <div class="panel">
    <!-- top content -->
    <div class="top">
      <h1 class="title">Intrepid</h1>
    </div>
    <!-- finish top -->

    <!-- bottom -->
    <div class="toolbar">
      <div class="toolbar-buttons">
        <b-dropdown position="is-top-right" :mobile-modal="false" aria-role="menu">
          <div slot="trigger" class="more">
            <more-horizontal-icon />
          </div>
          <b-dropdown-item aria-role="menu-item">Action</b-dropdown-item>
          <b-dropdown-item aria-role="menu-item">Another action</b-dropdown-item>
          <b-dropdown-item aria-role="menu-item">Something else</b-dropdown-item>
        </b-dropdown>

        <!-- <b-dropdown aria-role="list">
          <more-horizontal-icon slot="trigger" />
          <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
          <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
          <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
        </b-dropdown>-->
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
.panel {
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

.more {
  cursor: pointer;
}

.toolbar-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>