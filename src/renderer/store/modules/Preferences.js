const state = {
  s_embed_assets: true
};

const mutations = {
  m_embed_assets(state, payload) {
    state.s_embed_assets = !state.s_embed_assets;
  }
};

const actions = {
  m_embed_assets({ commit }, payload) {
    commit("m_embed_assets", payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
