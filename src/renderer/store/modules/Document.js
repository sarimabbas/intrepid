const state = {
  s_current_file_path: "",
  s_current_file_contents: "",
  s_pending_save: false,
  s_headings: []
};

const mutations = {
  m_current_file_path(state, payload) {
    state.s_current_file_path = payload.file_path;
  },

  m_pending_save_set(state, payload) {
    state.s_pending_save = payload.needs_save;
  },

  m_headings_set(state, payload) {
    state.s_headings = payload.headings;
  }
};

const actions = {
  m_current_file_path({ commit }, payload) {
    commit("m_current_file_path", payload);
  },

  m_pending_save_set({ commit }, payload) {
    commit("m_pending_save_set", payload);
  },

  m_headings_set({ commit }, payload) {
    commit("m_headings_set", payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
