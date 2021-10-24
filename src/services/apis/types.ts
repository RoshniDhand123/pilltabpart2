import { string } from "yup/lib/locale";

export type Response = {
    status?: boolean;
    data?: any;
    msg?: string;
  };

export type login_type = {
  email: string;
  password: string
}

export type reset_pswd_type = {
  email: string;
  password: string;
  otp: string
}
  
