import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchController';
import LoginValidation from '../middlewares/LoginValidation';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) =>
  matchController.getAllMatches(req, res));

router.patch(
  '/:id',
  LoginValidation.signedUp,
  (req: Request, res: Response) => matchController.updateResult(req, res),
);

router.patch(
  '/:id/finish',
  LoginValidation.signedUp,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

router.post(
  '/',
  LoginValidation.signedUp,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default router;
