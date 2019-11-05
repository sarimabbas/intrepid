<script>
export default {
  props: ["commands"],
  data() {
    return {
      searchTerm: null,
      replaceWith: null
    };
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
    <button class="button" @click="() => commands.find(searchTerm)">Find</button>
    <button class="button" @click="commands.clearSearch()">Clear</button>
    <button class="button" @click="commands.replace(replaceWith)">Replace</button>
    <button class="button" @click="commands.replaceAll(replaceWith)">Replace All</button>
  </div>
</template>



<style>
</style>