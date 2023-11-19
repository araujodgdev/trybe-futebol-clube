import MatchModel from '../models/MatchModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatch from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(private model = new MatchModel()) {}

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
}
