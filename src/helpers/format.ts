import { StatusCourseEnum } from "@app/constant";
import { DATE_FORMAT } from "@app/constant/date-time";
import dayjs from "dayjs";

export const toDateString = (date: Date) => dayjs(date).format(DATE_FORMAT);
// export const formatDate(dateString) {
//   return moment(dateString).format("DD/MM/YYYY");
// }
export const timeToStatus = (start: Date, end: Date) => {
  const now = new Date();

  const statusMap: { [key in StatusCourseEnum]: () => boolean } = {
    [StatusCourseEnum.NOT_STARTED]: () => now < new Date(start),
    [StatusCourseEnum.IN_PROGRESS]: () =>
      now >= new Date(start) && now <= new Date(end),
    [StatusCourseEnum.COMPLETED]: () => now > end,
  };

  for (const status in statusMap) {
    if (statusMap[status as StatusCourseEnum]()) {
      return status;
    }
  }

  return StatusCourseEnum.COMPLETED;
};
