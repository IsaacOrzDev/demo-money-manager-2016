// @flow
import initialState from '../state';
import * as types from '../types';
import type { Action, FilterState } from '../../flowTypes';

export default function(state: FilterState = initialState.filter, action: Action) {
    switch(action.type) {
        default:
            return state;

        case types.SET_FILTER_PARAMETERS: {
            return Object.assign({}, state, { ...action.payload });
        }

        case types.CLEAR_STATE: {
            return Object.assign({}, initialState.filter); 
        }
    }
};