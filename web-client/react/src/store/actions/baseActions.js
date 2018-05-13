// @flow
import moment from 'moment';
import * as types from '../types';
import history from '../../history';
import type { Action, ThunkAction, Transaction, Account } from '../../flowTypes';

export default class baseActions {

    //#region route
    redirectToHomePage(): ThunkAction {
        return async (dispatch, getState) => {
            history.push('/home');
        }
    }

    goToDefaultHomePage(): ThunkAction {
        return async (dispatch, getState) => {
            history.push(`/home/${getState().user.defaultAccount}?mode=1`);
        }
    }

    redirectToHomePageDefaultAccount(): ThunkAction {
        return async (dispatch, getState) => {
            history.push(`/home/${getState().user.defaultAccount}?mode=1`);
        }
    }

    redirectToHomePageWithAccountId(accountId: string): ThunkAction {
        return async (dispatch, getState) => {
            history.push(`/home/${accountId}?mode=1`);
        }
    }

    redirectToHomePageReportSection(): ThunkAction {
        return async (dispatch, getState) => {
            history.push(`/home/${getState().account.current}?mode=1`);
        }
    }

    redirectToHomePageTransactionSection(): ThunkAction {
        return async (dispatch, getState) => {
            history.push(`/home/${getState().account.current}?mode=2`);
        }
    }

    redirectToNewIncome(): ThunkAction {
        return async (dispatch, getState) => {
            history.push(`/transaction/?account=${getState().account.current}&type=income`);
        }
    }

    redirectToNewExpense(): ThunkAction {
        return async (dispatch, getState) => {
            history.push(`/transaction/?account=${getState().account.current}&type=expense`);
        }
    }

    redirectToSignIn(): ThunkAction {
        return async (dispatch, getState) => {
            history.push(`/signin`);
        }        
    }

    redirectToSignUp(): ThunkAction {
        return async (dispatch, getState) => {
            history.push(`/signup`);
        }        
    }

    redirectToExistingTransaction(transactionId: string): ThunkAction {
        return async (dispatch, getState) => {
            history.push(`/transaction/${transactionId}`);
        }
    }

    redirectToSearchPage(): ThunkAction {
        return async (dispatch, getState) => {
            history.push(`/search/${getState().account.current}`);
        }
    }

    redirectToMaintenancePage(): ThunkAction {
        return async (dispatch, getState) => {
            history.push('/maintenance');
        }
    }

    redirectToPreviousPage(): ThunkAction {
        return async (dispatch, getState) => {
            history.goBack();
        }
    }

    replaceAsSearchPageWithKeyword(keyword: string): ThunkAction {
        return async (dispatch, getState) => {
            history.replace(`/search/${getState().account.current}?keyword=${keyword}`);
        }
    }
    //#endregion

    //#region persistence
    setPersistenceToken(token: string): Action {
        return {
            type: types.SET_PERSISTENCE_TOKEN,
            payload: token
        };
    }

    clearState(): Action {
        return {type: types.CLEAR_STATE};
    }
    //#endregion

    //#region transaction
    resetTransaction(): Action {
        return {
            type: types.RESET_TRANSACTION
        };
    }

    setupNewIncome(accountId: string): ThunkAction {
        return async (dispatch, getState) => {
            let currentDate: string = moment(new Date()).format(process.env.REACT_APP_DATE_FORMAT);
            dispatch({type: types.SETUP_NEW_INCOME, payload: {
                docDate:  currentDate,
                account: accountId
            }});
        };
    }

    setupNewWithdraw(accountId: string): ThunkAction {
        return async (dispatch, getState) => {
            let currentDate: string = moment(new Date()).format(process.env.REACT_APP_DATE_FORMAT);
            dispatch({type: types.SETUP_NEW_WITHDRAW, payload: {
                docDate:  currentDate,
                account: accountId
            }});
        };
    }

    reloadTransactionRecords(payload: Array<Transaction>): Action {
        return {
            type: types.RELOAD_TRANSACTION_RECORDS,
            payload
        };
    }

    selectTransactionRecord(record: Transaction): Action {
        return {
            type: types.SELECT_TRANSACTION_RECORD,
            payload: record
        };
    }
    //#endregion

    //#region account
    reloadAccountRecords(payload: Array<Account>): Action {
        return {
            type: types.RELOAD_ACCOUNT_RECORDS,
            payload
        };
    }

    changeCurrentAccount(payload: string): Action {
        return {
            type: types.CHANGE_CURRENT_ACCOUNT,
            payload
        };
    }
    //#endregion

    //#region search
    loadSearchResults(payload: Array<Transaction>): Action {
        return {
            type: types.LOAD_SEARCH_RESULTS,
            payload
        };
    }

    clearSearchResults(): Action {
        return {type: types.CLEAR_SEARCH_RESULTS};
    }
    //#endregion

    //#region filter
    setFilterParameters(payload: {
        timeRange: string,
        dateFrom: string,
        dateTo: string,
        incomeCategories: Array<string>,
        expenseCategories: Array<string>
    }): Action {
        return {
            type: types.SET_FILTER_PARAMETERS,
            payload
        };
    }
    //#endregion

    //#region report
    reloadBalanceLineChart(payload: {
        labels: Array<string>,
        balanceData: Array<number>
    }) {
        return {
            type: types.RELOAD_BALANCE_LINE_CHART,
            payload
        };
    }

    reloadInOutLineChart(payload: {
        labels: Array<string>,
        incomeData: Array<number>,
        expenseData: Array<number>
    }) {
        return {
            type: types.RELOAD_IN_OUT_LINE_CHART,
            payload
        };
    }

    reloadIncomeCateogryPieChart(payload: {
        labels: Array<string>,
        data: Array<number>
    }) {
        return {
            type: types.RELOAD_INCOME_PIE_CHART,
            payload
        };
    }

    reloadExpenseCategoryPieChart(payload: {
        labels: Array<string>,
        data: Array<number>
    }) {
        return {
            type: types.RELOAD_EXPENSE_PIE_CHART,
            payload
        };
    }
    //#endregion

    //#region notification
    addNotification(payload: {type: string, text: string}): Action {
        return {
            type: types.ADD_NOTIFICATION,
            payload
        };
    }

    clearNotification(): Action {
        return {type: types.CLEAR_NOTIFICATION};
    }

    showNotification(payload: {type: string, text: string}): ThunkAction {
        return async (dispatch, getState) => {
            let showDuration = 100;
            let closeDuration = 10000;
            setTimeout(() => {
                dispatch(this.addNotification(payload))
                setTimeout(() => {
                    dispatch(this.clearNotification())
                }, closeDuration);
            }, showDuration);
        }
    }
    //#endregion

    //#region loading
    enableLoading(): Action {
        return {type: types.ENABLE_LOADING};
    }

    disableLoading(): Action {
        return {type: types.DISABLE_LOADING};
    }

    setRehydrationStatus(): Action {
        return {type: types.SET_REHYDRATION_STATUS};
    }

    setAuthorizationStatus(): Action {
        return {type: types.SET_AUTHORIZATION_STATUS};
    }

    resetAuthorizationStatus(): Action {
        return {type: types.RESET_AUTHORIZATION_STATUS};
    }
    //#endregion

    //#region user
    reloadUserInfo(payload: {
        username: string,
        email: string,
        currency: string,
        defaultAccount: string
    }) {
        return {
            type: types.RELOAD_USER_INFO,
            payload
        };
    }
    //#endregion
}