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
  skills: string[];
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
