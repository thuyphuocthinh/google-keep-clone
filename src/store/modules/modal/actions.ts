export default {
  openModalAction({ commit }: any, payload: any) {
    commit("openModal", payload);
  },
  closeModalAction({ commit }: any) {
    commit("closeModal");
  },
};
