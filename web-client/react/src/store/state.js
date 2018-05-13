// @flow
export default {
    transaction: {
        titles: [
            {text: "Title", value: "title"},
            {text: "Date", value: "docDate"},
            {text: "Type", value: "type"},
            {text: "Category", value: "category"},
            {text: "Amount", value: "amount"},
        ],
        detailTitles: [
            {text: "Description", value: "description"},
            {text: "Amount", value: "amount"},
        ],
        records: [],
        draft: {
            id: "",
            docDate: "",
            title: "",
            type: "",
            account: "",
            category: "",
            amount: 0,
            detail: []
        }
    },
    account: {
        current: "",
        records: []
    },
    user: {
        username: "",
        email: "",
        currency: "",
        defaultAccount: ""
    },
    search: {
        results: []
    },
    filter: {
        timeRange: "3m",
        dateFrom: "",
        dateTo: "",
        incomeCategories: ["salary", "investment", "other"],
        expenseCategories: ["food", "healthcare", "gifts", "clothes", "bill", "fare", "housekeeping", "other"],
    },
    report: {
        balanceLineChart: {
            labels: [],
            balanceData: [],
        },
        inOutLineChart: {
            labels: [],
            incomeData: [],
            expenseData: []
        },
        incomeCategoryPieChart: {
            labels: [],
            data: []
        },
        expenseCategoryPieChart: {
            labels: [],
            data: []
        }
    },
    notification: {
        text: "",
        type: "",
        isVisible: false
    },
    loading: {
        isRehydrated: false,
        isAuthorized: false,
        isLoading: false
    },
    option: {
        incomeCategories: [
            {text: "Salary", value: "salary"},
            {text: "Investment", value: "investment"},
            {text: "Other", value: "other"}
        ],
        expenseCategories: [
            {text: "Food", value: "food"},
            {text: "Healthcare", value: "healthcare"},
            {text: "Gifts", value: "gifts"},
            {text: "Clothes", value: "clothes"},
            {text: "Bill", value: "bill"},
            {text: "Fare", value: "fare"},
            {text: "Housekeeping", value: "housekeeping"},
            {text: "Other", value: "other"},
        ],
        types: [
            { text: "Income", value: "income"},
            { text: "Expense", value: "expense"}
        ],
        timeRanges: [
            {text: "Current Month", value: "m"},
            {text: "Current Year", value: "y"},
            {text: "Last 3 Months", value: "3m"},
            {text: "Last 6 Months", value: "6m"},
            {text: "Custom", value: "c"}
        ],
        currencies: [
            {text: "United States Dollar - USD", value: "usd"},
            {text: "Euro - EUR", value: "eur"},
            {text: "Japanese Yen - JPY", value: "jpy"},
            {text: "New Taiwan Dollar - TWD", value: "twd", abbr: "NT&#36;"},
            {text: "Hong Kong Dollar - HKD", value: "hkd", abbr: "HK&#36;"},
        ]
    },
    persistence: {
        token: null
    }
}