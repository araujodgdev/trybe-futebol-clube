import MatchModel from '../models/MatchModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatch from '../Interfaces/matches/IMatch';
import { Result } from '../Interfaces/matches/IMatchModel';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  constructor(private model = new MatchModel(), private teamModel = new TeamModel()) {}

  public async findAll(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.model.findAll();

    return {
      status: 'SUCCESSFUL',
      data: matches,
    };
  }

  public async findFilteredMatches(
    filter: { inProgress?: boolean },
  ): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.model.findInProgress(filter);

    return {
      status: 'SUCCESSFUL',
      data: matches,
    };
  }

  public async finishMatch(matchId: IMatch['id']): Promise<ServiceResponse<ServiceMessage>> {
    const [affectedRows] = await this.model.finishMatch(matchId);

    if (affectedRows === 0) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'No match finished' },
      };
    }

    return {
      status: 'SUCCESSFUL',
      data: { message: 'Finished' },
    };
  }

  public async updateResult(
    matchId: IMatch['id'],
    data: Partial<Result>,
  ): Promise<ServiceResponse<ServiceMessage>> {
    const [affectedRows] = await this.model.update(matchId, data);

    if (affectedRows === 0) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'No match updated' },
      };
    }

    return {
      status: 'SUCCESSFUL',
      data: { message: 'Updated' },
    };
  }

  public async create(data: Omit<IMatch, 'id'>): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = data;
    if (homeTeamId === awayTeamId) {
      return {
        status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const homeTeam = await this.teamModel.findById(homeTeamId);
    const awayTeam = await this.teamModel.findById(awayTeamId);
    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const match = await this.model.create({ ...data, inProgress: true });

    return {
      status: 'CREATED',
      data: match,
    };
  }
}
