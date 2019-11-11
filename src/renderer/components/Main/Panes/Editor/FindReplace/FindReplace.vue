<script>
import EditorInstance from "../EditorInstance";
import IconButton from "../../../IconButton/IconButton";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    IconButton
  },
  data() {
    return {
      searchTerm: null,
      replaceWith: null
    };
  },
  methods: {
    replace() {
      EditorInstance.commands.replace(this.replaceWith);
    },
    replaceAll() {
      EditorInstance.commands.replaceAll(this.replaceWith);
    },
    find() {
      EditorInstance.commands.find(this.searchTerm);
    },
    clear() {
      this.searchTerm = "";
      this.replaceWith = "";
      EditorInstance.commands.clearSearch();
    }
  },
  computed: {
    ...mapState("Interface", ["s_find_replace"])
  }
};
</script>

<template>
  <div class="search" v-show="s_find_replace">
    <hr class="dropdown-divider" />
    <div class="flex-me">
      <b-input
        placeholder="Find..."
        v-model="searchTerm"
        size="is-small"
        @keydown.enter.prevent.native="find"
        id="find-field"
      ></b-input>
      <div>
        <IconButton class="button-control" @click.native="find">Find</IconButton>
        <IconButton @click.native="clear">Clear</IconButton>
      </div>
    </div>
    <div class="flex-me replace">
      <b-input
        placeholder="Replace..."
        v-model="replaceWith"
        size="is-small"
        @keydown.enter.prevent.native="replace"
      ></b-input>
      <div>
        <IconButton class="button-control" @click.native="replace">Replace</IconButton>
        <IconButton @click.native="replaceAll">Replace All</IconButton>
      </div>
    </div>
  </div>
</template>


<style scoped>
.search {
  padding: 5px;
  width: 100%;
}

.replace {
  margin-top: 5px;
}

.button-control {
  margin-left: 10px;
}

.flex-me {
  display: flex;
  align-items: center;
  /* justify-content: flex-end; */
}

.dropdown-divider {
  height: 0.5px;
}
</style>


<style>
.find {
  background: rgba(255, 213, 0, 0.5);
}
</style>