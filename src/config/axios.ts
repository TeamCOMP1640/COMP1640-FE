import { refreshTokenApi } from "@app/apis/auth.api";
import {
  ACCESS_TOKEN,
  AVATAR,
  REFRESH_TOKEN,
  USER_PROFILE,
} from "@app/constant/auth";
import { API_URL } from "@app/constant/url";
import axios, { InternalAxiosRequestConfig } from "axios";
import { getLocalStorage, removeStorageData, setStorageData } from "./storage";

const axiosInstance = axios.create();
axios.defaults.baseURL =
  location.origin.includes("127.0.0.1") || location.origin.includes("localhost")
    ? "http://localhost:3000"
    : `${location.origin}/api`;

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.url === API_URL.LOGIN) {
    return config;
  }

  if (config.url === API_URL.REFRESH_TOKEN) {
    const refreshToken = getLocalStorage(REFRESH_TOKEN);

    if (refreshToken) {
      config.headers["Authorization"] = `Bearer ${refreshToken}`;
    }

    return config;
  }

  const accessToken = getLocalStorage(ACCESS_TOKEN);
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const { message } = error?.response?.data;
    if (
      error.config.url === API_URL.REFRESH_TOKEN &&
      message === "TOKEN_EXPIRED"
    ) {
      removeStorageData(ACCESS_TOKEN);
      removeStorageData(REFRESH_TOKEN);
      removeStorageData(USER_PROFILE);
      removeStorageData(AVATAR);
      window.location.href = "/";
    }

    if (message === "TOKEN_EXPIRED" && !originalRequest._retry) {
      originalRequest._retry = true;
      const { data } = await refreshTokenApi();
      if (data.message === "INVALID_TOKEN") {
        removeStorageData(ACCESS_TOKEN);
        removeStorageData(REFRESH_TOKEN);
        removeStorageData(USER_PROFILE);
        removeStorageData(AVATAR);
        window.location.href = "/";
      }
      setStorageData(ACCESS_TOKEN, data.data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);
