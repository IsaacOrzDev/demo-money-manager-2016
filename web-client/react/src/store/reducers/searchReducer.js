// @flow
import initialState from '../state';
import * as types from '../types';
import type { Action, SearchState } from '../../flowTypes';

export default function(state: SearchState = initialState.search, action: Action) {
    switch(action.type) {
        default:
            return state;

        case types.LOAD_SEARCH_RESULTS: {
            return Object.assign({}, state, { results: action.payload });
        }

        case types.CLEAR_SEARCH_RESULTS: {
            return Object.assign({}, state, {results: []});
        }

        case types.CLEAR_STATE: {
            return Object.assign({}, initialState.search); 
        }
    }
};