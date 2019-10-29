const state = {
    s_current_file_path: "",
    s_current_file_contents: ""
};

const mutations = {
    m_current_file_set(state, payload) {
        state.s_current_file_path = payload.file_path;
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
