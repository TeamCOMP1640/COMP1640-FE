import { API_URL } from "@app/constant/url";
import { AccountCreate, AddScoreInterface } from "@app/interfaces/Account";
import { GetListParams } from "@app/interfaces/common";
import axios from "axios";

export const getAccounts = (
  params: GetListParams & { role: string; facultyId?: number }
) =>
  axios.get(API_URL.ACCOUNT, {
    params,
  });

export const getAccount = (id: string) => axios.get(`${API_URL.ACCOUNT}/${id}`);

export const getAccountsNoPaginate = () =>
  axios.get(API_URL.ACCOUNT_NO_PAGINATE);

export const postAddScore = (params: AddScoreInterface) =>
  axios.post(API_URL.SCORE, params);

export const createAccount = (params: AccountCreate) =>
  axios.post(`${API_URL.ACCOUNT}/create`, params);

export const updateAccount = (id: string, params: AccountCreate) =>
  axios.patch(`${API_URL.ACCOUNT}/update/${id}`, params);

export const deleteAccount = (id: string) =>
  axios.delete(`${API_URL.ACCOUNT}/delete/${id}`);
