import { Router, Request, Response } from 'express';
import AuthenticationRouter from './auth/index';
import APIRouter from './api/index';
import {LoginRequired} from '../middleware/authentication';

const router: Router = Router();

router.use('/auth', AuthenticationRouter);
router.use('/api', APIRouter);

router.get('/', LoginRequired, (req: Request, res: Response) => {
    console.log(req.user);
    res.json(req.user)
});

export default router;