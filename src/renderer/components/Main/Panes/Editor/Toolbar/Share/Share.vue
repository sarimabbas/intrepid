
<script>
import IconButton from "../../../../IconButton/IconButton";
import { SidebarIcon, ShareIcon } from "vue-feather-icons";
import EditorInstance from "../../EditorInstance";
import { dialog, jetpack } from "../../../../../../common";
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
      //   console.log(file_path);
      jetpack.remove(file_path);
      jetpack.append(file_path, contents);
    },
    exportMarkdown() {},
    exportHTML() {
      const contents = EditorInstance.getHTML();
      this.saveFile(contents, "Untitled.html");
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
    <b-dropdown-item aria-role="listitem">Markdown</b-dropdown-item>
    <b-dropdown-item aria-role="listitem">PDF</b-dropdown-item>
  </b-dropdown>
</template>


<style>
</style>