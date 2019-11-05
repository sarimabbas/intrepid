const state = {
  s_current_file_path: "",
  s_pending_save: false,
  s_headings: []
};

const mutations = {
  m_current_file_path(state, payload) {
    state.s_current_file_path = payload.file_path;
  },

  m_pending_save(state, payload) {
    state.s_pending_save = payload.needs_save;
  },

  m_headings(state, payload) {
    state.s_headings = payload.headings;
  }
};

const actions = {
  m_current_file_path({ commit }, payload) {
    commit("m_current_file_path", payload);
  },

  m_pending_save({ commit }, payload) {
    commit("m_pending_save", payload);
  },

  m_headings({ commit }, payload) {
    commit("m_headings", payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
