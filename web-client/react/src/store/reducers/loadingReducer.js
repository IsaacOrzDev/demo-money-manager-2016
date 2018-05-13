// @flow
import initialState from '../state';
import * as types from '../types';
import type { Action, LoadingState } from '../../flowTypes';

export default function(state: LoadingState = initialState.loading, action: Action) {
    switch(action.type) {
        default:
            return state;

        case types.ENABLE_LOADING: {
            return Object.assign({}, state, {isLoading: true});
        }

        case types.DISABLE_LOADING: {
            return Object.assign({}, state, {isLoading: false});
        }

        case types.SET_REHYDRATION_STATUS: {
            return Object.assign({}, state, {isRehydrated: true});
        }

        case types.SET_AUTHORIZATION_STATUS: {
            return Object.assign({}, state, {isAuthorized: true});
        }

        case types.RESET_AUTHORIZATION_STATUS: {
            return Object.assign({}, state, {isAuthorized: false});
        }

        case types.CLEAR_STATE: {
            return Object.assign({}, initialState.loading, {isRehydrated: true}); 
        }
    }
};