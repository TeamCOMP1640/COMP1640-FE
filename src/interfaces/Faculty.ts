import { AccountsInterface } from "./Account";

export interface FacultyInterface {
  id: string;
  name: string;
  enrolment_key: Date;
  users: AccountsInterface[];
}

export interface FacultyCreateInterface {
  name: string;
  enrolment_key: Date;
}
