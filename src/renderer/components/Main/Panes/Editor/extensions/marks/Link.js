import { Mark, Plugin } from "tiptap";
import {
  updateMark,
  removeMark,
  pasteRule,
  markInputRule
} from "tiptap-commands";
import { getMarkAttrs } from "tiptap-utils";
import { shell } from "../../../../../../common";

export default class Link extends Mark {
  get name() {
    return "link";
  }

  get defaultOptions() {
    return {
      openOnClick: true
    };
  }

  get schema() {
    return {
      attrs: {
        href: {
          default: null
        }
      },
      inclusive: false,
      parseDOM: [
        {
          tag: "a[href]",
          getAttrs: dom => ({
            href: dom.getAttribute("href")
          })
        }
      ],
      toDOM: node => [
        "a",
        {
          ...node.attrs,
          rel: "noopener noreferrer nofollow"
        },
        0
      ]
    };
  }

  commands({ type }) {
    return attrs => {
      if (attrs.href) {
        return updateMark(type, attrs);
      }

      return removeMark(type);
    };
  }

  pasteRules({ type }) {
    return [
      pasteRule(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-zA-Z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
        type,
        url => ({ href: url })
      )
    ];
  }

  inputRules({ type }) {
    return [
      markInputRule(
        /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*))\s$/g,
        type,
        matches => {
          return { href: matches[1] };
        }
      )
    ];
  }

  get plugins() {
    if (!this.options.openOnClick) {
      return [];
    }

    return [
      new Plugin({
        props: {
          handleClick: (view, pos, event) => {
            const { schema } = view.state;
            const attrs = getMarkAttrs(view.state, schema.marks.link);

            if (attrs.href && event.target instanceof HTMLAnchorElement) {
              event.stopPropagation();
              // replace below with shell open
              // window.open(attrs.href);
              shell.openExternal(attrs.href);
            }
          }
        }
      })
    ];
  }
}
