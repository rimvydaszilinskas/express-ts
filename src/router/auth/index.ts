import { Router, Request, Response } from 'express';
import Passport from '../../config/passport';
import { User } from '../../models';

const router = Router();

router.route('/')
    .get((req: Request, res: Response) => {
        res.render('login.html', {title: 'Login'})
    });

router.post('/login', Passport.authenticate('local'), (req: Request, res: Response) => {
    console.log(req.user!['username']);

    res.send('ok');
})

router.post('/register', (req: Request, res: Response) => {
    console.log(req.body);

    User.create({
        username: req.body.username,
        password: req.body.password
    }).then(() => {
        res.send('Ok');
    }).catch(err => {
        console.log(err);
        res.json(err);
    })
});

router.all('/logout', (req: Request, res: Response) => {
    req.logout();
    res.redirect('/');
});

export default router;
