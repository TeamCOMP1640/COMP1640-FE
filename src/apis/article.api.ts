import { API_URL } from "@app/constant/url";
import {
  AcademicCreateInterface,
  AcademicInterface,
} from "@app/interfaces/Academic";
import { ArticleCreateInterface } from "@app/interfaces/Article";
import axios from "axios";

export const getArticles = () => axios.get(API_URL.ARTICLE);

export const createArticle = (params: FormData) =>
  axios.post(`${API_URL.ARTICLE}/create`, params);

export const deleteArticle = (id: string) =>
  axios.delete(`${API_URL.ARTICLE}/delete/${id}`);

export const getArticle = (id: string) => axios.get(`${API_URL.ARTICLE}/${id}`);

export const updateArticle = (id: string, params: ArticleCreateInterface) =>
  axios.patch(`${API_URL.ARTICLE}/update/${id}`, params);
