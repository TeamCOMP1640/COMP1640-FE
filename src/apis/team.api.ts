import axios from "axios";

import { API_URL } from "@app/constant/url";

export const getTeamByCourse = (id: string, params: { search: string }) =>
  axios.get(`${API_URL.TEAMS}/${id}/get-team`, { params });
