
<script>
import { XIcon } from "vue-feather-icons";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    XIcon
  },
  methods: {
    ...mapActions("Preferences", ["m_embed_assets", "m_focus_cursor"])
  },
  computed: {
    ...mapState("Preferences", ["s_embed_assets", "s_focus_cursor"])
  }
};
</script>

<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Preferences</p>
      <XIcon @click="$parent.close()" class="vue-feather" />
    </header>
    <section class="modal-card-body">
      <b-tabs type="is-boxed" position="is-centered">
        <b-tab-item label="Editor">
          <div class="control">
            <div>
              <p>Focus selection</p>
              <p
                class="has-text-grey is-size-7"
              >A blue outline will appear around cursor selection (requires restart).</p>
            </div>
            <b-switch :value="s_focus_cursor" v-on:input="m_focus_cursor" type="is-info"></b-switch>
          </div>
        </b-tab-item>
        <b-tab-item label="Sharing">
          <div class="control">
            <div>
              <p>Embed assets in exported files</p>
              <p class="has-text-grey is-size-7">Assets will be embedded as Base64 encoded strings.</p>
            </div>
            <b-switch :value="s_embed_assets" v-on:input="m_embed_assets" type="is-info"></b-switch>
          </div>
        </b-tab-item>
      </b-tabs>
    </section>
    <footer class="modal-card-foot">
      <p>All changes are saved automatically.</p>
    </footer>
  </div>
</template>


<style scoped>
.modal-card {
  min-width: 60vw;
  min-height: 40vw;
}

.modal-card-foot {
  display: block;
}

.control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
}
</style>
