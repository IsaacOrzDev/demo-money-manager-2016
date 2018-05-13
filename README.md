Money Manager 101
================
## Intro

Money Manager 101 is a simplified finance application with basic features for personal use.

The application is built upon the following framework:

- Web Client
    - React
        - Flow
        - Scss
- Back End
    - Node.js (ES6)
        - Express
        - MongoDB

Click Here for a [**Live Demo**](https://moneymanager101-8ca07.firebaseapp.com/) </br>
(P.S. In demo mode, the data is only stored in front-end, all temporary data will be lost after refreshing or exiting the website)

## Installation & Usage 

To start the project in development mode
1. install MongoDB and create a database
2. start MongoDB
3. modify the path of MongoDB in config file (./back-end/nodejs_es6/src/config.dev.js)
3. `npm install --prefix ./back-end/nodejs_es6`
2. `npm start --prefix ./back-end/nodejs_es6`
4. `npm install --prefix ./web-client/react`
5. `npm start --prefix ./web-client/react`
6. visit `http://localhost:3000`

To start web project in demo mode
1. `npm install --prefix ./web-client/react`
2. `npm run demo --prefix ./web-client/react`
3. visit `http://localhost:3000`



