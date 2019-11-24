import { Node } from "tiptap";

export default class IFrame extends Node {
  get name() {
    return "iframe";
  }

  get schema() {
    return {
      attrs: {
        src: {
          default: null
        }
      },
      group: "block",
      selectable: false,
      parseDOM: [
        {
          tag: "iframe",
          getAttrs: dom => ({
            src: dom.getAttribute("src")
          })
        }
      ],
      toDOM: node => [
        "iframe",
        {
          src: node.attrs.src,
          frameborder: 0,
          allowfullscreen: "true"
        }
      ]
    };
  }

  get view() {
    return {
      props: ["node", "updateAttrs", "view"],
      computed: {
        src: {
          get() {
            return this.node.attrs.src;
          },
          set(src) {
            this.updateAttrs({
              src
            });
          }
        }
      },
      render(h) {
        return (
          // div is parent
          h(
            "div",
            {
              class: "iframe"
            },
            // these are nested inside
            [
              h("iframe", {
                class: "iframe__embed",
                attrs: {
                  src: this.src
                }
              })
            ]
          )
        );
      }

      //   template: `
      //     <div class="iframe">
      //       <iframe class="iframe__embed" :src="src"></iframe>
      //       <input class="iframe__input" @paste.stop type="text" v-model="src" v-if="view.editable" />
      //     </div>
      //   `
    };
  }
}