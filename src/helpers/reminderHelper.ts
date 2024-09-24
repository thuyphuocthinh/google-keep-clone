import { toast } from "vue3-toastify";
import { Reminder } from "../models/reminder";
import { reminderService } from "../services/myBackEnd/reminderService";
import { STATUS_CODE } from "../constants";
import { getTasksApi } from "./tasksHelper";

export const create = async (reminder: Reminder, userId: string, store: any) => {
    try {
        const result = await reminderService.create(reminder);
        if(result.status === STATUS_CODE.SUCCESS) {
            toast.success(result.data.message);
            getTasksApi(userId, store);
        }
    } catch (error: any) {
        console.log(error);
        toast.error(error.data?.message);
    }
}

export const deleteById = async (reminderId: string, userId: string, store: any) => {
    try {
        const result = await reminderService.deleteById(reminderId);
        if(result.status === STATUS_CODE.SUCCESS) {
            toast.success(result.data.message);
            getTasksApi(userId, store);
        }
    } catch (error: any) {
        console.log(error);
        toast.error(error.data?.message);
    }
}