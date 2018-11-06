import * as types from "./types";
const mutations = {
  [types.SET_LOADING](state, flag) {
    state.isLoading = flag;
  }
};
export default mutations;
