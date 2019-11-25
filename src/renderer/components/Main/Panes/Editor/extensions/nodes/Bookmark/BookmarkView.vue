<script>
import { remote, shell } from "../../../../../../../common";
const LinkPreview = remote.require("link-preview-js");

export default {
  props: ["node", "updateAttrs", "view"],
  data() {
    return {
      bookmark: {
        url: "",
        title: "",
        description: "",
        faviconURL: "",
        previewImageURL: ""
      }
    };
  },
  methods: {
    async queryPreview(url) {
      let previewData = "";
      try {
        previewData = await LinkPreview.getPreview(url);
        const updateData = {
          url: url,
          title: previewData.title,
          description: previewData.description,
          faviconURL: previewData.favicons.length && previewData.favicons[0],
          previewImageURL: previewData.images.length && previewData.images[0]
        };
        console.log(updateData);
        this.bookmark = updateData;
      } catch (e) {
        this.bookmark = {
          ...this.bookmark,
          url: "error"
        };
      }
    },
    clicked(event, url) {
      event.preventDefault();
      shell.openExternal(url);
    },
    truncate(input, len) {
      return input.length > len ? `${input.substring(0, len)}...` : input;
    }
  },
  mounted() {
    this.queryPreview(this.node.attrs.url);
  }
};
</script>

<template>
  <!-- BOOKMARK -->
  <div
    class="bookmark"
    v-if="bookmark.url && bookmark.url != 'error'"
    :data-url="bookmark.url"
    data-type="bookmark"
  >
    <!-- LEFT -->
    <div class="bookmark-left">
      <img
        v-if="bookmark.previewImageURL"
        :src="bookmark.previewImageURL"
        class="bookmark-preview-image"
        alt="previewImage"
      />
    </div>
    <!-- RIGHT -->
    <div class="bookmark-right">
      <!-- RIGHT:TOP -->
      <div class="bookmark-top">
        <span class="bookmark-title">{{ bookmark.title }}</span>
        <span class="bookmark-description">{{ truncate(bookmark.description, 150) }}</span>
      </div>
      <!-- RIGHT:BOTTOM -->
      <div class="bookmark-bottom">
        <img
          v-if="bookmark.faviconURL"
          :src="bookmark.faviconURL"
          class="bookmark-favicon"
          alt="favicon"
        />
        <a
          :href="bookmark.url"
          class="bookmark-url"
          @click="e => this.clicked(e, bookmark.url)"
        >{{ truncate(bookmark.url, 60) }}</a>
      </div>
    </div>
  </div>
  <!-- loading -->
  <div class="bookmark bookmark-error" v-else-if="bookmark.url == 'error'">
    <span>Bookmark error: URL is invalid.</span>
  </div>
  <!-- error -->
  <div class="bookmark bookmark-loading" v-else>
    <span>Fetching bookmark...</span>
  </div>
</template>

<style scoped>
.bookmark {
  border-radius: 5px;
  font-size: 0.8rem;
  border: 1px solid lightgrey;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.bookmark::before,
.bookmark::after {
  display: none;
}

.bookmark-left {
  min-width: 20%;
  max-width: 20%;
}

@media (max-width: 768px) {
  .bookmark {
    flex-wrap: wrap;
  }

  .bookmark-left {
    min-width: unset;
    max-width: unset;
    width: 100%;
  }
}
.bookmark-preview-image {
  /* odd: the below is needed to remove a tiny 3px margin underneath the image */
  vertical-align: middle;
  object-fit: cover;
  width: 100%;
  height: 150px;
}

.bookmark-right {
  padding: 10px;
}

.bookmark-title {
  font-size: 0.9rem;
}

.bookmark-bottom {
  display: flex;
  align-items: center;
}

.bookmark-favicon {
  width: 20px;
  margin-right: 10px;
}

.bookmark-description {
  display: block;
}

.bookmark-error,
.bookmark-loading {
  text-align: center;
  padding: 10px;
  /* justify-content: center; */
}
</style>
