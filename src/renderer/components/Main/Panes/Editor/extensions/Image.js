import { Node, Plugin } from "tiptap";
import { nodeInputRule } from "tiptap-commands";

const uuidv1 = require("uuid/v1");
const remote = require("electron").remote;
const electronFs = remote.require("fs");
const jetpack = remote.require("fs-jetpack");
const electronDialog = remote.dialog;

const saveImage = path => {};

/**
 * Matches following attributes in Markdown-typed image: [, alt, src, title]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "Ipsum") -> [, "", "image.jpg", "Ipsum"]
 * ![Lorem](image.jpg "Ipsum") -> [, "Lorem", "image.jpg", "Ipsum"]
 */
const IMAGE_INPUT_REGEX = /!\[(.+|:?)\]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

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
            toDOM: node => ["img", node.attrs]
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
                        paste(view, event) {
                            const hasFiles =
                                event.clipboardData &&
                                event.clipboardData.files &&
                                event.clipboardData.files.length;

                            if (!hasFiles) {
                                return;
                            }

                            const images = Array.from(
                                event.clipboardData.files
                            ).filter(file => /image/i.test(file.type));

                            if (images.length === 0) {
                                return;
                            }

                            event.preventDefault();

                            const { schema } = view.state;

                            const dir = "./myfile.crncl/assets/";
                            images.forEach(image => {
                                const reader = new FileReader();
                                const new_path =
                                    dir + uuidv1() + "-" + image.name;
                                reader.onload = readerEvent => {
                                    // save file
                                    jetpack.append(
                                        new_path,
                                        Buffer.from(
                                            new Uint8Array(
                                                readerEvent.target.result
                                            )
                                        ),
                                        {}
                                    );
                                    // create node and dispatch
                                    const node = schema.nodes.image.create({
                                        src: new_path
                                    });
                                    const transaction = view.state.tr.insert(
                                        view.state.selection.$cursor.pos,
                                        node
                                    );
                                    view.dispatch(transaction);
                                };

                                // read image
                                reader.readAsArrayBuffer(image);
                            });
                        },

                        drop(view, event) {
                            const hasFiles =
                                event.dataTransfer &&
                                event.dataTransfer.files &&
                                event.dataTransfer.files.length;

                            if (!hasFiles) {
                                return;
                            }

                            const images = Array.from(
                                event.dataTransfer.files
                            ).filter(file => /image/i.test(file.type));

                            if (images.length === 0) {
                                return;
                            }

                            event.preventDefault();

                            const { schema } = view.state;
                            const coordinates = view.posAtCoords({
                                left: event.clientX,
                                top: event.clientY
                            });

                            // save images to file system
                            const dir = "./myfile.crncl/assets/";
                            const new_paths = [];
                            images.forEach(image => {
                                const new_path =
                                    dir + uuidv1() + "-" + image.name;
                                jetpack.copy(image.path, new_path, {
                                    overwrite: true
                                });
                                new_paths.push(new_path);
                            });

                            new_paths.forEach(path => {
                                const node = schema.nodes.image.create({
                                    src: path
                                });
                                const transaction = view.state.tr.insert(
                                    coordinates.pos,
                                    node
                                );
                                view.dispatch(transaction);
                            });
                        }
                    }
                }
            })
        ];
    }
}
