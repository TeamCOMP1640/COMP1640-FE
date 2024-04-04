export interface CourseInterface {
  id: string;
  name: string;
  status: string;
  type: string;
  start_date: Date;
  end_date: Date;
  image_url: string;
}
export interface CourseListInterface {
  id: string;
  course: CourseInterface;
  mentorCount: number;
  menteeCount: number;
}

export interface CourseDetailInterface {
  course: CourseInterface;
  mentorCount: number;
  menteeCount: number;
}

export interface CoursesInterface {
  data: CourseListInterface[];
  code: string;
  status: number;
  meta: {
    page: number;
    itemCount: number;
    take: number;
    pageCount: number;
  };
}
