<script>
import Editor from "./Editor/Editor.vue";
import Sidebar from "./Sidebar/Sidebar.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: { Editor, Sidebar },
  computed: {
    ...mapState("Interface", ["s_sidebar_toggle"])
  }
};
</script>

<template>
  <div class="panes">
    <div class="panes-left" v-show="s_sidebar_toggle">
      <Sidebar />
    </div>
    <Editor />
  </div>
</template>

<style scoped>
.panes {
  height: 100%;
  display: flex;
}

.panes-left {
  width: 25%;
  max-width: 250px;
}
</style>


<style>
/* split js */
.gutter {
  width: 0px !important;
  border: 0.5px solid black;
}

.gutter.gutter-horizontal {
  background-image: none !important;
  cursor: row-resize;
}
</style>

