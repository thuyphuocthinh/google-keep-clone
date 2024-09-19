import { STATUS_CODE } from "../constants";
import { userServiceSuco } from "../services/sNote/userServiceSuco";

export const getUserHelper = async (store: any) => {
    try {
        const result = await userServiceSuco.getUser();
        const statusCode: number = result.status;
        const user = result.data.data;
        if(statusCode === STATUS_CODE.SUCCESS) {
            store.dispatch("user/setUserLoginAction", user);
        }
    } catch (error) {
        console.log(error);
    }
}