export enum STATUS {
  TODO = "ST1",
  PROGRESS = "ST2",
  DONE = "ST3",
}

export const TOKEN: string = "TOKEN";
export const DOMAIN: string = "http://localhost:3000/api/v1";

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
}
