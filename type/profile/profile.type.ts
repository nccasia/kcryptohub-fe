export interface IProfile {
  description: string;
  username: string;
  avatarPath: string;
  createdAt: string;
  emailAddress: string;
  googleAddress: string;
  githubAddress: string;
  profileLink: string;
  id: number;
  provider: string;
  status: string;
  skills: number[] | ISkills[];
  company: string;
  industry: string;
  headline: string;
}

export interface ISkills {
  id: number;
  skillName: string;
}
