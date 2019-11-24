

<script>
import getVideoId from "get-video-id";
export default {
  props: ["node", "updateAttrs", "view"],
  data() {
    return {
      embedURL: ""
    };
  },
  created() {
    const video = getVideoId(this.node.attrs.url);
    if (video.service == "youtube") {
      this.embedURL = `https://www.youtube.com/embed/${video.id}`;
    }
  }
};
</script>

<template>
  <!-- <div class="embed"> -->
  <iframe :src="embedURL" frameborder="0"></iframe>
  <!-- <a ref="content"></a> -->
  <!-- </div> -->
</template>


<style scoped>
</style>