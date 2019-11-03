<script>
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  CodeIcon,
  ListIcon,
  RotateCcwIcon,
  RotateCwIcon
} from "vue-feather-icons";

import IconButton from "../../../IconButton/IconButton";

export default {
  components: {
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    CodeIcon,
    ListIcon,
    RotateCcwIcon,
    RotateCwIcon,
    IconButton
  },
  props: ["commands", "isActive"]
};
</script>

<template>
  <div class="controls">
    <!-- left controls -->
    <div>
      <IconButton :is-active="isActive.bold()" @click.native="commands.bold">
        <bold-icon size="1.5x" />
      </IconButton>

      <IconButton :is-active="isActive.italic()" @click.native="commands.italic">
        <italic-icon size="1.5x" />
      </IconButton>

      <IconButton :is-active="isActive.underline()" @click.native="commands.underline">
        <underline-icon size="1.5x" />
      </IconButton>

      <IconButton :is-active="isActive.bullet_list()" @click.native="commands.bullet_list">
        <list-icon size="1.5x" />
      </IconButton>

      <IconButton :is-active="isActive.code_block()" @click.native="commands.code_block">
        <code-icon size="1.5x" />
      </IconButton>

      <!-- You can't pass a function call to the click prop. It needs to be a
      function signature, otherwise you will get an infinite render loop-->
      <IconButton
        :is-active="isActive.heading({ level: 1 })"
        @click.native="() => commands.heading({ level: 1 })"
      >H1</IconButton>

      <IconButton
        :is-active="isActive.heading({ level: 2 })"
        @click.native="() => commands.heading({ level: 2 })"
      >H2</IconButton>

      <IconButton
        :is-active="isActive.heading({ level: 3 })"
        @click.native="() => commands.heading({ level: 3 })"
      >H3</IconButton>
    </div>

    <!-- right controls -->
    <div>
      <IconButton @click.native="commands.undo">
        <rotate-ccw-icon size="1.5x" />
      </IconButton>

      <IconButton @click.native="commands.redo">
        <rotate-cw-icon size="1.5x" />
      </IconButton>
    </div>
  </div>
</template>


<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
</style>