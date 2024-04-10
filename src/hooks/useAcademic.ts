import {
  createAcademic,
  deleteAcademic,
  getAcademic,
  getAcademics,
  updateAcademic,
} from "@app/apis/academic.api";
import { createAccount, getAccounts } from "@app/apis/account.api";
import { QUERY_KEY } from "@app/constant/query-key";
import {
  notificationError,
  notificationSuccess,
} from "@app/helpers/notification";
import {
  AcademicCreateInterface,
  AcademicInterface,
} from "@app/interfaces/Academic";
import { AccountCreate } from "@app/interfaces/Account";
import { GetListParams } from "@app/interfaces/common.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAcademics = () => {
  return useQuery({
    queryKey: [QUERY_KEY.ACADEMIC],
    queryFn: async () => {
      const { data } = await getAcademics();
      return data;
    },
  });
};

export const useCreateAcademic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: AcademicCreateInterface) => {
      const response = await createAcademic(params);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ACADEMIC],
      });
      if (data !== null) {
        notificationSuccess("Create Academic Year Successcully");
      }
    },
  });
};

export const useUpdateAcademic = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: AcademicCreateInterface) => {
      const response = await updateAcademic(id, params);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ACADEMIC],
      });
      if (data !== null) {
        notificationSuccess("Update Academic Year Successcully");
      }
    },
  });
};

export const useDeleteAcademic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string }) => {
      const response = await deleteAcademic(params.id);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ACADEMIC],
      });
      notificationSuccess(data.message);
    },
    onError: (data) => {
      notificationError(data.message);
    },
  });
};

export const useGetAcademic = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.ACADEMIC, id],
    queryFn: async () => {
      const { data } = await getAcademic(id);
      return data.data;
    },
  });
};
