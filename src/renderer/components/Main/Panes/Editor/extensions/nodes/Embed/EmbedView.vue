<script>
import { remote, shell } from "../../../../../../../common";
const LinkPreview = remote.require("link-preview-js");
import getVideoId from "get-video-id";
import isUrl from "is-url";
export default {
  props: ["node", "updateAttrs", "view"],
  data() {
    return {
      url: "",
      bookmark: {
        title: "",
        description: "",
        faviconURL: "",
        previewImageURL: ""
      }
    };
  },
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
  },
  methods: {
    async queryPreview(url) {
      let previewData = "";
      try {
        previewData = await LinkPreview.getPreview(url);
        this.bookmark = {
          title: previewData.title,
          description: previewData.description,
          faviconURL: previewData.favicons.length && previewData.favicons[0],
          previewImageURL: previewData.images.length && previewData.images[0]
        };
      } catch (e) {}
    },
    clicked(event, url) {
      event.preventDefault();
      shell.openExternal(url);
    }
  },
  mounted() {
    this.queryPreview(this.node.attrs.url);
  }
};
</script>

<template>
  <iframe
    class="embed-iframe embed-common"
    v-if="isSupportedURL"
    :src="node.attrs.url"
    :data-url="node.attrs.url"
    data-type="embed"
    frameborder="0"
    width="100%"
    allowfullscreen
  ></iframe>
  <div
    class="embed-other embed-common"
    v-else-if="isValidURL"
    :data-url="node.attrs.url"
    data-type="embed"
  >
    <div class="embed-other-top">
      <span class="embed-other-title">{{ bookmark.title }}</span>
      <span class="embed-other-description">{{ bookmark.description }}</span>
    </div>
    <div class="embed-other-bottom">
      <img :src="bookmark.faviconURL" class="embed-other-image" alt="image" />
      <a :href="node.attrs.url" class="embed-other-url">{{ node.attrs.url }}</a>
    </div>
  </div>

  <!-- else -->
  <div class="embed-error embed-common" v-else>
    <span>Embed error: URL is invalid.</span>
  </div>
</template>

<style scoped>
.embed-common {
  border-radius: 5px;
  font-size: 0.8rem;
  /* background-color: #8f8f8f; */
  border: 1px solid lightgrey;
}

.embed-iframe {
  height: 300px;
}

/* BOOKMARK EMBEDS */

.embed-other {
  padding: 10px;
}

.embed-other::before,
.embed-other::after {
  display: none;
}

.embed-other-title {
  font-size: 0.9rem;
}

.embed-other-bottom {
  display: flex;
  align-items: center;
}

.embed-other-image {
  width: 20px;
  margin-right: 10px;
}

.embed-other-description {
  display: block;
}

/* ERROR EMBED */

.embed-error {
  text-align: center;
  padding: 10px;
}
</style>
