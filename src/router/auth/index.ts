import { Router, Request, Response } from 'express';
import Passport from '../../config/passport';
import { User } from '../../models';
import { doesUserExist, isUserValid } from '../../utils/user_utils';
import AuthenticationMiddleware from '../../middleware/authentication';

const router = Router();

router.route('/login')
    .get(AuthenticationMiddleware, (req: Request, res: Response) => {
        let next: String | null = null;

        if(req.query.next) {
            next =  req.query.next;
        }
        res.render('login.html', {title: 'Login', next: next})
    }).post(AuthenticationMiddleware, Passport.authenticate('local'), (req: Request, res: Response) => {
        let next: string | null | undefined = req.body.next;

        if (next) {
            return res.redirect(next);
        }

        res.send('ok');
    });

router.route('/register')
    .get(AuthenticationMiddleware, (req: Request, res: Response) => {
        res.render('register.html', {title: 'Register'})
    }).post(AuthenticationMiddleware, async (req: Request, res: Response) => {
        let user: any = {
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }

        let isValid: boolean = isUserValid(user);

        if(isValid) {
            let doesExist: boolean = await doesUserExist(user.username);
            if (!doesExist) {
                await User.create(user);

                return res.redirect('/auth/login');
            } else {
                return res.status(400).render('register.html', {
                    title: 'Register',
                    message: `${user.username} already exist!`
                });
            }
        } else {
            return res.status(400).render('register.html', {
                title: 'Register', 
                error: 'Invalid data',
                data: user
            });
        }
    });

router.all('/logout', (req: Request, res: Response) => {
    req.logout();
    res.redirect('/');
});

export default router;
