// @flow

export type Option = {
    text: string,
    value: string | number,
    abbr?: string
};

export type Account = {
    id: string,
    name: string,
    balance: number,
    income: number,
    expense: number
}; 

export type Transaction = {
    id: string,
    docDate: string,
    title: string,
    type: string,
    category: string,
    amount: number,
    account: string,
    detail: Array<{
        id: string,
        description: string,
        amount: number
    }>,
};

export type TransactionState = {
    +titles: Array<Option>,
    +detailTitles: Array<Option>,
    +records: Array<Transaction>,
    +draft: Transaction,
};

export type AccountState = {
    +current: string,
    +records: Array<Account>
};

export type UserState = {
    +username: string,
    +email: string,
    +currency: string,
    +defaultAccount: string
};

export type SearchState = {
    +results: Array<Transaction>
};

export type FilterState = {
    +timeRange: string,
    +dateFrom: string,
    +dateTo: string,
    +incomeCategories: Array<string>,
    +expenseCategories: Array<string>,
};

export type ReportState = {
    +balanceLineChart: {
        labels: Array<string>,
        balanceData: Array<number>
    },
    +inOutLineChart: {
        labels: Array<string>,
        incomeData: Array<number>,
        expenseData: Array<number>
    },
    +incomeCategoryPieChart: {
        labels: Array<string>,
        data: Array<number>
    },
    +expenseCategoryPieChart: {
        labels: Array<string>,
        data: Array<number>
    }
};

export type NotificationState = {
    +type: string,
    +text: string,
    +isVisible: boolean
};

export type LoadingState = {
    +isRehydrated: boolean,
    +isAuthorized: boolean,
    +isLoading: boolean
};

export type OptionState = {
    +types: Array<Option>,
    +timeRanges: Array<Option>,
    +incomeCategories: Array<Option>,
    +expenseCategories: Array<Option>,
    +currencies: Array<Option>
};

export type PersistenceState = {
    +token: any
};

export type DemoState = {
    +cash: {
        records: Array<Transaction>
    },
    +creditcard: {
        records: Array<Transaction>
    }
}

export type State = {
    +transaction: TransactionState,
    +account: AccountState,
    +user: UserState,
    +search: SearchState,
    +filter: FilterState,
    +report: ReportState,
    +notification: NotificationState,
    +loading: LoadingState,
    +option: OptionState,
    +persistence: PersistenceState,
    +demo?: DemoState
};

export type Action = {type: string, payload?: any}

export type Dispatch = (action: Action | ThunkAction) => any;

export type GetState = () => State;

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;