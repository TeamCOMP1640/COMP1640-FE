import { API_URL } from "@app/constant/url";
import axios from "axios";

export const getStatistic = () => axios.get(API_URL.STATISTIC);

export const getLeaderBoard = (courseId: string, role: string) => {
  return axios.get(`${API_URL.COURSE}/${courseId}/leaderboard`, {
    params: {
      role,
      filter: "",
    },
  });
};
