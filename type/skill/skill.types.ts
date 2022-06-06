export interface ISkills {
  id: string | null;
  skillName: string;
}

export interface ISkillDistributionValue {
  field: string;
  quantity: number;
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
