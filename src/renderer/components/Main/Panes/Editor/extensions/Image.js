import { Node, Plugin } from "tiptap";
import { nodeInputRule } from "tiptap-commands";

const uuidv1 = require("uuid/v1");
import { jetpack } from "../../../../../common";

import store from "../../../../../store";

/**
 * Matches following attributes in Markdown-typed image: [, alt, src, title]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "Ipsum") -> [, "", "image.jpg", "Ipsum"]
 * ![Lorem](image.jpg "Ipsum") -> [, "Lorem", "image.jpg", "Ipsum"]
 */
const IMAGE_INPUT_REGEX = /!\[(.+|:?)\]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

const createSrcLinkToImage = node => {
  const s_current_file_path = store.state.Document.s_current_file_path;
  const curr_src = node.attrs.src;
  if (curr_src.startsWith("./")) {
    const relative_path = curr_src.slice(1);
    return "file:" + s_current_file_path + relative_path;
  }
  return curr_src;
};

const saveImages = (view, event, eventType) => {
  // check if event contains any files
  let hasFiles = false;
  let dataSource = null;
  if (eventType === "paste") {
    dataSource = event.clipboardData;
  } else if (eventType === "drop") {
    dataSource = event.dataTransfer;
  } else {
    return;
  }
  hasFiles = dataSource && dataSource.files && dataSource.files.length;
  if (!hasFiles) {
    return;
  }
  if (!dataSource) {
    return;
  }

  // get images from the files
  let images = Array.from(dataSource.files).filter(file =>
    /image/i.test(file.type)
  );
  if (images.length === 0) {
    return;
  }

  // prevent regular event
  event.preventDefault();

  // iterate over the image files
  const { schema } = view.state;
  const s_current_file_path = store.state.Document.s_current_file_path;
  images.forEach(image => {
    // reader to get its data
    const reader = new FileReader();

    // listener for when the file is loaded
    reader.onload = readerEvent => {
      let node = null;
      if (s_current_file_path) {
        // create path to file
        const image_name = uuidv1() + "-" + image.name;
        const relative_path = "./assets/" + image_name;
        const absolute_path = s_current_file_path + "/assets/" + image_name;
        // save file
        jetpack.append(
          absolute_path,
          Buffer.from(new Uint8Array(readerEvent.target.result)),
          {}
        );
        // create node
        node = schema.nodes.image.create({
          src: relative_path
        });
      } else {
        // embed file
        const embedData = readerEvent.target.result;
        // create node
        node = schema.nodes.image.create({
          src: embedData
        });
      }

      // dispatch transaction
      const transaction = view.state.tr.insert(
        view.state.selection.$cursor.pos,
        node
      );
      view.dispatch(transaction);
    };

    // read image data
    if (s_current_file_path) {
      // if a file exists on disk, then read the image as a buffer for storage
      reader.readAsArrayBuffer(image);
    } else {
      // if not, read the image as a string for embeddings
      reader.readAsDataURL(image);
    }
  });
};

export default class Image extends Node {
  get name() {
    return "image";
  }

  get schema() {
    return {
      inline: true,
      attrs: {
        src: {},
        alt: {
          default: null
        },
        title: {
          default: null
        }
      },
      group: "inline",
      draggable: true,
      parseDOM: [
        {
          tag: "img[src]",
          getAttrs: dom => ({
            src: dom.getAttribute("src"),
            title: dom.getAttribute("title"),
            alt: dom.getAttribute("alt")
          })
        }
      ],
      toDOM: node => [
        "img",
        {
          ...node.attrs,
          src: createSrcLinkToImage(node)
        }
      ]
    };
  }

  commands({ type }) {
    return attrs => (state, dispatch) => {
      const { selection } = state;
      const position = selection.$cursor
        ? selection.$cursor.pos
        : selection.$to.pos;
      const node = type.create(attrs);
      const transaction = state.tr.insert(position, node);
      dispatch(transaction);
    };
  }

  inputRules({ type }) {
    return [
      nodeInputRule(IMAGE_INPUT_REGEX, type, match => {
        const [, alt, src, title] = match;
        return {
          src,
          alt,
          title
        };
      })
    ];
  }

  get plugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            // PASTE
            paste(view, event) {
              saveImages(view, event, "paste");
            },

            // DROP EVENT
            drop(view, event) {
              saveImages(view, event, "drop");
            }
          }
        }
      })
    ];
  }
}
