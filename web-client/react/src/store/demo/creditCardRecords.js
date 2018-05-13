// @flow
import moment from 'moment';
import { momentToString } from '../../componentFunctions';

const today = new Date();

export default [
    {id: "bac093a8-01a6-e1f0-9663-12992c8f1d95", docDate: momentToString(moment(today).subtract(9, "months")), title: "TV", type: "expense", account: "creditcard", category: "other", amount: 3888, detail: []},
    {id: "bac093a8-01a6-e1f0-9663-12992c8f1d96", docDate: momentToString(moment(today).subtract(7, "months")), title: "Body Check", type: "expense", account: "creditcard", category: "healthcare", amount: 2240, detail: []},
    {id: "bac093a8-01a6-e1f0-9663-12992c8f1d97", docDate: momentToString(moment(today).subtract(5, "months")), title: "Jacket", type: "expense", account: "creditcard", category: "clothes", amount: 258, detail: []},
    {id: "bac093a8-01a6-e1f0-9663-12992c8f1d98", docDate: momentToString(moment(today).subtract(2, "months")), title: "Dinner", type: "expense", account: "creditcard", category: "food", amount: 145.8, detail: [{id: "", description: "pizza", amount: 96.7},{id: "", description: "drink", amount: 35.8},{id: "", description: "tips", amount: 13.3}]},
    {id: "bac093a8-01a6-e1f0-9663-12992c8f1d99", docDate: momentToString(moment(today).subtract(1, "months")), title: "Airline Ticket", type: "expense", account: "creditcard", category: "fare", amount: 1830, detail: []},
    {id: "bac093a8-01a6-e1f0-9663-12992c8f1d10", docDate: momentToString(moment(today)), title: "Smart Phone", type: "expense", account: "creditcard", category: "gifts", amount: 8588, detail: []},
];