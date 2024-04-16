import { AccountsInterface } from "./Account";

export interface FacultyInterface {
  id: string;
  name: string;
  enrolment_key: string;
  users: AccountsInterface[];
}

export interface FacultyCreateInterface {
  name: string;
  enrolment_key: string;
}

export interface AssignStudentParams {
  userId: number;
  enrolment_key: string;
}
