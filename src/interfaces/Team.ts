import { MenteeInTeam, MentorInTeam } from ".";

export interface TeamResponse {
  id: string;
  name: string;
  capabilities: {
    role: string;
    account_id: string;
    grade: number;
    id: string;
    avatar: string;
    name: string;
  }[];
}
export interface TeamInterface {
  id: string;
  name: string;
  mentors: MentorInTeam[];
  mentees: MenteeInTeam[];
}
