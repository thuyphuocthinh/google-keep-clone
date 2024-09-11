export default {
  openModal(state: any, payload: any) {
    state.isOpen = true;
    state.component = payload;
  },
  closeModal(state: any) {
    state.isOpen = false;
    state.component = null;
  },
};
