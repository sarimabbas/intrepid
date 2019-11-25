import { Node } from "tiptap";
import getVideoId from "get-video-id";
import EmbedView from "./EmbedView.vue";

const transformURLToEmbedURL = url => {
  // video embeds
  const video = getVideoId(url);
  if (video.service == "youtube") {
    return `https://www.youtube.com/embed/${video.id}`;
  } else if (video.servide == "dailymotion") {
    return `https://www.dailymotion.com/embed/video/${video.id}`;
  } else if (video.service == "vimeo") {
    return `https://player.vimeo.com/video/${video.id}`;
  }
  // return original if nothing can be done
  return url;
};

export default class Embed extends Node {
  get name() {
    return "embed";
  }

  get schema() {
    return {
      attrs: {
        url: {
          default: ""
        }
      },
      content: "inline*",
      group: "block",

      // these are only needed for copy/pasting existing components
      parseDOM: [
        {
          tag: `[data-type="${this.name}"]`,
          getAttrs: dom => ({
            url: dom.getAttribute("data-url")
          })
        }
      ],

      // although the Vue component decides the rendering, this is useful when exporting to HTML or Markdown
      toDOM: node => [
        "iframe",
        {
          "data-type": this.name,
          "data-url": node.attrs.url,
          src: node.attrs.url
        },
        0
      ]
    };
  }

  commands({ type, schema }) {
    return attrs => (state, dispatch, view) => {
      const cursor = state.selection.$cursor;

      let currentNodeText = "";
      if (cursor.nodeBefore) {
        currentNodeText = cursor.nodeBefore.text;
      } else if (cursor.nodeAfter) {
        currentNodeText = cursor.nodeAfter.text;
      }

      const node = type.create({
        ...attrs,
        url: transformURLToEmbedURL(currentNodeText)
      });

      const transaction = state.tr.replaceSelectionWith(node);
      dispatch(transaction);
    };
  }

  get view() {
    return EmbedView;
  }
}
