export interface IFormLogin {
  usernameOrEmail: string;
  password: string;
}

export enum ELoginProvider {
  GITHUB,
  GOOGLE,
}

export interface IFormLoginGithub {
  accessToken: string;
}

export interface IFormLoginGoogle {
  name: string | null | undefined;
  emailAddress: string | null | undefined;
  accessToken: string | undefined;
  provider: string;
}
