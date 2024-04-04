import { GetListParams } from "./common.interface";

export interface WorkshopListParam extends GetListParams {
  name?: string | null;
  speaker?: string | null;
  status?: string | null;
}

export interface WorkshopInterface {
  id: string;
  title: string;
  speaker: string;
  status: string;
  date: string;
  scores: number;
}

export interface ListWorkshopsInterface {
  data: WorkshopInterface[];
  code: string;
  message: number;
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
  };
}

export interface WorkshopDetailInterface {
  id: string;
  title: string;
  speaker: {
    id: string;
    name: string;
  };
  status: string;
  date: Date;
  score: number;
  completed_feedback: boolean;
  description: string;
  courses: [
    {
      id: string;
      name: string;
    }
  ];
  feedback: [
    {
      id: string;
      scores: number;
      reviewer: string;
      content: string;
    }
  ];
}

export interface FeedbackInterface {
  id: string;
  scores: number;
  reviewer: string;
  content: string;
}

export interface CreateWorkshop {
  name: string;
  courses: string[];
  description: string;
  date: string;
  speaker: string;
}

export interface UpdateWorkshop {
  name: string;
  courses: string[];
  description: string;
  status: string;
  date: string;
  speaker: string;
}
