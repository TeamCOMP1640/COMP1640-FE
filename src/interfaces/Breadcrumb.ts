export interface IBreadcrumbItem {
  key: string;
  route?: string;
  name?: string;
}

export enum BREADCRUMBS_ENUM {
  DASHBOARD = "dashboard",
  COURSES = "Courses",
  COURSE_DETAIL = "detail_course",
  COURSE_CREATE = "course_create",
  ACCOUNTS = "accounts",
  ACCOUNT_DETAIL = "account_detail",
  GIFTS = "gifts",
  WORKSHOPS = "workshops",
  WORKSHOP_DETAIL = "workshop_detail",
  FACULTY = "Faculty",
}
