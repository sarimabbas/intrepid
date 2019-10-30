# intrepid

> A productivity concept

![Cover](./docs/cover.png)

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).


## Image handling

One of the core principles behind Intrepid is that your data must be portable. For a new, unsaved file, pasted or dropped images are embedded as Base64 encoded strings. When the file is saved, these images are extracted to an assets folder inside your file. From then on, all new images are added to the assets folder. 

