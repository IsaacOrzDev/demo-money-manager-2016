// @flow
import React, { Fragment } from 'react';
import { Container, Row, Column, Header, Loader, Notification, Empty } from '../common';
import { SearchBox, RecordList } from '../partials';
import type { Option, Transaction } from '../../flowTypes';

export type SearchDataProps = {
    transactionTitles: Array<Option>,
    searchResults: Array<Transaction>,
    typeOptionList: Array<Option>,
    userCurrency: string,
    notification: {
        type: string,
        text: string,
        isVisible: boolean
    },
    isLoading: boolean
};

export type SearchMethodsProps = {
    searchRecords: (keyword: string) => any,
    redirectToPreviousPage: () => any,
    replaceAsSearchPageWithKeyword: (keyword: string) => any,
    redirectToExistingTransaction: (id: string) => any,
    changeCurrentAccount: (accountId: string) => any,
    clearSearchResults: () => any,
    clearNotification: () => any,
}

export type SearchProps = {
    data: SearchDataProps,
    methods: SearchMethodsProps,
    accountId: string,
    keyword: string
};

type State = {
    keyword: string
};

class Search extends React.Component<SearchProps, State> {
    
    constructor(props: SearchProps) {
        super(props);
        this.state = {
            keyword: ""
        };
        let component: any = this;
        component.inputKeyword = this.inputKeyword.bind(this);
        component.search = this.search.bind(this);
    }

    inputKeyword(value: string) {
        this.setState({
            keyword: value
        });
    }

    search() {
        this.props.methods.replaceAsSearchPageWithKeyword(this.state.keyword);
    }

    componentWillMount() {
        if(this.props.accountId) {
            this.props.methods.changeCurrentAccount(this.props.accountId);
        }
        if(this.props.keyword) {
            this.props.methods.searchRecords(this.props.keyword);
            this.setState({
                keyword: this.props.keyword
            });
        } else {
            this.props.methods.clearSearchResults();
        }
    }

    componentWillReceiveProps(nextProps: SearchProps) {
        if(this.props.accountId !== nextProps.accountId) {
            this.props.methods.changeCurrentAccount(nextProps.accountId);
        }
        if(this.props.keyword !== nextProps.keyword) {
            if(nextProps.keyword) {
                this.props.methods.searchRecords(nextProps.keyword);
                this.setState({
                    keyword: nextProps.keyword
                });   
            } else {
                this.props.methods.clearSearchResults();
                this.setState({
                    keyword: ""
                });   
            }
        }
    }

    render() {
        let { props, state } = this;
        return (
            <Fragment>
                <Header 
                    title="Search" 
                    currency={props.data.userCurrency}
                    goBackEvent={props.methods.redirectToPreviousPage} />
                <SearchBox 
                    placeholder="Type keyword of title"
                    value={state.keyword}
                    changeEvent={this.inputKeyword}
                    searchEvent={this.search} />
                {props.data.isLoading?
                    <Loader />
                :
                    <Container page="page-search">
                        {props.keyword && props.data.searchResults.length === 0 &&
                            <Empty />
                        }
                        {props.data.searchResults.length > 0 &&
                            <Row>
                                <Column sizes={[6, 6, 6, 6]}>
                                <RecordList 
                                    titles={props.data.transactionTitles} 
                                    records={props.data.searchResults}
                                    typeOptionList={props.data.typeOptionList}
                                    selectEvent={id => props.methods.redirectToExistingTransaction(id)} />                                
                                </Column>
                            </Row>
                        }
                    </Container>
                }
                <Notification {...props.data.notification} clickEvent={props.methods.clearNotification} />
            </Fragment>
        );
    }
}

export default Search;