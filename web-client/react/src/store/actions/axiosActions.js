// @flow
import axios from 'axios';
import moment from 'moment';
import baseActions from './baseActions';
import { interfaceActions } from './interfaceActions';
import { AxiosResponseStatusEnums, NotificationEnums, RunningModeEnums, TimeRangeEnums, TransactionTypeEnums } from '../../enums';
import notificationMsgs from '../notificationMsgs';
import { 
    generateMonthReportData, 
    generateYearReportData, 
    calculateAmountByCategories,  
    momentToString 
} from '../../componentFunctions';
import type { ThunkAction, Transaction, Dispatch, State } from '../../flowTypes';

const notImplementedMsg = "The action is not implemented";

const paths = {
    test: "/api/test",
    signIn: "/api/user/signin",
    signUp: "/api/user/signup",
    addTransaction: "/api/transaction/add",
    updateTransaction: "/api/transaction/update/",
    getTransaction: "/api/transaction/getOne/",
    filterTransaction: "/api/transaction/filter/",
    searchTransaction: "/api/transaction/search/",
    addAccount: "/api/account/add",
    getAllAccounts: "/api/account/getAll",
    getUserInfo: "/api/user/getInfo",
};

if(process.env.REACT_APP_MODE === RunningModeEnums.development)
    axios.defaults.baseURL = process.env.REACT_APP_DEVELOPMENT_BASE_URL;
else if (process.env.REACT_APP_MODE === RunningModeEnums.production)
    axios.defaults.baseURL = process.env.REACT_APP_PRODUCTION_BASE_URL;

export default class thunkActions extends baseActions implements interfaceActions {
    
    //#region persist
    completePersistStore(): ThunkAction {
        return async (dispatch, getState) => {
            try {
                let { token } = getState().persistence;
                let authResponse = await axios.get(paths.test, token);
                if(authResponse.data === AxiosResponseStatusEnums.success) {
                    await this.reloadServerAccountRecords(dispatch, token);
                    await this.reloadServerUserInfo(dispatch, token);
                }
            } catch(error) {

            }
            dispatch(this.setRehydrationStatus());
        }
    }
    //#endregion

    //#region user
    signIn(user: {usernameEmail: string, password: string}): ThunkAction {
        return async (dispatch, getState) => {
            dispatch(this.enableLoading());
            try {
                let signInResponse = await axios.post(paths.signIn, user);
                if(signInResponse.data.status === AxiosResponseStatusEnums.success) {
                    dispatch(this.setPersistenceToken(signInResponse.data.data.token));
                    let { token } = getState().persistence;
                    await this.reloadServerAccountRecords(dispatch, token);
                    await this.reloadServerUserInfo(dispatch, token);
                    dispatch(this.goToDefaultHomePage());
                } else {
                    dispatch(this.addNotification({type: NotificationEnums.error, text: notificationMsgs.signInFail}));
                }
            } catch(error) {
                dispatch(this.redirectToMaintenancePage());
            }
            dispatch(this.disableLoading());
        }
    }

    signUp(user: {
        username: string,
        password: string,
        email: string,
        currency: string,
        defaultAccount: string
    }): ThunkAction {
        return async (dispatch, getState) => {
            dispatch(this.enableLoading());
            try {
                let signUpResponse = await axios.post(paths.signUp, user);
                if(signUpResponse.data.status === AxiosResponseStatusEnums.success) {
                    dispatch(this.addNotification({type: NotificationEnums.success, text: notificationMsgs.signUpSuccess}));
                    dispatch(this.signIn({
                        usernameEmail: user.username,
                        password: user.password
                    }));
                } else {
                    dispatch(this.addNotification({type: NotificationEnums.error, text: notificationMsgs.unhandledError}));
                }
            } catch(error) {
                dispatch(this.redirectToMaintenancePage());
            }
            dispatch(this.disableLoading());
        }
    }

    signOut(): ThunkAction {
        return async (dispatch, getState) => {
            dispatch(this.enableLoading());
            dispatch(this.clearState());
            dispatch(this.redirectToSignIn());
            dispatch(this.disableLoading());
        }
    }

    checkConnection(): ThunkAction {
        return async (dispatch, getState) => {
            try {
                let { token } = getState().persistence;
                let authResponse = await axios.get(paths.test, token);
                if(authResponse.data === AxiosResponseStatusEnums.success) {
                    dispatch(this.setAuthorizationStatus())
                } else {
                    if(token) {
                        dispatch(this.addNotification({type: NotificationEnums.warning, text: notificationMsgs.signInAgain}));
                    }
                    dispatch(this.redirectToSignIn());
                }
            } catch(error) {
                dispatch(this.redirectToMaintenancePage());
            }
        }
    }
    //#endregion

