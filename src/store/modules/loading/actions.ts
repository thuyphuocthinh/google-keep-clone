export default {
  showLoadingAction({ commit }: any) {
    commit("showLoading");
  },
  hideLoadingAction({ commit }: any) {
    commit("hideLoading");
  },
};
