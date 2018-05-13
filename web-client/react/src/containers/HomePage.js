// @flow
import React from 'react';
import { connect } from 'react-redux';
import Home from '../components/pages/Home';
import actions from '../store/actions';
import { defaultAccount } from '../defaultObjects';
import type { State } from '../flowTypes';
import type { HomeProps, HomeDataProps, HomeMethodsProps } from '../components/pages/Home';

type MapStateToProps = {
    data: HomeDataProps
};

type MapDispatchToProps = {
    methods: HomeMethodsProps
};

const HomePage = (props: HomeProps) => (
    <Home {...props} />
);

const mapStateToProps = (state: State) => {
    let currentAccount = state.account.records.find(x => x.id === state.account.current);
    const map: MapStateToProps = {
        data: {
            transactionTitles: state.transaction.titles,
            transactionRecords: state.transaction.records,
            currentAccount: currentAccount? currentAccount : defaultAccount,
            typeOptionList: state.option.types,
            report: { 
                ...state.report
            },
            notification: {
                ...state.notification
            },
            loading: {
                ...state.loading
            },
            header: {
                user: { ...state.user },
                filter: {
                    ...state.filter,
                    timeRangeOptions: state.option.timeRanges,
                    incomeCategoryOptions: state.option.incomeCategories,
                    expenseCategoryOptions: state.option.expenseCategories
                },
                accountRecords: state.account.records,
            }
        }
    };
    return map;
};

const mapDispatchToProps = dispatch => ({
    methods: {
        redirectToNewIncome: () => dispatch(actions.redirectToNewIncome()),
        redirectToNewExpense: () => dispatch(actions.redirectToNewExpense()),
        redirectToExistingTransaction: id => dispatch(actions.redirectToExistingTransaction(id)),
        applyDefaultFilterParameters: () => dispatch(actions.applyFilterParameters()),
        changeCurrentAccount: accountId => dispatch(actions.changeCurrentAccount(accountId)),
        redirectToHomePageDefaultAccount: () => dispatch(actions.redirectToHomePageDefaultAccount()),
        clearNotification: () => dispatch(actions.clearNotification()),
        redirectToSearchPage: () => dispatch(actions.redirectToSearchPage()),
        header: {
            applyFilterParameters: parameters => dispatch(actions.applyFilterParameters(parameters)),            
            redirectToHomePageWithAccountId: accountId => dispatch(actions.redirectToHomePageWithAccountId(accountId)),
            redirectToHomePageReportSection: () => dispatch(actions.redirectToHomePageReportSection()),
            redirectToHomePageTransactionSection: () => dispatch(actions.redirectToHomePageTransactionSection()),
            createNewAccount: draft => dispatch(actions.createNewAccount(draft)),
            signOut: () => dispatch(actions.signOut())
        }
    }
}: MapDispatchToProps);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);