    //#region transaction
    loadTransaction(id: string): ThunkAction {
        return async (dispatch, getState) => {
            dispatch(this.enableLoading());
            try {
                let { token } = getState().persistence;
                let response = await axios.get(paths.getTransaction + id, token);
                if(response.data.status === AxiosResponseStatusEnums.success) {
                    dispatch(this.selectTransactionRecord(response.data.data));
                }
            } catch(error) {
                dispatch(this.redirectToMaintenancePage());
            }
            dispatch(this.disableLoading());
        };
    }

    saveTransaction(draft: Transaction): ThunkAction {
        return async (dispatch, getState) => {
            dispatch(this.enableLoading());
            try {
                let { token } = getState().persistence;
                    let saveResult = draft.id === ""? 
                        await axios.post(paths.addTransaction, draft, token) 
                    : 
                        await axios.patch(paths.updateTransaction + draft.id, draft, token);
                    if(saveResult.data.status === AxiosResponseStatusEnums.success) {
                        await this.reloadServerAccountRecords(dispatch, token);
                        dispatch(this.addNotification({type: NotificationEnums.success, text: notificationMsgs.successSaveTransaction}));
                        dispatch(this.redirectToPreviousPage());
                    }
            } catch(error) {
                dispatch(this.redirectToMaintenancePage());
            }
            //dispatch(this.disableLoading());
        }
    }
    //#endregion

    //#region account
    createNewAccount(payload: {
        name: string
    }): ThunkAction {
        return async (dispatch, getState) => {
            dispatch(this.enableLoading());
            try {
                let { token } = getState().persistence;
                let response = await axios.post(paths.addAccount, payload, token);
                if(response.data.status === AxiosResponseStatusEnums.success) {
                    let record = response.data.data;
                    await this.reloadServerAccountRecords(dispatch, token);
                    dispatch(this.redirectToHomePageWithAccountId(record.id));
                }
            } catch(error) {
                dispatch(this.redirectToMaintenancePage());
            }
            dispatch(this.disableLoading());
        }
    }
    //#endregion

    //#region search
    searchTransactionRecords(keyword: string): ThunkAction {
        return async (dispatch, getState) => {
            dispatch(this.enableLoading());
            try {
                let { account, persistence } = getState();
                let response = await axios.get(`${paths.searchTransaction}${account.current}?keyword=${keyword}`, persistence.token);
                if(response.data.status === AxiosResponseStatusEnums.success) {
                    let records = response.data.data;
                    dispatch(this.loadSearchResults(records));
                }
            } catch(error) {
                dispatch(this.redirectToMaintenancePage());
            }
            dispatch(this.disableLoading());
        }
    }
    //#endregion

