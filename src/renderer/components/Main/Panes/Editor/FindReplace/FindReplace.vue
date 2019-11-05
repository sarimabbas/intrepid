<script>
import EditorInstance from "../EditorInstance";
export default {
  props: ["commands"],
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
      EditorInstance.commands.clearSearch();
    }
  }
};
</script>

<template>
  <div class="search">
    <input
      ref="search"
      @keydown.enter.prevent="() => commands.find(searchTerm)"
      placeholder="Search …"
      type="text"
      v-model="searchTerm"
    />
    <input
      @keydown.enter.prevent="() => commands.replace(replaceWith)"
      placeholder="Replace …"
      type="text"
      v-model="replaceWith"
    />
    <button class="button" @click="find">Find</button>
    <button class="button" @click="clear">Clear</button>
    <button class="button" @click="replace">Replace</button>
    <button class="button" @click="replaceAll">Replace All</button>
  </div>
</template>



<style>
.find {
  background: rgba(255, 213, 0, 0.5);
}
</style>