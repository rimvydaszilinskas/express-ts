import Passport from 'passport';
import LocalStrategy from 'passport-local';

import { User } from '../models/index';

Passport.use(new LocalStrategy.Strategy(
    {
        usernameField: 'username'
    },
    (username, password, done) => {
        User.findOne({
            where: {
                username: username 
            }
        }).then(user => {
            if(!user) {
                return done(null, false, {message:'Incorrect username'})
            } else if (!user.verifyPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password'
                });
            }

            return done(null, user);
        });
    }
));

Passport.serializeUser((user: User, cb) => {
    cb(null, user.id);
});

Passport.deserializeUser((obj: number, cb) => {
    // Only return the following attributes
    let attributes: string[] = [
        'username',
        'firstName',
        'lastName'
    ];

    User.findByPk(obj, {raw: true, attributes: attributes}).then((user) => {
        return cb(null, user);
    });
});

export default Passport;
