// @flow
import initialState from '../state';
import demoState from '../demo/state';
import * as types from '../types';
import type { Action, AccountState } from '../../flowTypes';

export default function(state: AccountState = initialState.account, action: Action) {
    switch(action.type) {
        default:
            return state;

        case types.RELOAD_ACCOUNT_RECORDS: {
            return Object.assign({}, state, {records: action.payload});
        }

        case types.CHANGE_CURRENT_ACCOUNT: {
            if(state.current !== action.payload) {
                return Object.assign({}, state, {current: action.payload});
            } else {
                return state;
            }
        }

        case types.CLEAR_STATE: {
            return Object.assign({}, initialState.account); 
        }

        case types.RELOAD_DEMO_DATA: {
            let { current, records } = demoState.account;
            return Object.assign({}, state, {current, records});
        }
    }
};