import {
  createAccount,
  deleteAccount,
  getAccount,
  getAccounts,
  getAccountsNoPaginate,
  postAddScore,
  updateAccount,
} from "@app/apis/account.api";
import { QUERY_KEY } from "@app/constant/query-key";
import {
  notificationError,
  notificationSuccess,
} from "@app/helpers/notification";
import { AccountCreate, AddScoreInterface } from "@app/interfaces/Account";
import { GetListParams } from "@app/interfaces/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useGetAccounts = (
  params: GetListParams & { role: string; facultyId?: number }
) => {
  return useQuery({
    queryKey: [
      QUERY_KEY.ACCOUNT,
      params.pageNumber,
      params.pageSize,
      params.role,
      params.facultyId,
    ],
    queryFn: async () => {
      const { data } = await getAccounts(params);
      return data;
    },
  });
};

export const useGetAccountsNoPaginate = () => {
  return useQuery({
    queryKey: [QUERY_KEY.ACCOUNT_NO_PAGINATE],
    queryFn: async () => {
      const { data } = await getAccountsNoPaginate();
      return data;
    },
  });
};

export const useGetAccount = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.ACCOUNT, id],
    queryFn: async () => {
      const { data } = await getAccount(id);
      return data.data;
    },
  });
};

export const useAddScore = () => {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  return useMutation({
    mutationFn: async (params: AddScoreInterface) => {
      const response = await postAddScore(params);

      return response.data;
    },
    onSuccess: (data) => {
      if (data.code == 200) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.ACCOUNT, data.data.account.id],
        });
        notificationSuccess(i18n.t(`MESSAGE.${data.message}`));
      } else {
        notificationError(i18n.t(`MESSAGE.${data.message}`));
      }
    },
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: AccountCreate) => {
      const response = await createAccount(params);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ACCOUNT, 1, 100],
      });
      if (data !== null) {
        notificationSuccess("Create Account Successcully");
      }
    },
  });
};

export const useUpdateAccount = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: AccountCreate) => {
      const response = await updateAccount(id, params);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ACCOUNT, 1, 100],
      });
      if (data !== null) {
        notificationSuccess(data.message);
      }
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  // const { i18n } = useTranslation();
  return useMutation({
    mutationFn: async (params: { id: string }) => {
      const response = await deleteAccount(params.id);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ACCOUNT, 1, 100],
      });
      notificationSuccess(data.message);
    },
    onError: (data) => {
      notificationError(data.message);
    },
  });
};
