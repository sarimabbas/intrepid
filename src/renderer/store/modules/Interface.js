const state = {
  s_sidebar_toggle: true
};

const mutations = {
  m_sidebar_toggle(state) {
    state.s_sidebar_toggle = !state.s_sidebar_toggle;
  }
};

const actions = {
  m_sidebar_toggle({ commit }) {
    commit("m_sidebar_toggle");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
