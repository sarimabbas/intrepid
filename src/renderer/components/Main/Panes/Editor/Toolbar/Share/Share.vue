
<script>
import IconButton from "../../../../IconButton/IconButton";
import { SidebarIcon, ShareIcon } from "vue-feather-icons";
import createHTML from "./createHTML";
import { dialog, jetpack } from "../../../../../../common";
import TurndownService from "turndown";
export default {
  components: {
    IconButton,
    ShareIcon
  },
  methods: {
    saveFile(contents, defaultPath) {
      const file_path = dialog.showSaveDialogSync({
        showsTagField: true,
        defaultPath
      });
      if (!file_path) {
        return;
      }
      jetpack.remove(file_path);
      jetpack.append(file_path, contents);
    },
    exportMarkdown() {
      const html = createHTML();
      const turndown = new TurndownService({
        headingStyle: "atx",
        codeBlockStyle: "fenced"
      });
      const markdown = turndown.turndown(html);
      this.saveFile(markdown, "Untitled.md");
    },
    exportHTML() {
      const html = createHTML();
      this.saveFile(html, "Untitled.html");
    }
  }
};
</script>

<template>
  <b-dropdown position="is-top-left" :mobile-modal="false" aria-role="menu">
    <div slot="trigger">
      <IconButton>
        <share-icon size="1.5x" />
      </IconButton>
    </div>

    <b-dropdown-item aria-role="listitem" @click="exportHTML">HTML</b-dropdown-item>
    <b-dropdown-item aria-role="listitem" @click="exportMarkdown">Markdown</b-dropdown-item>
    <b-dropdown-item aria-role="listitem" @click="exportPDF">PDF</b-dropdown-item>
  </b-dropdown>
</template>


<style>
</style>