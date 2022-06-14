import { Skill } from "../Skill";

export interface ICreateTeam {
  teamName: string;
  teamSize: number;
  timeZone: string;
  projectSize: string;
  linkWebsite: string;
  workingTime: string;
  saleEmail: string;
  avatar: string;
  founded: string;
  description: string;
  slogan: string;
  skills: Skill[];
  id: string;
}

export enum ETimeZone {
  "UTC -12",
  "UTC -11",
  "UTC -10",
  "UTC -9",
  "UTC -8",
  "UTC -7",
  "UTC -6",
  "UTC -5",
  "UTC -4",
  "UTC -3",
  "UTC -2",
  "UTC -1",
  "UTC +-0",
  "UTC +1",
  "UTC +2",
  "UTC +3",
  "UTC +4",
  "UTC +5",
  "UTC +6",
  "UTC +7",
  "UTC +8",
  "UTC +9",
  "UTC +10",
  "UTC +11",
  "UTC +12",
}

export enum ETeamSize {
  "Freelancer",
  "2-9",
  "10-49",
  "50-249",
  "250-999",
  "1,000-9,999",
  "10,000+",
}

export enum EProjectSize {
  "N/A",
  "$1,000+",
  "$5,000+",
  "$10,000+",
  "$25,000+",
  "$50,000+",
  "$75,000+",
  "$100,000+",
  "$250,000+",
}
