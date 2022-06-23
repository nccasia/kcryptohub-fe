export interface IAwardDetail {
  id?: number;
  awardsTitle: string;
  awardsWebsite: string;
  teamId?: number;
}

export interface IAwardParams {
  award: IAwardDetail;
  handler: Function;
}
