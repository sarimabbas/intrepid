const state = {
    s_current_file: ""
};

const mutations = {
    m_current_file_set(state, payload) {
        state.s_current_file = payload.current_file;
    }
};

const actions = {
    m_current_file_set({ commit }, payload) {
        commit("m_current_file_set", payload);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
