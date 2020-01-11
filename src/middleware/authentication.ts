import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { defaultJWTSecret } from '../config/config';
import { User } from '../models';

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

interface O extends Object {
    id?: number;
}

export const jwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.headers.authorization !== 'undefined') {
        let privateKey: string = process.env.JWT_SECRET || defaultJWTSecret;
        
        let authorizationString: String = req.headers.authorization;
        
        if(!authorizationString.startsWith('jwt')) {
            return res.status(400).json({error: 'No jwt token supplied'});
        }

        let token = authorizationString.split(' ')[1];

        jwt.verify(token, privateKey, {algorithms: ['HS256']}, async (err, user: O) => {
            if(err) {
                return res.status(401).json({error: 'Not authorized'});
            }

            if (typeof user === 'object') {
                if (user.hasOwnProperty('id')) {
                    let loggedUser: User | null = await User.findByPk(
                        user.id, {
                            raw: true, 
                            attributes: [
                                'username', 
                                'firstName', 
                                'lastName'
                            ]
                        });
                    
                    req.user = loggedUser || undefined;
                    
                    if(loggedUser === null || loggedUser === undefined)
                        return res.status(401).json({error: 'No user'});
                }
            }

            return next();
        });
    } else {
        return res.status(500).json({error: 'No authorization token'});
        // throw new Error('No token provided');
    }
};
