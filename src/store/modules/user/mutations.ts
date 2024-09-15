export default {
  setUserLogin(state: any, payload: any) {
    state.isLoggedIn = true;
    state.userLogin = payload;
  },
  setUserLogout(state: any) {
    state.isLoggedIn = false;
    state.userLogin = {};
  },
};
