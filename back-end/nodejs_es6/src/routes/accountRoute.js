import express from 'express';
import UserModel from '../models/userModel';
import AccountModel from '../models/accountModel';
import { errorResponse, successResponse } from '../defaultObjects';
import { errorHandling } from '../commonFunctions';
import errorMsgs from '../errorMsgs';

const router = express.Router();

router.get('/getAll', async (req, res) => {
    try {
        let { username, email } = req.claim;
        let user = await UserModel.findOne({$or: [{username}, {email}]});
        if(user) {
            let accounts = await AccountModel.find({user: user._id});
            res.json(Object.assign({}, successResponse, {data: accounts}));
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

router.post('/add', async (req, res) => {
    try {
        let { name } = req.body;
        let { username, email } = req.claim;
        if(!name) {
            res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersMissing}));
            return;
        }
        let user = await UserModel.findOne({$or: [{username}, {email}]});
        if(user) {
            let account = await AccountModel.create({
                user: user._id,
                name,
                balance: 0,
                income: 0,
                expense: 0
            });
            if(account) {
                res.json(Object.assign({}, successResponse, {data: account}));
                return;
            } else {
                res.json(Object.assign({}, errorResponse, {error: errorMsgs.unhandledError}));
                return;
            }
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