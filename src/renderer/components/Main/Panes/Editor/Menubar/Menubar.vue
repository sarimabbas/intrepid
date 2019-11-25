<script>
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  CodeIcon,
  ListIcon,
  RotateCcwIcon,
  RotateCwIcon,
  SearchIcon,
  PackageIcon,
  BookmarkIcon
} from "vue-feather-icons";
import IconButton from "../../../IconButton/IconButton";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    CodeIcon,
    ListIcon,
    RotateCcwIcon,
    RotateCwIcon,
    SearchIcon,
    IconButton,
    PackageIcon,
    BookmarkIcon
  },
  props: ["commands", "isActive"],
  methods: {
    ...mapActions("Interface", ["m_find_replace"])
  },
  computed: {
    ...mapState("Interface", ["s_find_replace"])
  }
};
</script>

<template>
  <div class="controls">
    <!-- left controls -->
    <div>
      <IconButton
        :is-active="isActive.bold()"
        @click.native="commands.bold"
        title="Bold"
      >
        <bold-icon size="1.5x" />
      </IconButton>

      <IconButton
        :is-active="isActive.italic()"
        @click.native="commands.italic"
        title="Italic"
      >
        <italic-icon size="1.5x" />
      </IconButton>

      <IconButton
        :is-active="isActive.underline()"
        @click.native="commands.underline"
        title="Underline"
      >
        <underline-icon size="1.5x" />
      </IconButton>

      <IconButton
        :is-active="isActive.bullet_list()"
        @click.native="commands.bullet_list"
        title="Unordered List"
      >
        <list-icon size="1.5x" />
      </IconButton>

      <IconButton
        :is-active="isActive.code_block()"
        @click.native="commands.code_block"
        title="Code Block"
      >
        <code-icon size="1.5x" />
      </IconButton>

      <!-- You can't pass a function call to the click prop. It needs to be a
      function signature, otherwise you will get an infinite render loop-->
      <IconButton
        title="Heading 1"
        :is-active="isActive.heading({ level: 1 })"
        @click.native="() => commands.heading({ level: 1 })"
        >H1</IconButton
      >

      <IconButton
        title="Heading 2"
        :is-active="isActive.heading({ level: 2 })"
        @click.native="() => commands.heading({ level: 2 })"
        >H2</IconButton
      >

      <IconButton
        title="Heading 3"
        :is-active="isActive.heading({ level: 3 })"
        @click.native="() => commands.heading({ level: 3 })"
        >H3</IconButton
      >

      <IconButton @click.native="commands.embed" title="Embed Content">
        <package-icon size="1.5x" />
      </IconButton>

      <IconButton @click.native="commands.bookmark" title="Bookmark Content">
        <bookmark-icon size="1.5x" />
      </IconButton>
    </div>

    <!-- right controls -->
    <div>
      <IconButton
        @click.native="m_find_replace"
        :is-active="s_find_replace"
        title="Find and Replace"
      >
        <search-icon size="1.5x" />
      </IconButton>

      <IconButton @click.native="commands.undo" title="Undo">
        <rotate-ccw-icon size="1.5x" />
      </IconButton>

      <IconButton @click.native="commands.redo" title="Redo">
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
