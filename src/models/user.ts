export interface USER_SIGN_UP {
    email: string;
    password: string;
    password_confirmation: string;
    firstname: string;
    lastname: string;
    role: string;
}

export interface USER_SIGN_IN {
    email: string;
    password: string;
}