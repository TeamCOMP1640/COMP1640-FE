import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

import { getLocalStorage } from "@app/config/storage";
import { ACCESS_TOKEN } from "@app/constant/auth";

interface Workspace {
  name: string;
  workspaceConfigurations: {
    key: string;
    value: any;
  }[];
}
interface User {
  id: string;
  lastName: string;
  firstName: string;
  fullName: string;
  email: string;
  workspaceId: string;
  role: string;
  workspace?: Workspace | null;
}

interface AuthState {
  isAuth: boolean;
  user: User | null;
  role: string;
  workspaceType?: string;
}

const checkAuth = (): boolean => Boolean(getLocalStorage(ACCESS_TOKEN));

const initialState: AuthState = {
  isAuth: checkAuth(),
  user: null,
  role: "",
  workspaceType: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { token } = action.payload;
      if (token) {
        const decoded = jwtDecode<{ role: string }>(token);
        state.role = decoded.role;
      }
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});

const { reducer, actions } = authSlice;

export const { login, logout } = actions;

export default reducer;
