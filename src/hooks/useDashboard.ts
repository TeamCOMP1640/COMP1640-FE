import { getLeaderBoard, getStatistic } from "@app/apis/dashboard.api";
import { QUERY_KEY } from "@app/constant/query-key";
import { ILeaderBoard, IStatistic } from "@app/interfaces/dashboard.interface";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const useStatistic = (): UseQueryResult<IStatistic, Error> => {
  return useQuery<IStatistic>({
    queryKey: [QUERY_KEY.STATISTIC],
    queryFn: async (): Promise<IStatistic> => {
      const { data } = await getStatistic();
      return data.data;
    },
  });
};

export const useLeaderBoard = (params: {
  courseId: string;
  role: string;
}): UseQueryResult<ILeaderBoard[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEY.LEADERBOARD, params.courseId, params.role],
    queryFn: async (): Promise<ILeaderBoard[]> => {
      const { data } = await getLeaderBoard(params.courseId, params.role);
      return data.data;
    },
  });
};
