import { API_URL } from "@app/constant/url";
import {
  AcademicCreateInterface,
  AcademicInterface,
} from "@app/interfaces/Academic";
import axios from "axios";

export const getAcademics = () => axios.get(API_URL.ACADEMICS);

export const createAcademic = (params: AcademicCreateInterface) =>
  axios.post(`${API_URL.ACADEMICS}/create`, params);

export const deleteAcademic = (id: string) =>
  axios.delete(`${API_URL.ACADEMICS}/delete/${id}`);

export const getAcademic = (id: string) =>
  axios.get(`${API_URL.ACADEMICS}/${id}`);

export const updateAcademic = (id: string, params: AcademicCreateInterface) =>
  axios.patch(`${API_URL.ACADEMICS}/update/${id}`, params);
