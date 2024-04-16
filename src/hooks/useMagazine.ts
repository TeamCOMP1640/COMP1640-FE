import {
  createMagazine,
  deleteMagazine,
  getMagazine,
  getMagazines,
  getStudentMagazines,
  updateMagazine,
} from "@app/apis/magazine.api";
import { QUERY_KEY } from "@app/constant/query-key";
import {
  notificationError,
  notificationSuccess,
} from "@app/helpers/notification";
import { MagazineCreateInterface } from "@app/interfaces/Magazine";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetMagazines = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.MAGAZINE],
    queryFn: async () => {
      const { data } = await getMagazines(id);
      return data;
    },
  });
};

export const useGetStudentMagazines = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.MAGAZINE],
    queryFn: async () => {
      const { data } = await getStudentMagazines(id);
      return data;
    },
  });
};

export const useCreateMagazine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: MagazineCreateInterface) => {
      const response = await createMagazine(params);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MAGAZINE],
      });
      if (data !== null) {
        notificationSuccess("Create Magazine Year Successfully");
      }
    },
  });
};

export const useUpdateMagazine = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: MagazineCreateInterface) => {
      const response = await updateMagazine(id, params);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MAGAZINE],
      });
      if (data !== null) {
        notificationSuccess("Update Magazine  Successfully");
      }
    },
  });
};

export const useDeleteMagazine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string }) => {
      const response = await deleteMagazine(params.id);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MAGAZINE],
      });
      notificationSuccess(data.message);
    },
    onError: (data) => {
      notificationError(data.message);
    },
  });
};

export const useGetMagazine = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.MAGAZINE, id],
    queryFn: async () => {
      const { data } = await getMagazine(id);
      return data.data;
    },
  });
};
