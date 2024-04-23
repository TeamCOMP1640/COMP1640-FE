import {
  createArticle,
  deleteArticle,
  downloadArticles,
  getArticle,
  getArticles,
  getArticlesById,
  getArticlesPublication,
  getStudentArticles,
  publishArticle,
  updateArticle,
} from "@app/apis/article.api";
import { QUERY_KEY } from "@app/constant/query-key";
import {
  notificationError,
  notificationSuccess,
} from "@app/helpers/notification";
import { ArticleCreateInterface } from "@app/interfaces/Article";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetArticles = () => {
  return useQuery({
    queryKey: [QUERY_KEY.ARTICLE],
    queryFn: async () => {
      const { data } = await getArticles();
      return data;
    },
  });
};

export const useGetArticlesById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.ARTICLE, id],
    queryFn: async () => {
      const { data } = await getArticlesById(id);
      return data;
    },
  });
};

export const useDownload = (filename: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.ARTICLE],
    queryFn: async () => {
      const { data } = await downloadArticles(filename);
      return data;
    },
  });
};

export const useGetArticlesPublication = () => {
  return useQuery({
    queryKey: [QUERY_KEY.ARTICLE],
    queryFn: async () => {
      const { data } = await getArticlesPublication();
      return data;
    },
  });
};

export const useGetStudentArticles = (id: string, magazineId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.ARTICLE, id],
    queryFn: async () => {
      const { data } = await getStudentArticles(id, magazineId);
      return data;
    },
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: FormData) => {
      const response = await createArticle(params);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ARTICLE],
      });
      if (data !== null) {
        notificationSuccess("Create Article Successcully");
      }
    },
  });
};

export const usePublicationArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await publishArticle(id);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ARTICLE],
      });
      if (data !== null) {
        notificationSuccess("Publish Article Successcully");
      }
    },
  });
};

export const useUpdateArticle = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: ArticleCreateInterface) => {
      const response = await updateArticle(id, params);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ACADEMIC],
      });
      if (data !== null) {
        notificationSuccess("Update Article Year Successcully");
      }
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string }) => {
      const response = await deleteArticle(params.id);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ARTICLE],
      });
      notificationSuccess(data.message);
    },
    onError: (data) => {
      notificationError(data.message);
    },
  });
};

export const useGetArticle = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.ARTICLE, id],
    queryFn: async () => {
      const { data } = await getArticle(id);
      return data.data;
    },
  });
};
