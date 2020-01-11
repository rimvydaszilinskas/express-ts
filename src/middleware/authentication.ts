import { Request, Response, NextFunction } from 'express';

export default function AuthenticationMiddleware (req: Request, res: Response, next: NextFunction)  {
    /**
     * Use with authentication routes.
     * If user is not authenticated it will allow to access the routes, otherwise it will
     * redirect to home page
     */

     if(req.user) {
         return res.redirect('/');
     }

     next();
}

export function LoginRequired(req: Request, res: Response, next: NextFunction) {
    if(req.user === undefined || req.user === null) {
        return res.redirect(`/auth/login/?next=${req.originalUrl}`);
    }

    next();
}
