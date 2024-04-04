import axios from "axios";

import { API_URL } from "@app/constant/url";
import { CourseListParam } from "@app/interfaces/course.interface";

export const getCourses = (params: CourseListParam) =>
  axios.get(API_URL.COURSE, { params });

export const getCourse = (id: string) => axios.get(`${API_URL.COURSE}/${id}`);

export const getMemberByCourse = (
  id: string,
  params: { role: string; search: string }
) => axios.get(`${API_URL.COURSE}/${id}/team-members`, { params });

export const uploadTimeline = (id: string, file: FormData) =>
  axios.post(`${API_URL.COURSE}/upload?id=${id}`, file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getCourseNoPaginate = () => axios.get(API_URL.COURSE_NO_PAGINATE);

export const syncCourseData = (id: string) =>
  axios.get(`${API_URL.SYNC_COURSE}/${id}`);
