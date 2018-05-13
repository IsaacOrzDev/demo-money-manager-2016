import express from 'express';
import UserModel from '../models/userModel';
import AccountModel from '../models/accountModel';
import TransactionModel from '../models/transactionModel';
import { errorResponse, successResponse, transactionModel } from '../defaultObjects';
import { TransactionTypeEnums } from '../enums';
import { errorHandling } from '../commonFunctions';
import errorMsgs from '../errorMsgs';

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        let { username, email } = req.claim;
        let { docDate, title, type, category, amount, account, detail } = req.body;
        if(
            !docDate ||
            !title ||
            !type ||
            !category ||
            !amount ||
            !account ||
            !detail
        ) {
            res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersMissing}));
            return;
        }
        let user = await UserModel.findOne({$or: [{ username }, { email }]});
        let relatedAccount = await AccountModel.findById(account);
        if(user && relatedAccount) {
            let transaction = await TransactionModel.create(Object.assign({}, transactionModel, {
                user: user._id,
                account: relatedAccount._id,
                docDate,
                title,
                type,
                category,
                amount: parseFloat(amount),
                detail
            }));
            if(transaction) {
                if(transaction.type === TransactionTypeEnums.income) {
                    relatedAccount.balance = parseFloat(relatedAccount.balance) + parseFloat(transaction.amount);
                    relatedAccount.income = parseFloat(relatedAccount.income) + parseFloat(transaction.amount);
                } else {
                    relatedAccount.balance = parseFloat(relatedAccount.balance) - parseFloat(transaction.amount);
                    relatedAccount.expense = parseFloat(relatedAccount.expense) + parseFloat(transaction.amount);
                }
                await relatedAccount.save();
                res.json(Object.assign({}, successResponse, {data: transaction}));
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

router.patch('/update/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let { title, docDate, category, amount, detail } = req.body;
        if(!id) {
            res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersMissing}));
            return;
        }
        let record = await TransactionModel.findById(id);
        let newRecord = await TransactionModel.findById(id);
        if(record && newRecord) {
            if(title) {
                newRecord.title = title;
            }
            if(docDate) {
                newRecord.docDate = docDate;
            }
            if(category) {
                newRecord.category = category;
            }
            if(amount) {
                newRecord.amount = amount;
            }
            if(detail) {
                newRecord.detail = detail;
            }
            await newRecord.save();
            let accountRecord = await AccountModel.findById(record.account);
            if(accountRecord) {
                if(record.type === TransactionTypeEnums.income) {
                    accountRecord.balance = parseFloat(accountRecord.balance) - parseFloat(record.amount) + parseFloat(newRecord.amount);
                    accountRecord.income = parseFloat(accountRecord.income) - parseFloat(record.amount) + parseFloat(newRecord.amount);
                } else {
                    accountRecord.balance = parseFloat(accountRecord.balance) + parseFloat(record.amount) - parseFloat(newRecord.amount);
                    accountRecord.expense = parseFloat(accountRecord.expense) - parseFloat(record.amount) + parseFloat(newRecord.amount);
                }
                await accountRecord.save();
                res.json(Object.assign({}, successResponse, {data: newRecord}));
                return;
            } else {
                res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersAreInvalid}));
                return;
            }
        } else {
            res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersAreInvalid}));
            return;
        }
    } catch(error) {
        errorHandling(error, res);
        return;
    }
});

router.get('/getOne/:id', async (req, res) => {
    try {
        let { id } = req.params;
        if(!id) {
            res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersMissing}));
            return;
        }
        let record = await TransactionModel.findById(id);
        if(record) {
            res.json(Object.assign({}, successResponse, {data: record}));
            return;
        } else {
            res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersAreInvalid}));
            return;
        }
    } catch(error) {
        errorHandling(error, res);
        return;
    }
});

router.get('/getAll/:account', async (req, res) => {
    try {
        let { username, email } = req.claim;
        let { account } = req.params;
        if(!account) {
            res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersMissing}));
            return;
        }
        let user = await UserModel.findOne({$or: [{ username }, { email }]});
        let relatedAccount = await AccountModel.findById(account);
        if(user && relatedAccount) {
            let records = await TransactionModel.find({$and: [{user: user._id}, {account: relatedAccount._id}]});
            if(records) {
                res.json(Object.assign({}, successResponse, {data: records}));
                return;
            } else {
                res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersAreInvalid}));
                return;
            }
        } else {
            res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersAreInvalid}));
            return;
        }
    } catch(error) {
        errorHandling(error, res);
        return;
    }
});

router.get('/filter/:account', async (req, res) => {
    try {
        let { username, email } = req.claim;
        let { account } = req.params;
        let { startDate, endDate, income, expense } = req.query;
        if(
            !account ||
            !startDate ||
            !endDate
        ) {
            res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersMissing}));
            return;
        }
        if(!income) {
            income = [];
        }
        if(!expense) {
            expense = [];
        }
        let userRecord = await UserModel.findOne({$or: [{username}, {email}]});
        let accountRecord = await AccountModel.findById(account);
        if(userRecord && accountRecord) {
            let parameters = [], categoryParameters = [];
            parameters.push({user: userRecord._id});
            parameters.push({account: accountRecord._id});
            parameters.push({docDate: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }});
            income.map(x => {
                categoryParameters.push({$and: [
                    {type: TransactionTypeEnums.income},
                    {category: x}
                ]});
            });
            expense.map(x => {
                categoryParameters.push({$and: [
                    {type: TransactionTypeEnums.expense},
                    {category: x}
                ]});
            });
            if(categoryParameters.length !== 0) {
                parameters.push({$or: categoryParameters});
            }
            let records = await TransactionModel.find({$and: parameters});
            if(records) {
                res.json(Object.assign({}, successResponse, {data: records}));
                return;
            } else {
                res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersAreInvalid}));
                return;
            }
        } else {
            res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersAreInvalid}));
            return;
        }

    } catch(error) {
        errorHandling(error, res);
        return;
    }
});

router.get('/search/:account', async (req, res) => {
    try {
        let { username, email } = req.claim;
        let { account } = req.params;
        let { keyword } = req.query;
        if(!account || !keyword) {
            res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersMissing}));
            return;
        }
        let userRecord = await UserModel.findOne({$or: [{username}, {email}]});
        let accountRecord = await AccountModel.findById(account);
        if(userRecord && accountRecord) {
            let parameters = [];
            parameters.push({user: userRecord._id});
            parameters.push({account: accountRecord._id});
            parameters.push({title: {
                $regex: keyword,
                $options: "i"
            }});
            let records = await TransactionModel.find({$and: parameters});
            if(records) {
                res.json(Object.assign({}, successResponse, {data: records}));
                return;
            } else {
                res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersAreInvalid}));
                return;
            }
        } else {
            res.json(Object.assign({}, errorResponse, {error: errorMsgs.parametersAreInvalid}));
            return;
        }
    } catch(error) {
        errorHandling(error, res);
        return;
    }
});

export default router;