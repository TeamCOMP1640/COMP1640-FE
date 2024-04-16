import { FacultyInterface } from "./Faculty";

export interface AccountsInterface {
  id: string;
  fullname: string;
  email: string;
  role: string;
  phone: string;
  username: string;
  password: string;
  faculties: FacultyInterface[];
}

export interface AccountCreate {
  fullname: string;
  email: string;
  role: string;
  phone: string;
  username: string;
}

export interface AddScoreInterface {
  accountId: string;
  score: number;
}
