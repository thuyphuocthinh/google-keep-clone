import { STATUS_CODE } from "../constants";
import { noteServiceSuco } from "../services/sNote/noteServiceSuco";

export const getNotesHelper = async (store: any) => {
    try {
        const result = await noteServiceSuco.getNotes();
        const statusCode: number = result.status;
        if(statusCode === STATUS_CODE.SUCCESS) {
            store.dispatch("tasksModule/setTasksAction", result.data.data);
        }
    } catch (error) {
        console.log(error);
        store.dispatch("tasksModule/setTasksAction", []);
    }
}