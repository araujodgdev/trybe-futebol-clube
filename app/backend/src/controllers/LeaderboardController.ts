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
    const { status, data } = await this.leaderboardService.getSortedLeaderboard('homeTeamId');
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getLeaderboardAway(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { status, data } = await this.leaderboardService.getSortedLeaderboard('awayTeamId');
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
