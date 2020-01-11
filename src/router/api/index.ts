import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { defaultJWTSecret } from '../../config/config';
import Passport from '../../config/passport';
import { jwtMiddleware } from '../../middleware/authentication';

const router = Router();

router.route('/').get((req: Request, res: Response) => {
    res.sendStatus(200);
});

router.route('/auth').get(jwtMiddleware, (req: Request, res: Response) => {
    res.sendStatus(200);
});

router.route('/auth/login')
    .get((req: Request, res: Response) => {
        res.json(req.user);
    }).post(Passport.authenticate('local'), (req: Request, res: Response) => {
        let privateKey: string = process.env.JWT_SECRET || defaultJWTSecret;
        
        let token = jwt.sign(
            {id: req.user!['id']}, privateKey, {algorithm: 'HS256', expiresIn: '1d'});
        
        res.status(200).send(token);
    });

export default router;