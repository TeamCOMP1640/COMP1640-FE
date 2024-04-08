import {
  getAccount,
  getAccounts,
  getAccountsNoPaginate,
  postAddScore,
} from "@app/apis/account.api";
import { QUERY_KEY } from "@app/constant/query-key";
import {
  notificationError,
  notificationSuccess,
} from "@app/helpers/notification";
import { AddScoreInterface } from "@app/interfaces/Account";
import { GetListParams } from "@app/interfaces/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useGetAccounts = (params: GetListParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.ACCOUNT, params.pageNumber, params.pageSize],
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
