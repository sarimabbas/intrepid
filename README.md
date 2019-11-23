# Intrepid

> A note-taking app for macOS

<p align="center">
    <img src="./docs/icon.png" width=70 alt="icon">
</p>

![Cover](./docs/cover.png)

## Table of contents

- [Intrepid](#intrepid)
  - [Table of contents](#table-of-contents)
  - [Goals](#goals)
  - [Features](#features)
    - [More on image handling](#more-on-image-handling)
      - [Local images](#local-images)
      - [Remote images](#remote-images)
  - [Reading list](#reading-list)
  - [Use of Electron](#use-of-electron)

## Goals

I've been looking for an [effective way to take notes for some time](https://sarimabbas.com/posts/2019/markdown-editor/). I am drawn to the simplicity of Markdown-like syntax for note-taking, however I have my reservations about apps that keep my notes in siloes and sync them with their servers. I much prefer having complete ownership of my data, in the form of files that I can sync with a provider of my choice. My second gripe with existing editors is their lack of features in the context of web app data. [Note-taking apps should synthesize our digital lives](https://sarimabbas.com/posts/2019/unified-productivity/), but they're usually only good for a particular file format. I intend to make this editor customizable and versatile enough that it can handle storage, organization and preview of diverse data.

## Features

| Feature                         | Intrepid           | Typora                    |
| ------------------------------- | ------------------ | ------------------------- |
| Markdown WYSIWYG                | :white_check_mark: | :white_check_mark:        |
| Images (embedded or file links) | :white_check_mark: | :question: (not embedded) |
| Bundle file format              | :white_check_mark: | :x:                       |
| Syntax highlighting             | :white_check_mark: | :white_check_mark:        |
| Outline panel                   | :white_check_mark: | :white_check_mark:        |
| Native performance              | :x:                | :x:                       |

### More on image handling

#### Local images

One of the core principles behind Intrepid is that your data must be portable. For a new, unsaved file, pasted or dropped images are embedded as Base64 encoded strings. When the file is saved, these images are extracted to an assets folder inside your file. From then on, all new images are added to the assets folder.

#### Remote images

Use the Markdown image syntax. All these links will remain unchanged.

## Reading list

- https://open.nytimes.com/building-a-text-editor-for-a-digital-first-newsroom-f1cb8367fc21

## Use of Electron

Electron is notorious for memory consumption and large app sizes. However, it remains the best tool (for me) to prototype quickly using my web development skills, and plug into the vast JavaScript ecosystem. As Intrepid develops, I will try to optimize it and reduce its footprint.
