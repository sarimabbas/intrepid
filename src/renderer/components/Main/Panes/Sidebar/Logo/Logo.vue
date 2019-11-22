<template>
  <div class="logo">
    <img :src="logo" class="image" />
    <h1 class="title">Intrepid</h1>
  </div>
</template>

<script>
import logo from "./logo.png";
export default {
  data() {
    return {
      logo: logo
    };
  }
};
</script>

<style scoped>
.logo {
  cursor: default;
  user-select: none;
  display: flex;
  align-items: center;
  height: 30px;
}

.image {
  margin-right: 10px;
  /* object-fit: cover; */

  min-height: 0;
  max-height: 100%;

  border-radius: 1000px;
}

.title {
  color: white;
}
</style>
