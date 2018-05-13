import 'babel-polyfill';
import app from './app';
import http from 'http';
import configDev from './config.dev';
import configProd from './config.prod';
import isProducton from './isProduction';

let config = isProducton? configProd : configDev;
app.set('port', config.port);

let server = http.createServer(app);

server.listen(config.port, config.ipAddress, () => {
    let addr = server.address();
    console.log(`Listening on ${addr.address}, port ${addr.port}`); //eslint-disable-line no-console
});

server.on('error', (error) => {
    throw error;
});
