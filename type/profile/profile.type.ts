import { ICreateTeam } from "../createTeam/createTeam.type";
import { ISkills } from "../skill/skill.types";

export interface IProfile {
  username: string;
  avatarPath: string;
  createdAt: string;
  emailAddress: string;
  googleAddress: string;
  githubAddress: string;
  id: number;
  provider: string;
  status: string;
  skills: ISkills[];
  team: ICreateTeam[];
  shortList: number[];
}
