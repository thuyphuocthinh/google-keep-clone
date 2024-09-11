export default {
  showFullSidebar(context: any) {
    context.commit("showFullSidebar");
  },
  showIconSidebar(context: any) {
    context.commit("showIconSidebar");
  },
  hoverSidebar(context: any, payload: Boolean) {
    context.commit("hoverSidebar", payload);
  }
};
