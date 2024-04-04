import axios from "axios";

import { API_URL } from "@app/constant/url";
import {
  CreateWorkshop,
  UpdateWorkshop,
  WorkshopListParam,
} from "@app/interfaces/workshop.interface";

export const getListWorkshop = (params: WorkshopListParam) =>
  axios.get(`${API_URL.WORKSHOPS}`, { params });

export const getWorkshopDetail = (id: string) =>
  axios.get(`${API_URL.WORKSHOPS}/${id}`);

export const pathCompletedFeedback = (id: string) =>
  axios.patch(`${API_URL.WORKSHOPS}/${id}/completed`);

export const deleteWorkshop = (id: string) =>
  axios.delete(`${API_URL.WORKSHOPS}/${id}`);

export const postWorkshop = (credentials: CreateWorkshop) =>
  axios.post(API_URL.WORKSHOPS, credentials);

export const getWorkshopDashboard = (date: string) =>
  axios.get(API_URL.WS_DASHBOARD, {
    params: {
      date,
    },
  });

export const postWorkshopById = (credentials: UpdateWorkshop, id: string) =>
  axios.post(`${API_URL.WORKSHOPS}/${id}`, credentials);
