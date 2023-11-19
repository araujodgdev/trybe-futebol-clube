import IMatchModel, { Result } from '../Interfaces/matches/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch from '../Interfaces/matches/IMatch';

export default class MatchModel implements IMatchModel {
  constructor(private model = SequelizeMatch) {}

  public async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }

  public async findInProgress(filter: { inProgress?: boolean }): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      where: filter,
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }

  public async finishMatch(matchId: IMatch['id']): Promise<number[]> {
    const dbData = await this.model.update({ inProgress: false }, { where: { id: matchId } });

    return dbData;
  }

  public async update(id: number, data: Partial<Result>): Promise<number[]> {
    const result = await this.model.update(data, { where: { id } });

    return result;
  }

  public async create(data: Omit<IMatch, 'id'>): Promise<IMatch> {
    const dbData = await this.model.create({ ...data, inProgress: true });

    return dbData;
  }
}
