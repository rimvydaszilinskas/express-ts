import express, { Application, Request, Response, NextFunction, raw } from 'express';
import nunjucks from 'nunjucks'; 
import bodyParser from 'body-parser';
import session from 'express-session';

import Router from './router/index';
import Sequelize from './models';
import Passport from './config/passport';

Sequelize.authenticate().then(() => {
    console.log('Connection to database established successfully');
}).catch(err => {
    console.log('Cannot connect to the database');
});

const app: Application = express();

app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard_cat',
    resave: true, 
    saveUninitialized: true
}));

// Setup to use passport for authentication
app.use(Passport.initialize());
app.use(Passport.session());

app.use((req: Request, res: Response, next:NextFunction) => {
    // Log requests
    console.log(`${req.method} ${req.originalUrl} User: ${req.user}`);
    next();
});

// Configure Nunjucks to be working as the default templating engine
nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

// Use router to handle requests
app.use('/', Router);

app.listen(5000, () => {
    console.log('Server is listening to port 5000')
});
