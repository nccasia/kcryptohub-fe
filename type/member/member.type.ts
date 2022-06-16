import { IProfile } from "../profile/profile.type";

export interface IMember {
  id: number;
  emailAddress: string;
  inviteStatus: MemberInviteStatus.PENDING | MemberInviteStatus;
  role: MemberRole.MEMBER | MemberRole;
  createAt: string;
  updateAt: string;
  teamId: number;
  userId: IProfile | null
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

export interface IMemberAddRequest {
  teamId: number;
  member: IMember[];
}