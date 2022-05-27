export interface IProfile {
  description: string;
  username: string;
  avatarPath: string;
  createdAt: string;
  emailAddress: string;
  googleAddress: string;
  githubAddress: string;
  link: string;
  id: number;
  provider: string;
  status: string;
  skills: number[];
  company: string;
  location: string;
  industry: string;
  headline: string;
}

export interface ISkills {
  id: number;
  skillName: string;
}
