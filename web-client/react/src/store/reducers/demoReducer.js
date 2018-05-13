// @flow
import demoState from '../demo/state';
import * as types from '../types';
import type { Action, DemoState, Transaction } from '../../flowTypes';

export default function(state: DemoState = demoState.demo, action: Action) {
    switch(action.type) {
        default:
            return state;
        
        case types.RELOAD_DEMO_DATA: {
            return Object.assign({}, state, demoState.demo);
        }
        
        case types.SAVE_MODIFIED_DEMO_TRANSACTION: {
            if(action.payload) {
                let payload: {draft: Transaction, index: number, account: string} = action.payload;
                let demoAccount = state[payload.account];
                if(demoAccount) {
                    let records = [
                        ...demoAccount.records.slice(0, payload.index),
                        payload.draft,
                        ...demoAccount.records.slice(payload.index + 1)
                    ];
                    return Object.assign({}, state, {
                        [payload.account]: Object.assign({}, demoAccount, { records })
                    });
                } else {
                    return state;
                }
            } else {
                return state;
            }
        }

        case types.SAVE_NEW_DEMO_TRANSACTION: {
            if(action.payload) {
                let payload: {draft: Transaction, account: string} = action.payload;
                let demoAccount = state[payload.account];
                if(demoAccount) {
                    let records = [
                        ...demoAccount.records,
                        payload.draft,
                    ];
                    return Object.assign({}, state, {
                        [payload.account]: Object.assign({}, demoAccount, { records })
                    });
                } else {
                    return state;
                }
            } else {
                return state;
            }
        }
    }
};