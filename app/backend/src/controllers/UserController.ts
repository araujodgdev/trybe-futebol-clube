import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userService: UserService = new UserService()) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.userService.login(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async findRole(req: Request, res: Response, id: number): Promise<Response> {
    const { status, data } = await this.userService.findRole(id);
    return res.status(mapStatusHTTP(status)).json({ role: data });
  }
}
