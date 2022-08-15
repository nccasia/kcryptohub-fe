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

export interface IGetMemberList {
  teamId: number;
  page?: number;
  size?: number;
  sort?: string;
}

export interface IMemberPageAble {
  total: number;
  page: number;
  size: number;
}

export interface IMemberContact {
  id: number;
  teamId: number;
  userId: number;
  username: string;
  emailAddress: string;
  verified: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IAddToMemberList {
  teamId: number;
  userId: number;
}