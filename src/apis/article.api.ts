import { API_URL } from "@app/constant/url";
import { ArticleCreateInterface } from "@app/interfaces/Article";
import axios from "axios";

export const getArticles = () => axios.get(API_URL.ARTICLE);

export const getArticlesById = (id: string) =>
  axios.get(`${API_URL.ARTICLE}/magazine/${id}`);

export const getArticlesPublication = () =>
  axios.get(`${API_URL.ARTICLE}/publication`);

export const publishArticle = (id: string) =>
  axios.put(`${API_URL.ARTICLE}/publication/${id}`);

export const getStudentArticles = (id: string, magazineId: string) =>
  axios.get(`${API_URL.ARTICLE}/student/${id}?magazine_id=${magazineId}`);

export const downloadArticles = (filename: string) =>
  axios.get(`${API_URL.ARTICLE}/uploads/${filename}`);

export const createArticle = (params: FormData) =>
  axios.post(`${API_URL.ARTICLE}/create`, params);

export const deleteArticle = (id: string) =>
  axios.delete(`${API_URL.ARTICLE}/delete/${id}`);

export const getArticle = (id: string) => axios.get(`${API_URL.ARTICLE}/${id}`);

export const updateArticle = (id: string, params: ArticleCreateInterface) =>
  axios.patch(`${API_URL.ARTICLE}/update/${id}`, params);
