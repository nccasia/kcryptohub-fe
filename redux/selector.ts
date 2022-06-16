import { RootState } from "./store";

export const getUserInfoSelector = (state: RootState) => state.ProfileReducer.userInfo;

export const getSkillsSelector = (state: RootState) => state.SkillReducer.value;

export const getMemberSelector = (state: RootState) => state.MemberReducer.member;