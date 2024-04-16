import { API_URL } from "@app/constant/url";
import {
  AssignStudentParams,
  FacultyCreateInterface,
} from "@app/interfaces/Faculty";
import axios from "axios";

export const getFaculties = () => axios.get(API_URL.FACULTIES);

export const createFaculty = (params: FacultyCreateInterface) =>
  axios.post(`${API_URL.FACULTIES}/create`, params);

export const deleteFaculty = (id: string) =>
  axios.delete(`${API_URL.FACULTIES}/delete/${id}`);

export const getFaculty = (id: string) =>
  axios.get(`${API_URL.FACULTIES}/${id}`);

export const updateFaculty = (id: string, params: FacultyCreateInterface) =>
  axios.patch(`${API_URL.FACULTIES}/update/${id}`, params);

export const assignStudent = (id: string, params: AssignStudentParams) =>
  axios.post(`${API_URL.FACULTIES}/student/${id}/${params.userId}`, params);
