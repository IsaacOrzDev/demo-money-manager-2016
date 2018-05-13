// @flow
import initialState from '../state';
import demoState from '../demo/state';
import * as types from '../types';
import type { Action, UserState } from '../../flowTypes';

export default function(state: UserState = initialState.user, action: Action) {
    switch(action.type) {
        default:
            return state;

        case types.RELOAD_USER_INFO: {
            return Object.assign({}, state, {...action.payload});
        }
        
        case types.RELOAD_DEMO_DATA: {
            return Object.assign({}, state, demoState.user);
        }

        case types.CLEAR_STATE: {
            return Object.assign({}, initialState.user); 
        }
    }
};