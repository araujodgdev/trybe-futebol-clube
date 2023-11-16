import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService: TeamService = new TeamService()) {}

  public async getAllTeams(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.teamService.getAllTeams();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getTeamById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.teamService.getTeamById(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
