// @flow
import moment from 'moment';
import { TransactionTypeEnums, IncomeCategoryEnums, ExpenseCategoryEnums, CurrencySymbolEnums } from './enums';
import type { Transaction } from './flowTypes';

export const isFocusInCurrentTarget = ({ relatedTarget, currentTarget }: any) => {
    if (relatedTarget === null) return false;
    let node = relatedTarget.parentNode;
    while (node !== null) {
        if (node === currentTarget) return true;
        node = node.parentNode;
    }
    return false;
};

export const checkIsOnlyNumber = (charCode: number) => {
    let condition = (charCode >= 48 && charCode <= 57) || charCode === 46;
    return !condition;
};

export const checkIsEnterKey = (charCode: number) => {
    return charCode === 13;
};

export const queryStringToObject = (query: string) => {
    if(query) {
        query = query.slice(1);
        return JSON.parse(
            '{"' + query.replace(/&/g, '","').replace(/=/g,'":"') + '"}', 
            (key, value) => { 
                return key === ""? value : decodeURIComponent(value) 
            }
        );
    } else {
        return {};
    }
};

export function capitalizeString(input: string) {
    return input.charAt(0).toUpperCase() + input.substring(1);
};

export const getCurrencySymbol = (currency: string) => {
    return CurrencySymbolEnums[currency];
};

export const convertToMoneyFormatString = (input: number, currency: string) => {
    let inputStr = (input / 1).toFixed(2);
    return `${getCurrencySymbol(currency)} ${inputStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const momentToString = (date: moment.Moment) => {
    return date.format(process.env.REACT_APP_DATE_FORMAT);
}

export const filterTransactionRecordByTimeRange = (startDate: moment.Moment, endDate: moment.Moment, records: Array<Transaction>) => {
    return records.filter(x => moment(x.docDate) >= startDate && moment(x.docDate) <= endDate);
};

export const calculateBalance = (
    startDate: moment.Moment,
    endDate: moment.Moment,
    records: Array<Transaction>
) => {
    let filterRecords = filterTransactionRecordByTimeRange(startDate, endDate, records); 
    let income = filterRecords.filter(x => x.type === TransactionTypeEnums.income).reduce((total: number, record: Transaction) => {return total + parseFloat(record.amount)}, 0);
    let expense = filterRecords.filter(x => x.type === TransactionTypeEnums.expense).reduce((total: number, record: Transaction) => {return total + parseFloat(record.amount)}, 0);
    let balance = income - expense;
    return {
        income,
        expense,
        balance
    };
};

export const calculateAmountByCategories = (
    type: $Keys<typeof TransactionTypeEnums>,
    category: $Keys<typeof IncomeCategoryEnums | typeof ExpenseCategoryEnums>,
    records: Array<Transaction>
) => {
    return records.filter(x => x.type === type && x.category === category).reduce((sum, record) => { return sum + parseFloat(record.amount) }, 0);
}

export const generateMonthReportData = (
    minimumLabelsCount: number,
    startDate: moment.Moment, 
    endDate: moment.Moment, 
    records: Array<Transaction>
) => {
    let dayLabels = [], balanceData = [], incomeData = [], expenseData = [];
    let peroid = Math.ceil(endDate.diff(startDate, "days") / (minimumLabelsCount - 1));
    for(let d = moment(startDate); d < moment(endDate).startOf('day'); d.add(peroid, "days"))
    {
        dayLabels.push(`${d.date()}-${d.format('MMM')}`);
        let result = calculateBalance(startDate, d, records);
        balanceData.push(result.balance);
        incomeData.push(result.income);
        expenseData.push(result.expense);
    }
    dayLabels.push(`${endDate.date()}-${endDate.format('MMM')}`);
    let { balance, income, expense } = calculateBalance(startDate, endDate, records);
    balanceData.push(balance);
    incomeData.push(income);
    expenseData.push(expense);
    return {
        dayLabels,
        balanceData,
        incomeData,
        expenseData
    };
};

export const generateYearReportData = (
    minimumLabelsCount: number,
    today: moment.Moment,
    records: Array<Transaction>
) => {
    let startDate = moment(today).startOf('year'), endDate = moment(today).endOf('year');
    let dayLabels = [], balanceData = [], incomeData = [], expenseData = [];
    let peroid = Math.ceil(endDate.diff(startDate, "months") / (minimumLabelsCount - 1));
    for(let m = moment(startDate); m <= moment(endDate).startOf('day'); m.add(peroid, "months"))
    {
        dayLabels.push(m.format('MMM'));
        let result = calculateBalance(startDate, m, records);
        balanceData.push(result.balance);
        incomeData.push(result.income);
        expenseData.push(result.expense);
    }
    dayLabels.push(`${endDate.format('MMM')}`);
    let { balance, income, expense } = calculateBalance(startDate, endDate, records);
    balanceData.push(balance);
    incomeData.push(income);
    expenseData.push(expense);
    return {
        dayLabels,
        balanceData,
        incomeData,
        expenseData
    };
};