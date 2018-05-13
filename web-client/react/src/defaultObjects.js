// @flow
import type { Account, Transaction, Option } from './flowTypes';

export const defaultAccount: Account = {
    id: "",
    name: "",
    balance: 0,
    income: 0,
    expense: 0.
};

export const defaultTransaction: Transaction = {
    id: "",
    docDate: "",
    title: "",
    type: "",
    category: "",
    amount: 0,
    account: "",
    detail: []
};

export const defaultTransactionDetailRow = {
    id: "",
    description: "",
    amount: 0
};

export const defaultOption: Option = {
    text: "",
    value: ""
};