import IMatch from './IMatch';

export type Result = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

export default interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  finishMatch(matchId: IMatch['id']): Promise<number[]>;
  update(id: IMatch['id'], data: Partial<Result>): Promise<number[]>;
  create(data: Omit<IMatch, 'id'>): Promise<IMatch>;
}
