import { AccountsInterface } from "./Account";
import { MagazineInterface } from "./Magazine";

export interface ArticleInterface {
  id: string;
  title: string;
  description: string;
  status: string;
  submitted_date: Date;
  magazine: MagazineInterface;
  users: AccountsInterface[];
}

export interface ArticleCreateInterface {
  id: string;
  title: string;
  description: string;
  status: string;
  submitted_date: Date;
  // magazine: MagazineInterface;
  // users: AccountsInterface[];
}
