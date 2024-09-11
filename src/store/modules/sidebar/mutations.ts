export default {
  showFullSidebar(state: any) {
    state.isSiderFull = true;
    state.canHover = false;
  },
  showIconSidebar(state: any) {
    state.isSiderFull = false;
    state.canHover = true;
  },
  hoverSidebar(state: any, payload: any) {
    state.isSiderFull = payload.payload;
  }
};
