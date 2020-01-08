import { Router, Request, Response } from 'express';

const router = Router();

router.route('/')
    .get((req: Request, res: Response) => {
        res.send('Hello world');
    }).post((req: Request, res: Response) => {
        console.log('Req.body: ', req.body);
        res.sendStatus(200);
    });

export default router;