    //#region filter
    applyFilterParameters(payload?: {
        timeRange: string,
        dateFrom: string,
        dateTo: string,
        incomeCategories: Array<string>,
        expenseCategories: Array<string>
    }): ThunkAction { 
        return async (dispatch, getState) => {
            dispatch(this.enableLoading());
            try {            
                if(!payload) {
                    let { timeRange, dateFrom, dateTo, incomeCategories, expenseCategories } = getState().filter;
                    payload = {
                        timeRange,
                        dateFrom,
                        dateTo,
                        incomeCategories,
                        expenseCategories
                    };
                }
                if(payload.timeRange !== TimeRangeEnums.custom) {
                    payload.dateFrom = "";
                    payload.dateTo = "";
                }
                dispatch(this.setFilterParameters(payload));
                let { persistence, account, filter } = getState();
                let queryString = "", today: moment.Moment = moment(new Date()), startDate: moment.Moment, endDate: moment.Moment;
                if(filter.timeRange === TimeRangeEnums.custom) {
                    queryString += `?startDate=${filter.dateFrom}&endDate=${filter.dateTo}`;
                } else {
                    switch(filter.timeRange) {
                        default:
                        case TimeRangeEnums.currentMonth:
                            startDate = moment(today).startOf('month');
                            endDate = moment(today).endOf('month');
                            break;
                        case TimeRangeEnums.threeMonths:
                            startDate =  moment(today).subtract(2, 'months').startOf('month');
                            endDate = moment(today).endOf('momth');
                            break;
                        case TimeRangeEnums.halfOfYear:
                            startDate =  moment(today).subtract(5, 'months').startOf('month');
                            endDate = moment(today).endOf('momth');
                            break;
                        case TimeRangeEnums.currentYear:
                            startDate =  moment(today).startOf('year');
                            endDate = moment(today).endOf('year');
                            break;
                    }
                    queryString += `?startDate=${momentToString(startDate)}&endDate=${momentToString(endDate)}`;
                }
                if(filter.incomeCategories.length !== 0) {
                    filter.incomeCategories.map(x => { 
                        queryString += `&income=${x}`;
                        return 0;
                    });
                }
                if(filter.expenseCategories.length !== 0) {
                    filter.expenseCategories.map(x => {
                        queryString += `&expense=${x}`;
                        return 0;
                    });
                }
                let transactionResponse = await axios.get(paths.filterTransaction + account.current + queryString, persistence.token);
                if(transactionResponse.data.status === AxiosResponseStatusEnums.success) {
                    let records = transactionResponse.data.data;
                    dispatch(this.reloadTransactionRecords(records));
                    //#region generate report data
                    let minimumLabelsCount = 6;
                    let reportData = {};
                    switch(payload.timeRange) {
                        case TimeRangeEnums.currentMonth:
                        case TimeRangeEnums.threeMonths:
                        case TimeRangeEnums.halfOfYear:
                        case TimeRangeEnums.custom:
                            reportData = generateMonthReportData(minimumLabelsCount, startDate, endDate, records);
                            break;
                        case TimeRangeEnums.currentYear:
                            reportData = generateYearReportData(minimumLabelsCount, today, records);
                            break;
                        default:
                            break;
                    }
                    let incomeCategorData = [], expenseCategoryData = [];
                    payload.incomeCategories.map(x => {
                        incomeCategorData.push(calculateAmountByCategories(TransactionTypeEnums.income, x, records));
                        return 0;
                    });
                    payload.expenseCategories.map(x => {
                        expenseCategoryData.push(calculateAmountByCategories(TransactionTypeEnums.expense, x, records));
                        return 0;
                    });
                    dispatch(this.reloadBalanceLineChart({
                        labels: reportData.dayLabels,
                        balanceData: reportData.balanceData
                    }));
                    dispatch(this.reloadInOutLineChart({
                        labels: reportData.dayLabels,
                        incomeData: reportData.incomeData,
                        expenseData: reportData.expenseData
                    }));
                    dispatch(this.reloadIncomeCateogryPieChart({
                        labels: payload.incomeCategories,
                        data: incomeCategorData
                    }));
                    dispatch(this.reloadExpenseCategoryPieChart({
                        labels: payload.expenseCategories,
                        data: expenseCategoryData
                    }));
                    //#endregion
                }
            } catch(error) {
                dispatch(this.redirectToMaintenancePage());
            }
            dispatch(this.disableLoading());
        }
    }
    //#endregion

    //#region server
    async reloadServerData(dispatch: Dispatch, getState: () => State) {
        let { token } = getState().persistence;
        let userInfoResponse = await axios.get(paths.getUserInfo, token);
        if(userInfoResponse.data.status === AxiosResponseStatusEnums.success) {
            dispatch(this.reloadUserInfo(userInfoResponse.data.data));
        }
        let accountResponse = await axios.get(paths.getAllAccounts, token);
        if(accountResponse.data.status === AxiosResponseStatusEnums.success) {
            dispatch(this.reloadAccountRecords(accountResponse.data.data));
        }
    }

    async reloadServerAccountRecords(dispatch: Dispatch, token: any) {
        let accountResponse = await axios.get(paths.getAllAccounts, token);
        if(accountResponse.data.status === AxiosResponseStatusEnums.success) {
            dispatch(this.reloadAccountRecords(accountResponse.data.data));
        }
    }

    async reloadServerUserInfo(dispatch: Dispatch, token: any) {
        let userInfoResponse = await axios.get(paths.getUserInfo, token);
        if(userInfoResponse.data.status === AxiosResponseStatusEnums.success) {
            dispatch(this.reloadUserInfo(userInfoResponse.data.data));
        }
    }
    //#endregion

    //#region demo
    reloadDemoData(): ThunkAction {
        return async (dispatch, getState) => {
            console.log(notImplementedMsg);
        }
    }
    //#endregion
}