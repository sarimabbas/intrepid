
<script>
export default {
  props: ["isActive", "click"]
};
</script>

<template>
  <b-button type="is-text" size="is-small" @click="click" :class="{ 'is-active': isActive }">
    <slot />
  </b-button>
</template>


<style>
.is-text {
  color: white !important;
  text-decoration: none !important;
}

.is-text:hover,
.is-active {
  background-color: rgb(100, 100, 100) !important;
}
</style>