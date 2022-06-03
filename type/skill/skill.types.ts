export interface ISkill {
  id: string | null;
  skillName: string;
}

export interface ISkillDistributionValue {
  field: string;
  quantity: string;
}

export interface ISkillDistribution {
  id: string | null;
  skillDistributionName: string;
  skillDistributionValue: ISkillDistributionValue[];
}

export interface IReponseSkill<T> {
  content: T;
  pagable: { total: number; page: number; size: number };
}
