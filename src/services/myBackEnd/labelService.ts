import { DOMAIN } from "../../constants";
import { Label } from "../../models/label";
import { BaseService } from "../baseService";

class LabelService extends BaseService {
    getLabels(userId: string) {
        return this.get(`${DOMAIN}/labels/getListLabels/${userId}`);
    }
    createLabel(data: Label) {
        return this.post(`${DOMAIN}/labels/create`, data);
    }
    deleteLabel(labelId: string) {
        return this.patch(`${DOMAIN}/labels/delete/${labelId}`, {});
    }
    updateLabel(labelUpdate: {}) {
        return this.patch(`${DOMAIN}/labels/updateTitle`, labelUpdate);
    }
    getLabelDetail(labelId: string) {
        return this.get(`${DOMAIN}/labels/getLabelById/${labelId}`);
    }
}

export const labelService = new LabelService();