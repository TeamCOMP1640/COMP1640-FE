import {
  getCourse,
  getCourseNoPaginate,
  getCourses,
  getMemberByCourse,
  syncCourseData,
  uploadTimeline,
} from "@app/apis/course.api";
import { QUERY_KEY } from "@app/constant/query-key";
import { notificationSuccess } from "@app/helpers/notification";
import {
  CourseDetailInterface,
  CourseInterface,
  CoursesInterface,
} from "@app/interfaces/Course";
import { CourseListParam } from "@app/interfaces/course.interface";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useGetCourses = (
  params: CourseListParam
): UseQueryResult<CoursesInterface> => {
  return useQuery<CoursesInterface>({
    queryKey: [QUERY_KEY.COURSE, params.page, params.take],
    queryFn: async (): Promise<CoursesInterface> => {
      const { data } = await getCourses({
        name: params.name,
        status: params.status,
        size: params.take,
        page: params.page,
      });
      return data;
    },
  });
};

export const useGetCourse = (
  id: string
): UseQueryResult<CourseDetailInterface> => {
  return useQuery<CourseDetailInterface>({
    queryKey: [QUERY_KEY.COURSE, id],
    queryFn: async (): Promise<CourseDetailInterface> => {
      const { data } = await getCourse(id);
      return data.data;
    },
  });
};

export const useGetCourseMembers = (
  id: string,
  params: { role: string; search: string }
) => {
  return useQuery({
    queryKey: [QUERY_KEY.COURSE_MEMBERS, id, params.role, params.search],
    queryFn: async () => {
      const { data } = await getMemberByCourse(id, params);
      return data.data;
    },
  });
};

export const useUploadTimeline = () => {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  return useMutation({
    mutationFn: async (params: { id: string; file: FormData }) => {
      const response = await uploadTimeline(params.id, params.file);

      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.COURSE] });
      notificationSuccess(i18n.t(`MESSAGE.${data.data.message}`));
    },
  });
};

export const useGetCourseNoPaginate = (): UseQueryResult<
  CourseInterface[],
  Error
> => {
  return useQuery({
    queryKey: [QUERY_KEY.COURSE_NO_PAGINATE],
    queryFn: async (): Promise<CourseInterface[]> => {
      const { data } = await getCourseNoPaginate();
      return data.data;
    },
  });
};

export const useSyncCourseData = () => {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await syncCourseData(id);
      return data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.COURSE] });
      notificationSuccess(i18n.t(data.message));
    },
  });
};
