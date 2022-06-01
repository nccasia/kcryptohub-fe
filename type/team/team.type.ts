import { IProfile } from "../profile/profile.type";

export type Team = {
  id: number;
  teamName: string;
  teamSize: string;
  timeZone: string;
  slogan?: string;
  organization?: string;
  skill: number[];
  workingTime: string;
  hour?: string;
  week?: string;
  description: string;
  avatar: string;
  user?: IProfile;
  userId?: number;
  status: boolean;
  projectSize: string;
};
