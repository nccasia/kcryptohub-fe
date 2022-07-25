import { ISkill } from "../skill/skill.types";
import { ICreateTeam, ITeam } from "../team/team.type";


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
  skills: ISkill[];
  team: ICreateTeam[];
  shortList: number[];
}
