export interface IFormLogin {
  usernameOrEmail: string;
  password: string;
}

export enum ELoginProvider {
  GITHUB,
  GOOGLE,
}

export interface IFormLoginGithub {
  email: string | null | undefined;
  accessToken: string;
}

export interface IFormLoginGoogle {
  name: string | null | undefined;
  email: string | null | undefined;
  accessToken: string | undefined;
  provider: string;
}
