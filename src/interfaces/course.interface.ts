import { GetListParams } from "./common.interface";

export interface CourseListParam extends GetListParams {
  name?: string | null;
  status?: string | null;
}

