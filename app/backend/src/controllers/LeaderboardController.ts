import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService = new LeaderboardService(),
  ) {}

  public async getLeaderboardHome(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { status, data } = await this.leaderboardService.getSortedLeaderboardHome();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
