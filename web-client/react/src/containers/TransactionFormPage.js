//@flow
import React from 'react';
import TransactionForm from '../components/pages/TransactionForm';
import { connect } from 'react-redux';
import actions from '../store/actions';
import type { State } from '../flowTypes';
import type { 
    TransactionFormProps, 
    TransactionFormDataProps, 
    TransactionFormMethodsProps 
} from '../components/pages/TransactionForm';

type MapStateToProps = {
    data: TransactionFormDataProps
};

type MapDispatchToProps = {
    methods: TransactionFormMethodsProps
};

const TransactionFormPage = (props: TransactionFormProps) => (
    <TransactionForm {...props} />
);

const mapStateToProps = (state: State) => ({
    data: {
        form: state.transaction.draft,
        typeOptionList: state.option.types,
        incomeCategoryOptionList: state.option.incomeCategories,
        expenseCategoryOptionList: state.option.expenseCategories,
        accountOptionList: state.account.records.map(x => ({text: x.name, value: x.id})),
        detailTitles: state.transaction.detailTitles,
        userCurrency: state.user.currency,
        notification: {
            ...state.notification
        },
        loading: {
            isLoading: state.loading.isLoading
        },
    }
}: MapStateToProps);

const mapDispatchToProps = dispatch  => ({
    methods: {
        save: draft => dispatch(actions.saveTransaction(draft)),
        redirectToPreviousPage: () => dispatch(actions.redirectToPreviousPage()),
        loadTransaction: id => dispatch(actions.loadTransaction(id)),
        setupNewIncome: accountId => dispatch(actions.setupNewIncome(accountId)),
        setupNewExpense: accountId => dispatch(actions.setupNewWithdraw(accountId)),
        clearNotification: () => dispatch(actions.clearNotification()),
    }
}: MapDispatchToProps);

export default connect(mapStateToProps, mapDispatchToProps)(TransactionFormPage);