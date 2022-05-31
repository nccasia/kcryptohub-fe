import { IProfile } from "../profile/profile.type";

export type Team = {
  id: number;
  teamName: string;
  teamSize: string;
  timeZone: string;
  organization?: string;
  skill: string[];
  workingTime: string;
  hour?: string;
  week?: string;
  description: string;
  avatar: string;
  avatarUrl: string;
  user?: IProfile;
  userId?: number;
};
