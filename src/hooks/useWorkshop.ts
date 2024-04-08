import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import {
  deleteWorkshop,
  getListWorkshop,
  getWorkshopDashboard,
  getWorkshopDetail,
  pathCompletedFeedback,
  postWorkshop,
  postWorkshopById,
} from "@app/apis/workshop.api";
import { QUERY_KEY } from "@app/constant/query-key";
import {
  notificationError,
  notificationSuccess,
} from "@app/helpers/notification";
import {
  CreateWorkshop,
  ListWorkshopsInterface,
  UpdateWorkshop,
  WorkshopDetailInterface,
  WorkshopListParam,
} from "@app/interfaces/workshop.interface";

export const useGetWorkshops = (
  params: WorkshopListParam
): UseQueryResult<ListWorkshopsInterface> => {
  return useQuery<ListWorkshopsInterface>({
    queryKey: [QUERY_KEY.WORKSHOPS, params.page, params.take],
    queryFn: async (): Promise<ListWorkshopsInterface> => {
      const { data } = await getListWorkshop({
        name: params.name,
        status: params.status,
        speaker: params.speaker,
        size: params.take,
        page: params.page,
      });
      return data;
    },
  });
};

export const useGetWorkshop = (
  id: string
): UseQueryResult<WorkshopDetailInterface> => {
  return useQuery<WorkshopDetailInterface>({
    queryKey: [QUERY_KEY.WORKSHOPS, id],
    queryFn: async (): Promise<WorkshopDetailInterface> => {
      const { data } = await getWorkshopDetail(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCompletedFeedback = () => {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  return useMutation({
    mutationFn: async (params: { id: string }) => {
      const response = await pathCompletedFeedback(params.id);

      return response;
    },
    onSuccess: (data) => {
      if (data.data.code == 200) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.WORKSHOPS, data.data.data.id],
        });
        notificationSuccess(i18n.t(`MESSAGE.${data.data.message}`));
      } else {
        notificationError(i18n.t(`MESSAGE.${data.data.message}`));
      }
    },
  });
};

export const useDeleteWorkshop = () => {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  return useMutation({
    mutationFn: async (params: { id: string }) => {
      const response = await deleteWorkshop(params.id);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.WORKSHOPS],
      });
      notificationSuccess(i18n.t(`MESSAGE.${data.message}`));
    },
    onError: (data) => {
      notificationError(i18n.t(`MESSAGE.${data.message}`));
    },
  });
};

export const useCreateWorkshop = () => {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  return useMutation({
    mutationFn: async (params: CreateWorkshop) => {
      const response = await postWorkshop(params);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.WORKSHOPS],
      });
      if (data.code == 200) {
        notificationSuccess(i18n.t(`MESSAGE.${data.message}`));
      } else {
        notificationError(i18n.t(`MESSAGE.${data.message}`));
      }
    },
  });
};

export const useGetWsDashboard = (
  date: string
): UseQueryResult<WorkshopDetailInterface[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEY.LEADERBOARD, date],
    queryFn: async (): Promise<WorkshopDetailInterface[]> => {
      const { data } = await getWorkshopDashboard(date);
      return data.data;
    },
  });
};

export const useUpdateWorkshop = (id: string) => {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  return useMutation({
    mutationFn: async (params: UpdateWorkshop) => {
      const response = await postWorkshopById(params, id);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.WORKSHOPS],
      });
      notificationSuccess(i18n.t(`MESSAGE.${data.message}`));
    },
    onError: (data) => {
      notificationError(i18n.t(`MESSAGE.${data.message}`));
    },
  });
};
