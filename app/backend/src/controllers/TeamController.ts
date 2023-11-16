import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService: TeamService = new TeamService()) {}

  public async getAllTeams(req: Request, res: Response): Promise<Response> {
    const teams = await this.teamService.getAllTeams();
    return res.status(200).json(teams);
  }
}
