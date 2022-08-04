import { RootState } from "./store";

export const getUserInfoSelector = (state: RootState) => state.ProfileReducer.userInfo;

export const getSkillsSelector = (state: RootState) => state.SkillReducer.value;

export const getSkillsIsLoadedSelector = (state: RootState) => state.SkillReducer.isLoaded;

export const getDashboardInformationSelector = (state: RootState) => state.DashboardReducer.team;

export const getDashboardSkillDistributionSelector = (state: RootState) => state.DashboardReducer.team.skillDistribution;

export const getDashboardPortfolioSelector = (state: RootState) => state.DashboardReducer.team.portfolios;

export const getDashboardAwardsSelector = (state: RootState) => state.DashboardReducer.team.awards;

export const getDataSkillDisSelector = (state: RootState) => state.SkillDistributionReducer;