import { toast } from "vue3-toastify";
import { labelService } from "../services/myBackEnd/labelService";
import { STATUS_CODE } from "../constants";
import { Label } from "../models/label";
import * as tasksHelper from "./tasksHelper";

export const getLabels = async (store: any, userId: string) => {
    try {
        const response: any = await labelService.getLabels(userId);
        const statusCode: number = response.status;        
        if(statusCode === STATUS_CODE.SUCCESS && response.data.success) {
            store.dispatch("labels/setLabelsAction", response.data.data);
        }
    } catch (error: any) {
        console.log(error);
        toast.error(error.data.message);
    }
}

export const createLabel = async (store: any, userId: string, label: Label) => {
    try {
        const response: any = await labelService.createLabel(label);
        const statusCode: number = response.status;
        if(statusCode === STATUS_CODE.SUCCESS && response.data.success) {
            await getLabels(store, userId);
            toast.success(response.data.message);
        }
    } catch (error: any) {
        toast.error(error.data.message);
    }
}

export const deleteLabel = async (store: any, userId: string, labelId: string) => {
    try {
        const response: any = await labelService.deleteLabel(labelId);
        const statusCode: number = response.status;
        if(statusCode === STATUS_CODE.SUCCESS && response.data.success) {
            await getLabels(store, userId);
            await tasksHelper.getTasksApi(userId, store);
            toast.success(response.data.message);
        }
    } catch (error: any) {
        toast.error(error.data.message);
    }
}

export const updateLabel = async (store: any, userId: string, labelUpdate: {}) => {
    try {
        const response: any = await labelService.updateLabel({labelUpdate: labelUpdate});
        const statusCode: number = response.status;
        if(statusCode === STATUS_CODE.SUCCESS && response.data.success) {
            await getLabels(store, userId);
            toast.success(response.data.message);
        }
    } catch (error: any) {
        toast.error(error.data.message);
    }
}

export const getLabelById = async (store: any, labelId: string) => {
    try {
        const response: any = await labelService.getLabelDetail(labelId);
        const statusCode: number = response.status;
        if(statusCode === STATUS_CODE.SUCCESS && response.data.success) {
            store.dispatch("labels/setLabelDetailAction", response.data.data);
        }
    } catch (error: any) {
        toast.error(error?.data.message || "Error");
    }
}