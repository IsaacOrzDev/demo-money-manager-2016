// @flow
import initialState from '../state';
import * as types from '../types';
import { TransactionTypeEnums } from '../../enums';
import type { Action, TransactionState } from '../../flowTypes';

export default function(state: TransactionState = initialState.transaction, action: Action) {
    switch(action.type) {
        default:
            return state;

        case types.RESET_TRANSACTION: {
            return Object.assign({}, state, {
                draft: {
                    id: "",
                    docDate: "",
                    title: "",
                    type: "",
                    account: "",
                    category: "",
                    amount: 0,
                    detail: []
                }
            });
        }

        case types.SETUP_NEW_INCOME: {
            if(action.payload) {
                let payload: {account: string, docDate: string} = action.payload;
                return Object.assign({}, state, {
                    draft: {
                        id: "",
                        docDate: payload.docDate,
                        title: "",
                        type: TransactionTypeEnums.income,
                        account: payload.account,
                        category: "",
                        amount: 0,
                        detail: []
                    }
                });
            } else {
                return state;
            }
        }

        case types.SETUP_NEW_WITHDRAW: {
            if(action.payload) {
                let payload: {account: string, docDate: string} = action.payload;
                return Object.assign({}, state, {
                    draft: {
                        id: "",
                        docDate: payload.docDate,
                        title: "",
                        type: TransactionTypeEnums.expense,
                        account: payload.account,
                        category: "",
                        amount: 0,
                        detail: []
                    }
                });
            } else {
                return state;
            }
        }

        case types.SELECT_TRANSACTION_RECORD: {
            return Object.assign({}, state, { draft: action.payload });
        }

        case types.RELOAD_TRANSACTION_RECORDS: {
            return Object.assign({}, state, {records: action.payload});
        }

        case types.CHANGE_CURRENT_ACCOUNT: {
            return Object.assign({}, state, {account: action.payload});
        }

        case types.CLEAR_STATE: {
            return Object.assign({}, initialState.transaction); 
        }
    }
};