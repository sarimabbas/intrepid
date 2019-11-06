const state = {
  s_sidebar_toggle: true,
  s_find_replace: false
};

const mutations = {
  m_sidebar_toggle(state) {
    state.s_sidebar_toggle = !state.s_sidebar_toggle;
  },
  m_find_replace(state) {
    state.s_find_replace = !state.s_find_replace;
  }
};

const actions = {
  m_sidebar_toggle({ commit }) {
    commit("m_sidebar_toggle");
  },
  m_find_replace({ commit }) {
    commit("m_find_replace");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
