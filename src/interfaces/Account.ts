export interface AccountsInterface {
  id: string;
  name: string;
  email: string;
  course: string[];
  score: string;
}


export interface AddScoreInterface{
  accountId: string;
  score: number;
}
