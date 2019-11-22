import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import ElectronStore from "electron-store";

// import { createPersistedState, createSharedMutations } from "vuex-electron";

import modules from "./modules";

const electronStore = new ElectronStore();

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => electronStore.get(key),
        setItem: (key, value) => electronStore.set(key, value),
        removeItem: key => electronStore.delete(key)
      },
      // blacklist of things you don't want to persist
      reducer: state => {
        const copy = JSON.parse(JSON.stringify(state));
        delete copy.Document.s_current_file_path;
        delete copy.Document.s_headings;
        delete copy.Document.s_pending_save;
        delete copy.Interface.s_find_replace;
        return copy;
      }
    })
  ],
  strict: process.env.NODE_ENV !== "production"
});
