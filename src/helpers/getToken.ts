import Cookies from "js-cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN } from "../constants";

export const getAccessToken: any = () => Cookies.get(ACCESS_TOKEN);
export const getRefreshToken: any = () => Cookies.get(REFRESH_TOKEN);
export const removeAccessToken = () => Cookies.remove(ACCESS_TOKEN);
export const removeRefreshToken = () => Cookies.remove(REFRESH_TOKEN);
export const setAccessToken = (value: string) => Cookies.set(ACCESS_TOKEN, value);
export const setRefreshToken = (value: string) => Cookies.set(REFRESH_TOKEN, value);
export const removeToken = () => Cookies.remove(TOKEN);
export const getToken = () => Cookies.get(TOKEN);
export const setToken = (value: string) => Cookies.set(TOKEN, value);