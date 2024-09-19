import { BaseService } from "./baseService";

export class UserServiceSuco extends BaseService {
    getUser() {
        return this.get("api/v1/user");
    }
}

export const userServiceSuco = new UserServiceSuco();   