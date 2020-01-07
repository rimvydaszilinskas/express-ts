import express, { Application, Request, Response, NextFunction } from 'express';
import Sequelize from './models';

Sequelize.authenticate().then(() => {
    console.log('Successfully connected to the database');
}).catch(err => {
    console.log('An error has occured while connecting to the database');
});

const app: Application = express();

app.listen(5000, () => {
    console.log('Server is listening to port 5000')
});
