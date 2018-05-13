import express from 'express';
import jwt from 'jsonwebtoken';
import errorMsgs from './errorMsgs';
import { errorResponse } from './defaultObjects';
import isProduction from './isProduction';
import configDev from './config.dev';
import configProd from './config.prod';
import userRoute from './routes/userRoute';
import testRoute from './routes/testRoute';
import accountRoute from './routes/accountRoute';
import transactionRoute from './routes/transactionRoute';
const config = isProduction? configProd : configDev;
const router = express.Router();

router.use((req, res, next) => {
    const allow1 = req.method === "OPTIONS";
    const allow2 = req.path === "/user/signin";
    const allow3 = req.path === "/user/signup";
    if(allow1 || allow2 || allow3) {
        next();
    } else {
        let token = req.headers["authorization"];
        if (token) {
            token = token.replace("Bearer ", "");
            jwt.verify(token, config.secret, (err, decoded) => {
                if(err) {
                    res.json(Object.assign({}, errorResponse, {error: errorMsgs.unhandledError}));
                    return;
                } else {
                    req.claim = decoded;
                    next();
                }
            });
        } else {
            res.json(Object.assign({}, errorResponse, {error: errorMsgs.unauthorized}));
            return;
        }
    }
});

router.use('/user', userRoute);
router.use('/test', testRoute);
router.use("/account", accountRoute);
router.use("/transaction", transactionRoute);

export default router;