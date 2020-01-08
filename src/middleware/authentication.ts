import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    if ('user' in req) {
        return next();
    }

    res.redirect('/');
};