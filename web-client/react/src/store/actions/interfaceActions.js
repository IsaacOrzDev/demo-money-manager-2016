// @flow
import type { ThunkAction, Transaction } from '../../flowTypes';

export interface interfaceActions {

    //#region persist
    completePersistStore(): ThunkAction;
    //#endregion

    //#region user
    signIn(user: {usernameEmail: string, password: string}): ThunkAction;
    signUp(user: {
        username: string,
        password: string,
        email: string,
        currency: string,
        defaultAccount: string
    }): ThunkAction;
    signOut(): ThunkAction;
    checkConnection(): ThunkAction;
    //#endregion

    //#region transaction
    loadTransaction(id: string): ThunkAction;
    saveTransaction(draft: Transaction): ThunkAction;
    //#endregion

    //#region search
    searchTransactionRecords(keyword: string): ThunkAction;
    //#endregion

    //#region filter
    applyFilterParameters(payload?: {
        timeRange: string,
        dateFrom: string,
        dateTo: string,
        incomeCategories: Array<string>,
        expenseCategories: Array<string>
    }): ThunkAction;
    //#endregion

    //#region account
    createNewAccount(payload: {
        name: string
    }): ThunkAction;
    //#endregion

    //#region demo
    reloadDemoData(): ThunkAction;
    //#endregion
}