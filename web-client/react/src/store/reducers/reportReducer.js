// @flow
import initialState from '../state';
import * as types from '../types';
import type { Action, ReportState } from '../../flowTypes';

export default function(state: ReportState = initialState.report, action: Action) {
    switch(action.type) {
        default:
            return state;          

        case types.RELOAD_BALANCE_LINE_CHART:
            return Object.assign({}, state, {balanceLineChart: action.payload});

        case types.RELOAD_IN_OUT_LINE_CHART: 
            return Object.assign({}, state, {inOutLineChart: action.payload});

        case types.RELOAD_INCOME_PIE_CHART:
            return Object.assign({}, state, {incomeCategoryPieChart: action.payload});
        
        case types.RELOAD_EXPENSE_PIE_CHART:
            return Object.assign({}, state, {expenseCategoryPieChart: action.payload});

        case types.CLEAR_STATE: {
            return Object.assign({}, initialState.report); 
        }
    }
};