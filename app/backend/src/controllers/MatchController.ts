import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService: MatchService = new MatchService()) {}

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    if (req.query.inProgress) {
      const filter: { inProgress?: boolean } = {};
      if (req.query.inProgress === 'true' || req.query.inProgress === undefined) {
        filter.inProgress = true;
      }
      if (req.query.inProgress === 'false') {
        filter.inProgress = false;
      }
      const { status, data } = await this.matchService
        .findFilteredMatches(filter);
      return res.status(mapStatusHTTP(status)).json(data);
    }
    const { status, data } = await this.matchService.findAll();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
