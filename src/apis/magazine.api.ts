import { API_URL } from "@app/constant/url";
import {} from "@app/interfaces";
import { MagazineCreateInterface } from "@app/interfaces/Magazine";
import axios from "axios";

export const getMagazines = (id: string) =>
  axios.get(`${API_URL.MAGAZINE}/list/${id}`);

export const getStudentMagazines = (id: string) =>
  axios.get(`${API_URL.MAGAZINE}/student/${id}`);

export const createMagazine = (params: MagazineCreateInterface) =>
  axios.post(`${API_URL.MAGAZINE}/create`, params);

export const deleteMagazine = (id: string) =>
  axios.delete(`${API_URL.MAGAZINE}/delete/${id}`);

export const getMagazine = (id: string) =>
  axios.get(`${API_URL.MAGAZINE}/${id}`);

export const updateMagazine = (id: string, params: MagazineCreateInterface) =>
  axios.patch(`${API_URL.MAGAZINE}/update/${id}`, params);
