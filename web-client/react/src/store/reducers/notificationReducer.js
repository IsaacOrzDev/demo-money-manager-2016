// @flow
import initialState from '../state';
import * as types from '../types';
import type { Action, NotificationState } from '../../flowTypes';

export default function(state: NotificationState = initialState.notification, action: Action) {
    switch(action.type) {
        default:
            return state;
        
        case types.ADD_NOTIFICATION: {
            if(action.payload) {
                let payload: {type: string, text: string} = action.payload;
                return Object.assign({}, state, {
                    type: payload.type,
                    text: payload.text,
                    isVisible: true                    
                });
            } else {
                return state;
            }
        }

        case types.CLEAR_NOTIFICATION: {
            return Object.assign({}, state, {
                type: "",
                text: "",
                isVisible: false
            });
        }

        case types.CLEAR_STATE: {
            return Object.assign({}, initialState.notification); 
        }
    }
};