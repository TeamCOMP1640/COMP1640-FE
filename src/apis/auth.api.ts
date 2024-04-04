import axios from "axios";

import { Credentials } from "@app/interfaces/user.interface";
import { API_URL } from "@app/constant/url";

export const loginApi = (credentials: Credentials) =>
  axios.post(API_URL.LOGIN, credentials);

export const refreshTokenApi = () => axios.post(API_URL.REFRESH_TOKEN);

export const getLogout = () => axios.post(API_URL.LOGOUT);
