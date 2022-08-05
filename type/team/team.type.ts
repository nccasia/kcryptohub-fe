import { IKeyClients } from "@/src/pages/team/[teamId]/dashboard/portfolio/clients";
import { IProfile } from "../profile/profile.type";
import { ISkill, ISkillDistribution } from "../skill/skill.types";
export type ITeam = {
  createAt: string;
  updateAt: string;
  id: number;
  teamName: string;
  teamSize: string;
  timeZone: string;
  workingTime: string;
  saleEmail: string;
  description: string;
  imageUrl: string;
  slogan: string;
  founded: string;
  linkWebsite: string;
  projectSize: string;
  status: true;
  skills: ISkill[];
  skillDistribution: ISkillDistribution[];
  portfolios: IPortfolio[];
  keyClients?: IKeyClients[];
  awards?: string[];
  userId?: number;
};
export interface ICreateTeam {
  teamName: string;
  teamSize: number;
  timeZone: string;
  projectSize: string;
  linkWebsite: string;
  workingTime: string;
  saleEmail: string;
  imageUrl: string;
  founded: string;
  description: string;
  slogan: string;
  skills: ISkill[];
  portfolios: IPortfolio[];
  keyClients?: IKeyClients[];
  awards?: string[];
  id: string;
}

export interface IPortfolio {
  id: number;
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

export enum EPrivacy {
  "SHOW_ALL" = 1,
  "CONFIDENTAL" = 2,
  "HIDDEN" = 3,
}

export interface IKeyClient {
  keyName: string[];
}

export enum ESection {
  "SUMMARY",
  "SKILL-DISTRIBUTION",
  "PORTFOLIO",
}

export enum IColors {
  "#640071",
  "#6b1187",
  "#73289e",
  "#7e44b4",
  "#8e66ca",
  "#a48ee1",
  "#b0a6ef",
  "#c4bcf7",
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
