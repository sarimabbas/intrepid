
<script>
import { MoreHorizontalIcon, SettingsIcon } from "vue-feather-icons";
import IconButton from "../../../../IconButton/IconButton";
import PrefFull from "../PrefFull/PrefFull.vue";
export default {
  components: {
    MoreHorizontalIcon,
    SettingsIcon,
    PrefFull,
    IconButton
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
        hasModalCard: true,
        canCancel: false
      });
    }
  }
};
</script>


<template>
  <!-- start menu -->
  <b-dropdown position="is-top-right" :mobile-modal="false" aria-role="menu">
    <div slot="trigger" class="more">
      <IconButton>
        <more-horizontal-icon size="1.5x" />
      </IconButton>
    </div>

    <div class="dropdown-item">
      <strong>Preferences</strong>
    </div>
    <hr class="dropdown-divider" />

    <!-- <b-dropdown-item>Action</b-dropdown-item>
    <b-dropdown-item>Another action</b-dropdown-item>
    <hr class="dropdown-divider" />-->

    <!-- Settings modal -->
    <a class="dropdown-item" @click="showPrefFull()">
      <div class="icon-text">
        <span>View all preferences</span>
        <settings-icon size="1.5x" />
      </div>
    </a>

    <!-- end menu -->
  </b-dropdown>
</template>


<style scoped>
.more {
  cursor: pointer;
}

.icon-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.full-pref-text {
  margin-left: 5px;
}

/* Bulma over-rides  */
.dropdown-item {
  padding: 6px 16px;
}
</style>