// @flow
import React from 'react';
import Search from '../components/pages/Search';
import { connect } from 'react-redux';
import actions from '../store/actions';
import type { State } from '../flowTypes';
import type { SearchProps, SearchDataProps, SearchMethodsProps } from '../components/pages/Search';

type MapStateToProps = {
    data: SearchDataProps
};

type MapDispatchToProps = {
    methods: SearchMethodsProps
};

const SearchPage = (props: SearchProps) => (
    <Search {...props} />
);

const mapStateToProps = (state: State) => ({
    data: {
        transactionTitles: state.transaction.titles,
        searchResults: state.search.results,
        typeOptionList: state.option.types,
        userCurrency: state.user.currency,
        isLoading: state.loading.isLoading,
        notification: {
            ...state.notification
        },
    }
}: MapStateToProps);

const mapDispatchToProps = dispatch => ({
    methods: {
        searchRecords: keyword => dispatch(actions.searchTransactionRecords(keyword)),
        redirectToPreviousPage: () => dispatch(actions.redirectToPreviousPage()),
        replaceAsSearchPageWithKeyword: keyword => dispatch(actions.replaceAsSearchPageWithKeyword(keyword)),
        redirectToExistingTransaction: id => dispatch(actions.redirectToExistingTransaction(id)),
        changeCurrentAccount: accountId => dispatch(actions.changeCurrentAccount(accountId)),
        clearSearchResults: () => dispatch(actions.clearSearchResults()),
        clearNotification: () => dispatch(actions.clearNotification()),
    }
}: MapDispatchToProps);

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);