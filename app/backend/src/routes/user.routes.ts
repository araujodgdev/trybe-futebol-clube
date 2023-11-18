import { Request, Response, Router } from 'express';
import LoginValidation from '../middlewares/LoginValidation';
import UserController from '../controllers/UserController';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  LoginValidation.login,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  LoginValidation.signedUp,
  (req: Request, res: Response) => userController.findRole(req, res, res.locals.user.id),
);

export default router;
