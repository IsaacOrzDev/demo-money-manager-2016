// @flow
import initialState from '../state';
import type { Action, OptionState } from '../../flowTypes';

export default function(state: OptionState = initialState.option, action: Action) {
    switch(action.type) {
        default:
            return state;
    }
};