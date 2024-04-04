// import { bronze, gold, silver } from "@app/assets/images";
// import { StatusCourseEnum } from "@app/constant";
// import { CourseInterface } from "@app/interfaces/Course";
// import { ILeaderBoard } from "@app/interfaces/dashboard.interface";

// export const getImageRank = (rank: number): string | number => {
//   switch (rank) {
//     case 1:
//       return gold;
//     case 2:
//       return silver;
//     case 3:
//       return bronze;
//     default:
//       return rank;
//   }
// };

// export const getRank = (
//   dataList: ILeaderBoard[],
//   index: number
// ): ILeaderBoard[] => {
//   if (index >= 1) {
//     if (dataList[index].score === dataList[index - 1].score) {
//       dataList[index].rank = dataList[index - 1].rank;
//     } else {
//       dataList[index].rank = dataList[index - 1].rank + 1;
//     }
//   } else {
//     dataList[index].rank = 1;
//   }
//   return dataList;
// };

// export const getRandomCourse = (courses: CourseInterface[]) => {
//   const courseInprogress = courses.filter(
//     (course: CourseInterface) => course.status === StatusCourseEnum.IN_PROGRESS
//   );
//   const randomIndex = Math.floor(Math.random() * courseInprogress.length);

//   return courseInprogress[randomIndex];
// };
