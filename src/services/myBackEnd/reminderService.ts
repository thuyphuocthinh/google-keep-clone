import { DOMAIN } from "../../constants";
import { Reminder } from "../../models/reminder";
import { BaseService } from "../baseService";

class ReminderService extends BaseService {
    create(reminder: Reminder) {
        return this.post(`${DOMAIN}/reminder/create`, reminder);
    }
    deleteById(reminderId: string) {
        return this.patch(`${DOMAIN}/reminder/delete/${reminderId}`, {});
    }
}

export const reminderService = new ReminderService();