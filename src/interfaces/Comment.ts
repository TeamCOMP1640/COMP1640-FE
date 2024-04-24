import { AccountsInterface } from "./Account";
import { ArticleInterface } from "./Article";

export interface CommentInterface {
  id: string;
  detail: string;
  user: AccountsInterface;
  article: ArticleInterface;
}

export interface CommentCreateInterface {
  detail: string;
  user_id: number;
  article_id: number;
}
