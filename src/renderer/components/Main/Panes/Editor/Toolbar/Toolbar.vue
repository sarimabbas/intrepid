<script>
import { mapState, mapActions } from "vuex";
import IconButton from "../../../IconButton/IconButton";
import { SidebarIcon } from "vue-feather-icons";
import Share from "./Share/Share";
export default {
  components: {
    IconButton,
    SidebarIcon,
    Share
  },
  computed: {
    ...mapState("Interface", ["s_sidebar_toggle"])
  },
  methods: {
    ...mapActions("Interface", ["m_sidebar_toggle"])
  }
};
</script>

<template>
  <footer class="toolbar">
    <div class="toolbar-buttons">
      <IconButton @click.native="m_sidebar_toggle" :is-active="s_sidebar_toggle">
        <sidebar-icon size="1.5x" />
      </IconButton>
      <Share />
    </div>
  </footer>
</template>


<style scoped>
/* flex bottom */
.toolbar {
  background-color: #222222;
  padding: 7px;
  color: white;
}

.toolbar-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
