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
export default {
  components: {
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    CodeIcon,
    ListIcon,
    RotateCcwIcon,
    RotateCwIcon
  },
  props: ["commands", "is-active"]
};
</script>

<template>
  <div class="controls">
    <!-- left controls -->
    <div>
      <b-button
        type="is-text"
        size="is-small"
        :class="{ 'is-active': isActive.bold(), 'menu-button': true }"
        @click="commands.bold"
      >
        <bold-icon size="1.5x" />
      </b-button>

      <b-button
        type="is-text"
        size="is-small"
        :class="{ 'is-active': isActive.italic() }"
        @click="commands.italic"
      >
        <italic-icon size="1.5x" />
      </b-button>

      <b-button
        type="is-text"
        size="is-small"
        :class="{ 'is-active': isActive.underline() }"
        @click="commands.underline"
      >
        <underline-icon size="1.5x" />
      </b-button>

      <b-button
        type="is-text"
        size="is-small"
        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
        @click="commands.heading({ level: 1 })"
      >H1</b-button>

      <b-button
        type="is-text"
        size="is-small"
        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
        @click="commands.heading({ level: 2 })"
      >H2</b-button>

      <b-button
        type="is-text"
        size="is-small"
        :class="{ 'is-active': isActive.heading({ level: 3 }) }"
        @click="commands.heading({ level: 3 })"
      >H3</b-button>

      <b-button
        type="is-text"
        size="is-small"
        :class="{ 'is-active': isActive.bullet_list() }"
        @click="commands.bullet_list"
      >
        <list-icon size="1.5x" />
      </b-button>

      <b-button
        type="is-text"
        size="is-small"
        :class="{ 'is-active': isActive.code_block() }"
        @click="commands.code_block"
      >
        <code-icon size="1.5x" />
      </b-button>
    </div>

    <!-- right conntrols -->
    <div>
      <b-button size="is-small" type="is-text" @click="commands.undo">
        <rotate-ccw-icon size="1.5x" />
      </b-button>

      <b-button size="is-small" type="is-text" @click="commands.redo">
        <rotate-cw-icon size="1.5x" />
      </b-button>
    </div>
  </div>
</template>


<style scoped>
.is-text {
  color: white !important;
}

.is-text:hover {
  background-color: rgb(100, 100, 100) !important;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.button {
  margin: 2px 0px;
}
</style>