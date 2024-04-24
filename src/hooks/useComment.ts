import {
  checkExistComment,
  createComment,
  deleteComment,
  getComment,
  getComments,
  updateComment,
} from "@app/apis/comment.api";
import { QUERY_KEY } from "@app/constant/query-key";
import {
  notificationError,
  notificationSuccess,
} from "@app/helpers/notification";
import { CommentCreateInterface } from "@app/interfaces/Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetComments = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.COMMENT],
    queryFn: async () => {
      const { data } = await getComments(id);
      return data;
    },
  });
};

export const useCheckExistComment = (id: string, userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.COMMENT],
    queryFn: async () => {
      const { data } = await checkExistComment(id, userId);
      return data;
    },
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: CommentCreateInterface) => {
      const response = await createComment(params);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.COMMENT],
      });
      if (data !== null) {
        notificationSuccess("Create Comment Successcully");
      }
    },
  });
};

export const useUpdateComment = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: CommentCreateInterface) => {
      const response = await updateComment(id, params);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.COMMENT],
      });
      if (data !== null) {
        notificationSuccess("Update Comment Successcully");
      }
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string }) => {
      const response = await deleteComment(params.id);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.COMMENT],
      });
      notificationSuccess(data.message);
    },
    onError: (data) => {
      notificationError(data.message);
    },
  });
};

export const useGetComment = (id: string, userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.COMMENT, id],
    queryFn: async () => {
      const { data } = await getComment(id, userId);
      return data.data;
    },
  });
};
