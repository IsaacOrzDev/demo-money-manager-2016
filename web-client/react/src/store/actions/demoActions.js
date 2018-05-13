// @flow
import * as types from '../types';
import moment from 'moment';
import baseActions from './baseActions';
import { interfaceActions } from './interfaceActions';
import { TimeRangeEnums, TransactionTypeEnums, NotificationEnums } from '../../enums';
import { 
    generateMonthReportData, 
    generateYearReportData, 
    calculateAmountByCategories, 
    filterTransactionRecordByTimeRange 
} from '../../componentFunctions';
import notificationMsgs from '../notificationMsgs';
import type { ThunkAction, Transaction } from '../../flowTypes';

//#region private methods
const uuid = () => {
    const s4 = () => { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

const privateActions = {
    reloadDemoData: () => ({
        type: types.RELOAD_DEMO_DATA,
    }),
    saveNewDemoTransaction: (payload: {draft: Transaction, account: string}) => ({ 
        type: types.SAVE_NEW_DEMO_TRANSACTION, 
        payload 
    }),
    saveModifiedDemoTransaction: (payload: {draft: Transaction, index: number, account: string}) => ({
        type: types.SAVE_MODIFIED_DEMO_TRANSACTION,
        payload
    })
};

const notImplementedMsg = "The action is not implemented";

//#region public methods
export default class demoActions extends baseActions implements interfaceActions {

    //#region persist
    completePersistStore(): ThunkAction {
        return async (dispatch, getState) => {
            console.log(notImplementedMsg);
        }
    }
    //#endregion

    //#region user
    signIn(user: {usernameEmail: string, password: string}): ThunkAction {
        return async (dispatch, getState) => {
            console.log(notImplementedMsg);
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
            console.log(notImplementedMsg);
        }
    }

    signOut(): ThunkAction {
        return async (dispatch, getState) => {
            console.log(notImplementedMsg);
        }
    }

    checkConnection(): ThunkAction {
        return async (dispatch, getState) => {
            console.log(notImplementedMsg);
        }
    }
    //#endregion

    //#region transaction
    saveTransaction(draft: Transaction): ThunkAction {
        return async (dispatch, getState) => {
            let { demo, account } = getState();
            if(demo) {
                let records: Array<Transaction>  = demo[account.current].records;
                if(draft.id !== "") {
                    let index = records.findIndex(x => x.id === draft.id);
                    dispatch(privateActions.saveModifiedDemoTransaction({draft, index, account: account.current }));
                } else {
                    draft.id = uuid();
                    dispatch(privateActions.saveNewDemoTransaction({draft, account: account.current}));
                }
                dispatch(this.reloadExistingData());
                dispatch(this.applyFilterParameters());
                dispatch(this.redirectToPreviousPage());
                dispatch(this.showNotification({
                    type: NotificationEnums.success,
                    text: notificationMsgs.successSaveTransaction
                }));
            }
        };
    }

    loadTransaction(id: string): ThunkAction {
        return async (dispatch, getState) => {
            dispatch(this.enableLoading());
            let { demo, account } = getState();
            if(demo) {
                let records = demo[account.current].records;
                let record = records.find(x => x.id === id);
                dispatch(this.selectTransactionRecord(record));
            }
            dispatch(this.disableLoading());
        };
    }
    //#endregion

    //#region account
    createNewAccount(payload: {
        name: string
    }): ThunkAction {
        return async (dispatch, getState) => {
            console.log(notImplementedMsg);
        }
    }
    //#endregion

    //#region search
    searchTransactionRecords(keyword: string): ThunkAction {
        return async (dispatch, getState) => {
            const { account, demo } = getState();
            if(demo) {
                let records = demo[account.current].records;
                let results = records.filter(x => x.title.includes(keyword));
                dispatch(this.loadSearchResults(results))
            }
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
            let { account, demo } = getState();
            if(demo) {
                //#region filter transactions
                let records: Array<Transaction>  = demo[account.current].records;

                //#region filter transaction by categories
                records = records.filter(x => payload && (
                    (x.type === TransactionTypeEnums.income && payload.incomeCategories.indexOf(x.category) !== -1) ||
                    (x.type === TransactionTypeEnums.expense && payload.expenseCategories.indexOf(x.category) !== -1)
                ));
                //#endregion

                //#region filter transactions by time range
                let today: moment.Moment = moment(new Date()), startDate: moment.Moment, endDate: moment.Moment;
                switch(payload.timeRange) {
                    case TimeRangeEnums.currentMonth:
                        startDate = moment(today).startOf('month');
                        endDate = moment(today).endOf('month');
                        records = filterTransactionRecordByTimeRange(startDate, endDate, records);
                        break;
                    case TimeRangeEnums.threeMonths:
                        startDate =  moment(today).subtract(2, 'months').startOf('month');
                        endDate = moment(today).endOf('momth');
                        records = filterTransactionRecordByTimeRange(startDate, endDate, records);
                        break;
                    case TimeRangeEnums.halfOfYear:
                        startDate =  moment(today).subtract(5, 'months').startOf('month');
                        endDate = moment(today).endOf('momth');
                        records = filterTransactionRecordByTimeRange(startDate, endDate, records);
                        break;
                    case TimeRangeEnums.currentYear:
                        startDate =  moment(today).startOf('year');
                        endDate = moment(today).endOf('year');
                        records = filterTransactionRecordByTimeRange(startDate, endDate, records);
                        break;
                    case TimeRangeEnums.custom:
                        startDate =  moment(payload.dateFrom)
                        endDate = moment(payload.dateTo);
                        records = filterTransactionRecordByTimeRange(startDate, endDate, records);
                        break;
                    default:
                        break;
                }
                //#endregion
                
                //#endregion

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
                //#endregion

                dispatch(this.reloadTransactionRecords(records));
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
            }
        }
    }
    //#endregion

    //#region demo
    reloadDemoData(): ThunkAction {
        return async (dispatch, getState) => {
            dispatch(privateActions.reloadDemoData());
            dispatch(this.reloadExistingData());
        }
    }

    reloadExistingData(): ThunkAction {
        return async (dispatch, getState) => {
            const { account, demo } = getState();
            if(demo) {
                account.records.map(a => {
                    let income = demo[a.id].records.filter(x => x.type === TransactionTypeEnums.income).reduce((sum, record) => {return sum + parseFloat(record.amount)}, 0);
                    let expense = demo[a.id].records.filter(x => x.type === TransactionTypeEnums.expense).reduce((sum, record) => {return sum + parseFloat(record.amount)}, 0);
                    let balance = parseFloat(income) - parseFloat(expense);
                    a.income = income;
                    a.expense = expense;
                    a.balance = balance;
                    return 0;
                });
                dispatch(this.reloadAccountRecords(account.records));
            }
        }
    }
    //#endregion
}
//#endregion