
<script>
import { MoreHorizontalIcon, SettingsIcon } from "vue-feather-icons";
import PrefFull from "../PrefFull/PrefFull.vue";
export default {
  components: {
    MoreHorizontalIcon,
    SettingsIcon,
    PrefFull
  },
  data() {
    return {
      isModalActive: false
    };
  },
  methods: {
    showPrefFull() {
      this.$buefy.modal.open({
        parent: this,
        component: PrefFull,
        hasModalCard: true
      });
    }
  }
};
</script>


<template>
  <!-- start menu -->
  <b-dropdown position="is-top-right" :mobile-modal="false" aria-role="menu">
    <div slot="trigger" class="more">
      <more-horizontal-icon />
    </div>
    <b-dropdown-item aria-role="menu-item">Action</b-dropdown-item>
    <b-dropdown-item aria-role="menu-item">Another action</b-dropdown-item>

    <!-- Settings modal -->
    <b-dropdown-item aria-role="menu-item" @click="showPrefFull()">
      <settings-icon />Preferences
    </b-dropdown-item>

    <!-- end menu -->
  </b-dropdown>
</template>


<style scoped>
.more {
  cursor: pointer;
}
</style>