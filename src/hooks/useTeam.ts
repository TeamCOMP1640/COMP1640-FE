import { getTeamByCourse } from "@app/apis/team.api";
import { QUERY_KEY } from "@app/constant/query-key";
import { useQuery } from "@tanstack/react-query";

export const useGetTeams = (id: string, params: { search: string }) => {
  return useQuery({
    queryKey: [QUERY_KEY.TEAMS, id],
    queryFn: async () => {
      const { data } = await getTeamByCourse(id, params);
      return data.data;
    },
  });
};
