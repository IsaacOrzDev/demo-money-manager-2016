const config = {
    secret: 'testing',
    database: 'mongodb://<username>:<password>@<path>:<port>/<database>',
    allowOrigin: 'http://localhost:3000',
    allowMethods: 'GET,PATCH,POST,OPTIONS',
    allowHeader: 'Authorization,Content-Type,Accept,Accept-Encoding,Accept-Language,Access-Control-Request-Headers,Access-Control-Request-Method,Connection,Host,Origin,Referer,User-Agent',
    salt: 10,
    jwtTimeout: '1 days',
    ipAddress: '127.0.0.1',
    port: '8080'
};

export default config;