import { IProfile } from "../profile/profile.type";

export interface IMember {
  id: number;
  emailAddress: string;
  inviteStatus: string;
  role: string;
  createAt: string;
  updateAt: string;
  user: IProfile | null
}

export interface IMemberAddRequest {
  teamId: number;
  members: emails[];
}
export interface emails {
  email: string,
  role: string
}

export interface IRemoveMember {
  teamId: number;
  memberId: number;
}