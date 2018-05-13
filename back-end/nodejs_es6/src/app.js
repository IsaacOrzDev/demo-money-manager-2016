import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import configDev from './config.dev';
import configProd from './config.prod';
import isProduction from './isProduction';

import routes from './routes';

const config = isProduction ? configProd : configDev;

const app = express();

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', config.allowOrigin);
    res.header('Access-Control-Allow-Methods', config.allowMethods);
    res.header('Access-Control-Allow-Headers', config.allowHeader);
    next();
};
app.use(allowCrossDomain);

app.set('serverSecret', config.secret);
mongoose.Promise = global.Promise;
mongoose.connection.on('connected', () => {
    console.log("DB is connected"); //eslint-disable-line no-console
});
mongoose.connection.on('error', (error) => {
    console.log(error); //eslint-disable-line no-console
});
mongoose.connection.on('disconnected', () => {
    console.log("DB is disconnected"); //eslint-disable-line no-console
});
mongoose.connect(config.database);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', routes);

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({error: "You shall not pass!"});
});

export default app;

