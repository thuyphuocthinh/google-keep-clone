export default {
    setLabels(state: any, payload: []) {
        state.labels = payload
    },
    setLabelDetail(state: any, payload: {}) {
        state.labelDetail = payload;
    }
};