// @flow
import initialState from '../state';
import * as types from '../types';
import type { Action, PersistenceState } from '../../flowTypes';

export default function(state: PersistenceState = initialState.persistence, action: Action) {
    switch(action.type) {
        default:
            return state;

        case types.SET_PERSISTENCE_TOKEN: {
            return Object.assign({}, state, {token: {
                headers:{"Authorization": action.payload}
            }});
        }

        case types.CLEAR_STATE: {
            return Object.assign({}, initialState.persistence);
        }
    }
};