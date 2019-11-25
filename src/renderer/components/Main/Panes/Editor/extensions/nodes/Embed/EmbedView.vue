<script>
import getVideoId from "get-video-id";
import isUrl from "is-url";
export default {
  props: ["node", "updateAttrs", "view"],
  computed: {
    isSupportedURL: function() {
      if (getVideoId(this.node.attrs.url).service) {
        return true;
      } else {
        return false;
      }
    },
    isValidURL: function() {
      const url = this.node.attrs.url;
      return isUrl(url);
    }
  }
};
</script>

<template>
  <!-- IFRAME EMBED SUCCESS -->
  <div v-if="isValidURL && isSupportedURL" class="embed-wrap">
    <iframe
      class="embed-iframe"
      :src="node.attrs.url"
      :data-url="node.attrs.url"
      data-type="embed"
      frameborder="0"
      allowfullscreen
    ></iframe>
    <span class="embed-text">Embed for: {{ node.attrs.url }}</span>
  </div>
  <!-- IFRAME ERROR -->
  <div class="embed-error" v-else>
    <span>Could create an interactive embed for this URL. Try another URL or create a Bookmark.</span>
  </div>
</template>

<style scoped>
.embed-wrap::before,
.embed-wrap::after {
  display: none;
}

.embed-wrap {
  background-color: #333333;
  border-radius: 5px;
  font-size: 0.8rem;
  text-align: center;
  color: white;
  padding: 0px;
  overflow: hidden;

  /* this is how much of the full width of the editor should the iframe take */
  width: 80%;
}

.embed-iframe {
  vertical-align: middle;

  /* the iframe is full width of its container */
  width: 100%;

  /* but you can force different heights */
  height: 300px;
}

.embed-text {
  display: block;
  margin: 0;
  font-size: 0.8rem;
  padding: 5px;
}

/* ERROR EMBED */
.embed-error {
  background-color: #333333;
  border-radius: 5px;
  font-size: 0.8rem;
  border: 1px solid lightgrey;
  text-align: center;
  color: white;
  padding: 10px;
}
</style>
