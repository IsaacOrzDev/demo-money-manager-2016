import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';
import UserInfoModel from '../models/userInfoModel';
import AccountModel from '../models/accountModel';
import { errorResponse, successResponse, userModel, userInfoModel, accountModel } from '../defaultObjects';
import { errorHandling } from '../commonFunctions';
import errorMsgs from '../errorMsgs';
import isProduction from '../isProduction';
import configDev from '../config.dev';
import configProd from '../config.prod';

const config = isProduction? configProd : configDev;
const router = express.Router();

router.post('/signUp', async (req, res) => {
    try {
        let { username, password, email, currency, defaultAccount } = req.body;
        if(
            !username ||
            !password ||
            !email ||
            !currency ||
            !defaultAccount
        ) {
            res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersMissing}));
            return;
        }
        let salt = await bcrypt.genSalt(config.salt);
        let hashPassword = await bcrypt.hash(password, salt);
        let user = await UserModel.create(Object.assign({}, userModel, {
            username,
            email,
            password: hashPassword
        }));
        let account = await AccountModel.create(Object.assign({}, accountModel, {
            user: user._id,
            name: defaultAccount
        }));
        await UserInfoModel.create(Object.assign({}, userInfoModel, {
            user: user._id,
            currency,
            defaultAccount: account._id
        }));
        res.json(Object.assign({}, successResponse));
        return;
    } catch(error) {
        errorHandling(error, res);
        return;
    }
});

router.post('/signIn', async (req, res) => {
    try {
        let { usernameEmail, password } = req.body;
        if(!usernameEmail || !password) {
            res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersMissing}));
            return;
        }
        let user = await UserModel.findOne({$or: [
            {username: usernameEmail},
            {email: usernameEmail}
        ]});
        if(user) {
            let isPasswordCorrect = await bcrypt.compare(password, user.password);
            if(isPasswordCorrect) {
                const token = jwt.sign({
                    username: user.username,
                    email: user.email
                }, config.secret, { expiresIn: config.jwtTimeout });
                res.json(Object.assign({}, successResponse, {data: { token }}));
                return;
            } else {
                res.json(Object.assign({}, errorResponse, {error: errorMsgs.userNotFound}));
                return;
            }
        } else {
            res.json(Object.assign({}, errorResponse, {error: errorMsgs.userNotFound}));
            return;
        }
    } catch(error) {
        errorHandling(error, res);
        return;
    }
});

router.get('/getInfo', async (req, res) => {
    try {
        let { username, email } = req.claim;
        let user = await UserModel.findOne({$or: [{username}, {email}]});
        if(user) {
            let userInfo = await UserInfoModel.findOne({user: user._id});
            res.json(Object.assign({}, successResponse, {data: {
                username,
                email,
                currency: userInfo.currency,
                defaultAccount: userInfo.defaultAccount
            }}));
            return;
        } else {
            res.json(Object.assign({}, errorResponse, {error: errorMsgs.unhandledError}));
            return;
        }
    } catch(error) {
        errorHandling(error, res);
        return;
    }
});

export default router;