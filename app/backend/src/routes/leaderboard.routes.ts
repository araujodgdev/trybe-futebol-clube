import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();
const leaderboardController = new LeaderboardController();

router.get('/home', (req: Request, res: Response) =>
  leaderboardController.getLeaderboardHome(req, res));

router.get('/away', (req: Request, res: Response) =>
  leaderboardController.getLeaderboardAway(req, res));

export default router;
