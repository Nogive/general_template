import * as types from "./types";
const actions = {
  setLoading: function({ commit }, flag) {
    commit(types.SET_LOADING, flag);
  }
};
export default actions;
