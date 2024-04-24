import { API_URL } from "@app/constant/url";
import {
  CommentCreateInterface,
  CommentInterface,
} from "@app/interfaces/Comment";
import axios from "axios";

export const getComments = (id: string) =>
  axios.get(`${API_URL.COMMENT}?article_id=${id}`);

export const createComment = (params: CommentCreateInterface) =>
  axios.post(`${API_URL.COMMENT}/create`, params);

export const checkExistComment = (id: string, userId: string) =>
  axios.get(`${API_URL.COMMENT}/check/${id}?user_id=${userId}`);

export const deleteComment = (id: string) =>
  axios.delete(`${API_URL.COMMENT}/delete/${id}`);

export const getComment = (id: string, userId: string) =>
  axios.get(`${API_URL.COMMENT}/${id}?user_id=${userId}`);

export const updateComment = (id: string, params: CommentCreateInterface) =>
  axios.patch(`${API_URL.COMMENT}/update/${id}`, params);
