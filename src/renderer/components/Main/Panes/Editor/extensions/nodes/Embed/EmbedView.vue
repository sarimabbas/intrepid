

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
    } else if (video.servide == "dailymotion") {
      this.embedURL = `https://www.dailymotion.com/embed/video/${video.id}`;
    } else if (video.service == "vimeo") {
      this.embedURL = `https://player.vimeo.com/video/${video.id}`;
    }
  },
  computed: {
    isValidURL: function() {
      const video = getVideoId(this.node.attrs.url);
      if (video.service) {
        return true;
      }
      return false;
    }
  }
};
</script>

<template>
  <iframe class="embed" v-if="isValidURL" :src="embedURL" frameborder="0" width="100%"></iframe>
  <div class="error" v-else>Embed error: URL invalid or service unsupported.</div>
</template>


<style scoped>
.error {
  padding: 10px;
  background-color: #222222;
  border-radius: 5px;
  text-align: center;
  color: white;
  font-size: 0.8rem;
}

.embed {
  height: 300px;
  background-color: #222222;
  border-radius: 5px;
}
</style>