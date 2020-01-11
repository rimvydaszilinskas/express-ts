import dotenv from 'dotenv';
import express, { Application, Request, Response, NextFunction } from 'express';
import nunjucks from 'nunjucks'; 
import bodyParser from 'body-parser';
import session from 'express-session';

import HttpException from './exceptions/HttpException';
import Router from './router/index';
import Sequelize from './models';
import Passport from './config/passport';

// Setup using .env file to set environmental variables
dotenv.config();

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
    resave: false,
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

app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
    // TODO handle errors here
    console.log(err);
    res.send('Error');
});

app.listen(5000, () => {
    console.log('Server is listening to port 5000')
});
