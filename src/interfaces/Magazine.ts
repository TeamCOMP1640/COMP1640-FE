import { FacultyInterface } from "./Faculty";

export interface MagazineInterface {
  id: string;
  name: string;
  description: string;
  closure_date: Date;
  faculty: FacultyInterface;
}

export interface MagazineCreateInterface {
  name: string;
  description: string;
  closure_date: Date;
  faculty_id: number;
}
