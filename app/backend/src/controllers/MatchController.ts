import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService: MatchService = new MatchService()) {}

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.matchService.findAll();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
