// @flow
import moment from 'moment';
import { momentToString } from '../../componentFunctions';

const today = new Date();

export default [
    {id: "bfc093a8-01a6-e1f0-9663-12992c8f1d10", docDate: momentToString(moment(today).subtract(4, "months")), title: "Monthly Salary", type: "income", account: "cash", category: "salary", amount: 28000, detail: []},
    {id: "bfc093a8-01a6-e1f0-9663-12992c8f1d11", docDate: momentToString(moment(today).subtract(4, "months")), title: "Monthly Housekeeping", type: "expense", account: "cash", category: "housekeeping", amount: 12000, detail: []},
    {id: "bfc093a8-01a6-e1f0-9663-12992c8f1d12", docDate: momentToString(moment(today).subtract(4, "months")), title: "Monthly Bill", type: "expense", account: "cash", category: "bill", amount: 2430, detail: []},
    {id: "bac093a8-01a6-e1f0-9663-12992c8f1d98", docDate: momentToString(moment(today).subtract(4, "months")), title: "Dinner", type: "expense", account: "cash", category: "food", amount: 145.8, detail: [{id: "", description: "pizza", amount: 96.7},{id: "", description: "drink", amount: 35.8},{id: "", description: "tips", amount: 13.3}]},
    {id: "bfc093a8-01a6-e1f0-9663-12992c8f1d13", docDate: momentToString(moment(today).subtract(3, "months")), title: "Monthly Salary", type: "income", account: "cash", category: "salary", amount: 32000, detail: []},
    {id: "bfc093a8-01a6-e1f0-9663-12992c8f1d14", docDate: momentToString(moment(today).subtract(3, "months")), title: "Monthly Housekeeping", type: "expense", account: "cash", category: "housekeeping", amount: 12000, detail: []},
    {id: "bfc093a8-01a6-e1f0-9663-12992c8f1d15", docDate: momentToString(moment(today).subtract(3, "months")), title: "Monthly Bill", type: "expense", account: "cash", category: "bill", amount: 2430, detail: []},
    {id: "bac093a8-01a6-e1f0-9663-12992c8f1d99", docDate: momentToString(moment(today).subtract(3, "months")), title: "Dinner", type: "expense", account: "cash", category: "food", amount: 145.8, detail: [{id: "", description: "pizza", amount: 96.7},{id: "", description: "drink", amount: 35.8},{id: "", description: "tips", amount: 13.3}]},
    {id: "bfc093a8-01a6-e1f0-9663-12992c8f1d16", docDate: momentToString(moment(today).subtract(2, "months")), title: "Monthly Salary", type: "income", account: "cash", category: "salary", amount: 32000, detail: []},
    {id: "bfc093a8-01a6-e1f0-9663-12992c8f1d17", docDate: momentToString(moment(today).subtract(2, "months")), title: "Monthly Housekeeping", type: "expense", account: "cash", category: "housekeeping", amount: 12000, detail: []},
    {id: "bfc093a8-01a6-e1f0-9663-12992c8f1d18", docDate: momentToString(moment(today).subtract(2, "months")), title: "Monthly Bill", type: "expense", account: "cash", category: "bill", amount: 2430, detail: []},
    {id: "bac093a8-01a6-e1f0-9663-12992c8f1d00", docDate: momentToString(moment(today).subtract(2, "months")), title: "Dinner", type: "expense", account: "cash", category: "food", amount: 145.8, detail: [{id: "", description: "pizza", amount: 96.7},{id: "", description: "drink", amount: 35.8},{id: "", description: "tips", amount: 13.3}]},
    {id: "bfc093a8-01a6-e1f0-9663-12992c8f1d19", docDate: momentToString(moment(today).subtract(1, "months")), title: "Monthly Salary", type: "income", account: "cash", category: "salary", amount: 32000, detail: []},
    {id: "bfc093a8-01a6-e1f0-9663-12992c8f1d20", docDate: momentToString(moment(today).subtract(1, "months")), title: "Monthly Housekeeping", type: "expense", account: "cash", category: "housekeeping", amount: 12000, detail: []},
    {id: "bac093a8-01a6-e1f0-9663-12992c8f1d01", docDate: momentToString(moment(today).subtract(1, "months")), title: "Dinner", type: "expense", account: "cash", category: "food", amount: 145.8, detail: [{id: "", description: "pizza", amount: 96.7},{id: "", description: "drink", amount: 35.8},{id: "", description: "tips", amount: 13.3}]},
    {id: "bfc093a8-01a6-e1f0-9663-12992c8f1d21", docDate: momentToString(moment(today).subtract(1, "months")), title: "Monthly Bill", type: "expense", account: "cash", category: "bill", amount: 2430, detail: []},
    {id: "bfc093a8-01a6-e1f0-9663-12992c8f1d22", docDate: momentToString(moment(today).subtract(1, "months")), title: "New TV", type: "expense", account: "cash", category: "other", amount: 12500, detail: []},
    {id: "bfc093a8-01a6-e1f0-9663-12992c8f1d23", docDate: momentToString(moment(today)), title: "Monthly Salary", type: "income", account: "cash", category: "salary", amount: 32000, detail: []},
    {id: "bfc093a8-01a6-e1f0-9663-12992c8f1d24", docDate: momentToString(moment(today)), title: "Dividend Income", type: "income", account: "cash", category: "investment", amount: 6000, detail: []},
    {id: "bfc093a8-01a6-e1f0-9663-12992c8f1d25", docDate: momentToString(moment(today)), title: "Selling TV", type: "income", account: "cash", category: "other", amount: 2000, detail: []},
    {id: "bac093a8-01a6-e1f0-9663-12992c8f1d02", docDate: momentToString(moment(today)), title: "Dinner", type: "expense", account: "cash", category: "food", amount: 145.8, detail: [{id: "", description: "pizza", amount: 96.7},{id: "", description: "drink", amount: 35.8},{id: "", description: "tips", amount: 13.3}]},
    {id: "bfc093a8-01a6-e1f0-9663-12992c8f1d26", docDate: momentToString(moment(today)), title: "Suit", type: "expense", account: "cash", category: "clothes", amount: 1250, detail: []},
];