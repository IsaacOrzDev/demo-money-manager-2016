// @flow
import cashRecords from './cashRecords';
import creditCardRecords from './creditCardRecords';

export default {
    account: {
        current: "cash",
        records: [
            {id: "cash", name: "Cash", balance: 0, income: 0, expense: 0},
            {id: "creditcard", name: "Credit Card", balance: 0, income: 0, expense: 0}
        ],
    },
    user: {
        username: "Demo",
        email: "moneymanagerdemo@gmail.com",
        currency: "hkd",
        defaultAccount: "cash"
    },
    demo: {
        cash: {
            records: cashRecords
        },
        creditcard: {
            records: creditCardRecords
        }
    }
}