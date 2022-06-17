import { IProfile } from "../profile/profile.type";
import { Skill } from "../Skill";
export type Team = {
  id: number;
  teamName: string;
  teamSize: string;
  timeZone: string;
  slogan?: string;
  organization?: string;
  skills: Skill[];
  workingTime: string;
  hour?: string;
  week?: string;
  description: string;
  avatar: string;
  user?: IProfile;
  userId?: number;
  status: boolean;
  projectSize: string;
  linkWebsite: string;
  founded: string;
};

export enum ESection {
  "SUMMARY",
  "SKILL-DISTRIBUTION",
  "PORTFOLIO",
}

export enum IColors {
  "#1b85ce",
  "#08537e",
  "#267c87",
  "#62ba56",
  "#5d997e",
  "#4ba98b",
  "#3acc60",
  "#6a957d",
}

export interface ISkill {
  id: null | number;
  skillName: string;
}

export interface ISkillDistribution {
  id: null | number;
  skillDistributionName: string;
  skillDistributionValue: {
    field: string;
    quantity: number;
  }[];
}

export interface IPortfolio {
  companyName: string;
  imageUrl?: string | null;
  videoLink?: string | null;
  content?: string;
  clientWebsite?: string;
  title: string;
  category: string;
  estimate: string;
  startDate?: string;
  endDate?: string;
  description: string;
  privacy: number;
}
export interface ITeamProfile {
  createAt: string;
  updateAt: string;
  id: 1;
  teamName: string;
  teamSize: string;
  timeZone: string;
  workingTime: string;
  saleEmail: string;
  description: string;
  avatar: string;
  avatarUrl: string;
  slogan: string;
  founded: string;
  linkWebsite: string;
  projectSize: string;
  status: true;
  skills: ISkill[];
  skillDistribution: ISkillDistribution[];
  portfolio: IPortfolio[];
}


export enum EPrivacy {
  "SHOW_ALL" = 1 ,
  "CONFIDENTAL" = 2,
  "HIDDEN" = 3,
}