import { API_URL } from "@app/constant/url";
import { AddScoreInterface } from "@app/interfaces/Account";
import { GetListParams } from "@app/interfaces/common";
import axios from "axios";

export const getAccounts = (params: GetListParams) =>
  axios.get(API_URL.ACCOUNT, { params });

export const getAccount = (id: string) => axios.get(`${API_URL.ACCOUNT}/${id}`);

export const getAccountsNoPaginate = () =>
  axios.get(API_URL.ACCOUNT_NO_PAGINATE);

export const postAddScore = (params: AddScoreInterface) =>
  axios.post(API_URL.SCORE, params);
