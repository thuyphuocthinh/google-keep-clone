export default {
  setUserLoginAction({ commit }: any, payload: {}) {
    commit("setUserLogin", payload);
  },
  setUserLogoutAction({ commit }: any) {
    commit("setUserLogout");
  },
};
