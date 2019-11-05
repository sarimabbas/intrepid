
<script>
export default {
  props: ["isActive", "click"]
};
</script>

<template>
  <button :class="[ isActive ? 'is-active' : null, 'button', 'is-text', 'is-small']">
    <slot />
  </button>
</template>


<style scoped>
.is-text {
  color: white !important;
  text-decoration: none !important;
}

.is-text:hover,
.is-text:focus,
.is-active {
  background-color: rgb(100, 100, 100) !important;
}
</style>