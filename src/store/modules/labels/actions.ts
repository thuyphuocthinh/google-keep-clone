export default {
    setLabelsAction({commit}: any, payload: []) {
        commit("setLabels", payload);
    },
    setLabelDetailAction({commit}: any, payload: {}) {
        commit("setLabelDetail", payload);
    }
};