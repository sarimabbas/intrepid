<script>
import Editor from "../Editor/Editor.vue";
import Panel from "../Panel/Panel.vue";
export default {
  components: { Editor, Panel }
};
</script>

<template>
  <div id="main">
    <div class="panes">
      <div class="panes-left">
        <Panel />
      </div>
      <Editor />
    </div>
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
#main {
  height: 100vh;
  width: 100%;
}

.gutter {
  width: 0px !important;
  border: 0.5px solid black;
}

.gutter.gutter-horizontal {
  background-image: none !important;
  cursor: row-resize;
}
</style>

