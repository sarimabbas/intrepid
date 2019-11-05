
<script>
export default {
  props: ["isActive", "click"]
};
</script>

<template>
  <button :class="{ 'button' : true, 'is-active': isActive, 'is-text' : true, 'is-small' : true, }">
    <slot />
  </button>
</template>


<style>
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