export enum STATUS {
  TODO = "ST1",
  PROGRESS = "ST2",
  DONE = "ST3",
}

export const TOKEN: string = "TOKEN";
export const ACCESS_TOKEN: string = "ACCESS_TOKEN";
export const REFRESH_TOKEN: string = "REFRESH_TOKEN";
export const DOMAIN: string = "https://api-note.developer.vi-jp-te.info/";

export const PAGE = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  HOMEPAGE: "HOMEPAGE",
  NOTFOUND: "NOTFOUND",
  TRASH: "TRASH",
  SEARCH: "SEARCH",
};

export enum STATUS_CODE {
  SUCCESS = 200,
  ERROR = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403
}

export enum ROLE {
  USER = "USER",
  ADMIN = "ADMIN"
}

export enum STATUS_TEXT {
  SUCCESS = "success",
  FAILURE = "failure"
}