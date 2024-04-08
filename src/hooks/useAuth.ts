import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getLogout, loginApi } from "@app/apis/auth.api";
import i18n from "@app/config/i18n";
import { removeStorageData, setStorageData } from "@app/config/storage";
import {
  ACCESS_TOKEN,
  AVATAR,
  REFRESH_TOKEN,
  USER_PROFILE,
} from "@app/constant/auth";
import {
  notificationError,
  notificationSuccess,
} from "@app/helpers/notification";
import { Credentials } from "@app/interfaces/user.interface";
import { login, logout } from "@app/redux/features/auth/authSlice";
import { useTranslation } from "react-i18next";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatchAuth = useDispatch();

  return useMutation({
    mutationFn: async (credentials: Credentials) => {
      const { data } = await loginApi(credentials);
      return data;
    },
    onSuccess: (data) => {
      if (data.code !== 404 && data.message !== 403) {
        notificationSuccess(i18n.t("MESSAGE." + data.message));
        dispatchAuth(login(data.data));
        setStorageData(ACCESS_TOKEN, data.data.accessToken);
        setStorageData(REFRESH_TOKEN, data.data.refreshToken);
        setStorageData(USER_PROFILE, data.data.name);
        setStorageData(AVATAR, data.data.avt);
        navigate("/");
      } else {
        notificationError(i18n.t("MESSAGE." + data.message));
      }
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatchAuth = useDispatch();
  const { i18n } = useTranslation();

  return useMutation({
    mutationFn: async () => {
      const { data } = await getLogout();
      return data;
    },
    onSuccess: (data) => {
      removeStorageData(ACCESS_TOKEN);
      removeStorageData(REFRESH_TOKEN);
      removeStorageData(USER_PROFILE);
      removeStorageData(AVATAR);
      dispatchAuth(logout());
      notificationSuccess(i18n.t("MESSAGE." + data.message));
      navigate("/");
    },
  });
};
