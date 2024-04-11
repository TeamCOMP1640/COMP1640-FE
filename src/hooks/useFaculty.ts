import {
  createFaculty,
  getFaculties,
  updateFaculty,
  getFaculty,
  deleteFaculty,
} from "@app/apis/faculty.api";
import { QUERY_KEY } from "@app/constant/query-key";
import {
  notificationError,
  notificationSuccess,
} from "@app/helpers/notification";
import { FacultyCreateInterface } from "@app/interfaces/Faculty";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetFaculties = () => {
  return useQuery({
    queryKey: [QUERY_KEY.FACULTY],
    queryFn: async () => {
      const { data } = await getFaculties();
      return data;
    },
  });
};

export const useCreateFaculty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: FacultyCreateInterface) => {
      const response = await createFaculty(params);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FACULTY],
      });
      if (data !== null) {
        notificationSuccess("Create Faculty Successcully");
      }
    },
  });
};

export const useUpdateFalculty = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: FacultyCreateInterface) => {
      const response = await updateFaculty(id, params);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FACULTY],
      });
      if (data !== null) {
        notificationSuccess("Update Faculty Successcully");
      }
    },
  });
};

export const useDeleteFaculty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string }) => {
      const response = await deleteFaculty(params.id);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FACULTY],
      });
      notificationSuccess(data.message);
    },
    onError: (data) => {
      notificationError(data.message);
    },
  });
};

export const useGetFaculty = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.FACULTY, id],
    queryFn: async () => {
      const { data } = await getFaculty(id);
      return data.data;
    },
  });
};
