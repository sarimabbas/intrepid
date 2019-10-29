const state = {
    s_current_file_path: "",
    s_current_file_contents: "",
    s_pending_save: false
};

const mutations = {
    m_current_file_set(state, payload) {
        state.s_current_file_path = payload.file_path;
    },

    m_pending_save_set(state, payload) {
        state.s_pending_save = payload.needs_save;
    }
};

const actions = {
    m_current_file_set({ commit }, payload) {
        commit("m_current_file_set", payload);
    },

    m_pending_save_set({ commit }, payload) {
        commit("m_pending_save_set", payload);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
