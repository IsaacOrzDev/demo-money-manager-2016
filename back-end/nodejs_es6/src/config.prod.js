const config = {
    secret: '<secret>',
    database: 'mongodb://<username>:<password>@<path>:<port>/<database>',
    allowOrigin: 'http://localhost:3000',
    allowMethods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
    allowHeader: 'Authorization,Content-Type,Accept,Accept-Encoding,Accept-Language,Access-Control-Request-Headers,Access-Control-Request-Method,Connection,Host,Origin,Referer,User-Agent',
    salt: 10,
    jwtTimeout: '30 days',
    ipAddress: '<IP address>',
    port: '<port>'
};

export default config;