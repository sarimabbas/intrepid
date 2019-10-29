
<script>
import { XIcon } from "vue-feather-icons";
export default {
  components: {
    XIcon
  }
};
</script>

<template>
  <div class="modal-card" style="min-width: 75vw; min-height: 50vw">
    <header class="modal-card-head">
      <p class="modal-card-title">Preferences</p>
      <XIcon @click="$parent.close()" class="vue-feather" />
    </header>
    <section class="modal-card-body">
      <b-tabs type="is-boxed">
        <b-tab-item label="Appearance">
          <h1 class="is-size-4">Sidebar</h1>
          <div>
            <span>Show outline</span>
          </div>

          <h1></h1>
        </b-tab-item>
        <b-tab-item label="Theming"></b-tab-item>
        <b-tab-item label="Markdown"></b-tab-item>
      </b-tabs>
    </section>
    <footer class="modal-card-foot">
      <p>All changes are saved automatically.</p>
    </footer>
  </div>
</template>


<style scoped>
.modal-card-foot {
  display: block;
}
</style>
