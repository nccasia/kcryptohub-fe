import { IProfile } from "../profile/profile.type";

export interface IMember {
  id: number;
  emailAddress: string;
  inviteStatus: string;
  role: string;
  createAt: string;
  updateAt: string;
  teamId: number;
  userId: IProfile | null
}

export interface IMemberResponse {
  content: IMember[];
}

export enum MemberInviteStatus {
  PENDING = 'pending',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
}
export enum MemberRole {
  LEADER = 'leader',
  MEMBER = 'member'
}