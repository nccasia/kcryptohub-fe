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
}

export interface ISkills {
  id: number | null;
  skillName: string;
}
