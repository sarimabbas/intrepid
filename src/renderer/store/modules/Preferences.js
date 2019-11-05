const state = {
  s_embed_assets: true,
  s_focus_cursor: false
};

const mutations = {
  m_embed_assets(state, payload) {
    state.s_embed_assets = !state.s_embed_assets;
  },
  m_focus_cursor(state, payload) {
    state.s_focus_cursor = !state.s_focus_cursor;
  }
};

const actions = {
  m_embed_assets({ commit }, payload) {
    commit("m_embed_assets", payload);
  },
  m_focus_cursor({ commit }, payload) {
    commit("m_focus_cursor", payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
