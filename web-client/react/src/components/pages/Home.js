// @flow
import React, { Fragment } from 'react';
import {
    Container,
    Row,
    Column,
    Visible,
    Card,
    NumberTitle,
    Notification,
    Loader,
    Empty
} from '../common';
import { HomeHeader, RecordList, BalanceReport, FloatingButton } from '../partials';
import { LineChart, PieChart, BarChart} from '../charts';
import { Fade } from '../animations';
import type { Option, Transaction, Account } from '../../flowTypes';

export type HomeDataProps = {
    transactionTitles: Array<Option>,
    transactionRecords: Array<Transaction>,
    currentAccount: Account,
    typeOptionList: Array<Option>,
    report: {
        balanceLineChart: {
            labels: Array<string>,
            balanceData: Array<number>
        },
        inOutLineChart: {
            labels: Array<string>,
            incomeData: Array<number>,
            expenseData: Array<number>
        },
        incomeCategoryPieChart: {
            labels: Array<string>,
            data: Array<number>
        },
        expenseCategoryPieChart: {
            labels: Array<string>,
            data: Array<number>
        }
    },
    notification: {
        type: string,
        text: string,
        isVisible: boolean
    },
    loading: {
        isLoading: boolean
    },
    header: {
        filter: {
            timeRange: string,
            dateFrom: string,
            dateTo: string,
            incomeCategories: Array<string>,
            expenseCategories: Array<string>,
            timeRangeOptions: Array<Option>,
            incomeCategoryOptions: Array<Option>,
            expenseCategoryOptions: Array<Option>
        },
        user: {
            username: string,
            email: string,
            currency: string
        },
        accountRecords: Array<Account>,
    }
};

export type HomeMethodsProps = {
    redirectToNewIncome: () => any,
    redirectToNewExpense: () => any,
    redirectToExistingTransaction: (id: string) => any,
    applyDefaultFilterParameters: () => any,
    changeCurrentAccount: (accountId: string) => any,
    redirectToHomePageDefaultAccount: () => any,
    clearNotification: () => any,
    redirectToSearchPage: () => any,
    header: {
        applyFilterParameters: (parameters: {
            timeRange: string,
            dateFrom: string,
            dateTo: string,
            incomeCategories: Array<string>,
            expenseCategories: Array<string>
        }) => any,
        redirectToHomePageWithAccountId: (accountId: string) => any,
        redirectToHomePageReportSection: () => any,
        redirectToHomePageTransactionSection: () => any,
        createNewAccount: (draft: {name: string}) => any,
        signOut: () => any
    }
};

export type HomeProps = {
    data: HomeDataProps;
    methods: HomeMethodsProps,
    accountId: string,
    mode: string,
    isDemo: boolean
};

type State = {
    isReportsActive: boolean,
    isTransactionsActive: boolean
}

class Home extends React.Component<HomeProps, State> {

    constructor(props: HomeProps) {
        super(props);
        this.state = {
            isReportsActive: this.props.mode === "1",
            isTransactionsActive: this.props.mode === "2"
        };
        const component: any = this;
        component.renderReports = this.renderReports.bind(this);
        component.renderTransactions = this.renderTransactions.bind(this);
    }

    componentWillMount() {
        if(this.props.accountId) {
            this.props.methods.changeCurrentAccount(this.props.accountId);
            this.props.methods.applyDefaultFilterParameters();
        } else {
            this.props.methods.redirectToHomePageDefaultAccount();
        }
    }

    componentWillReceiveProps(nextProps: HomeProps) {
        if(this.props.accountId !== nextProps.accountId) {
            this.props.methods.changeCurrentAccount(nextProps.accountId);
            this.props.methods.applyDefaultFilterParameters();
        }
        if(this.props.mode !== nextProps.mode) {
            this.setState({
                isReportsActive: nextProps.mode === "1",
                isTransactionsActive: nextProps.mode === "2"                
            });
        }
    }

    renderReports() {
        let { data } = this.props;
        let balanceLineChartDatasets = [{
            data: data.report.balanceLineChart.balanceData,
            label: "balance",
            borderColor: "#ffb366"
        }];

        let inOutLineChartDatasets = [
            {
                data: data.report.inOutLineChart.incomeData,
                label: "income",
                borderColor: "#0066ff",
            },{
                data: data.report.inOutLineChart.expenseData,
                label: "expense",
                borderColor: "#ff0000",
            }
        ];

        if(data.transactionRecords.length === 0) {
            return <Empty />
        } else {
            return (
                <Fragment>
                    <Visible sizes={[1, 1, 0, 0]}>
                        <Row>
                            <Column sizes={[6, 6, 6, 6]}>
                                <Card>
                                    <BalanceReport
                                        balance={data.currentAccount.balance}
                                        income={data.currentAccount.income}
                                        expense={data.currentAccount.expense}
                                        currency={data.header.user.currency} />                                
                                </Card>
                            </Column>
                        </Row>                    
                    </Visible>
                    <Visible sizes={[0, 0, 1, 1]}>
                        <Row>
                            <Column sizes={[6, 2, 2, 2]}>
                                <Card title="Total Balance">
                                    <NumberTitle currency={data.header.user.currency}>
                                        {data.currentAccount.balance}
                                    </NumberTitle>
                                </Card>
                            </Column>
                            <Column sizes={[6, 2, 2, 2]}>
                                <Card title="Total Income">
                                    <NumberTitle currency={data.header.user.currency}>
                                        {data.currentAccount.income}
                                    </NumberTitle>
                                </Card>
                            </Column>
                            <Column sizes={[6, 2, 2, 2]}>
                                <Card title="Total Expenses">
                                    <NumberTitle currency={data.header.user.currency}>
                                        {data.currentAccount.expense}
                                    </NumberTitle>
                                </Card>
                            </Column>
                        </Row>                    
                    </Visible>
                    <Row>
                        <Column sizes={[6, 6, 3, 3]}>
                            <Card title="Balance">
                                <LineChart 
                                    labels={data.report.balanceLineChart.labels}
                                    datasets={balanceLineChartDatasets} />
                            </Card>
                        </Column>
                        <Column sizes={[6, 6, 3, 3]}>
                            <Card title="Income and Expense">
                                <LineChart 
                                    labels={data.report.inOutLineChart.labels}
                                    datasets={inOutLineChartDatasets} />
                            </Card>
                        </Column>
                    </Row>
                    <Row>
                        <Column sizes={[6, 6, 3, 3]}>
                            <Card title="Income Categories">
                                <BarChart {...data.report.incomeCategoryPieChart} />
                            </Card>
                        </Column>
                        <Column sizes={[6, 6, 3, 3]}>
                            <Card title="Expense Categories">
                                <PieChart {...data.report.expenseCategoryPieChart} />
                            </Card>
                        </Column>
                    </Row>
                </Fragment>  
            );
        }
    }

    renderTransactions() {
        if(this.props.data.transactionRecords.length === 0) {
            return <Empty />
        } else {
            return (
                <Fragment>
                    <Row>
                        <Column sizes={[6, 6, 6, 6]}>
                        <RecordList 
                            titles={this.props.data.transactionTitles} 
                            records={this.props.data.transactionRecords}
                            typeOptionList={this.props.data.typeOptionList}
                            selectEvent={id => this.props.methods.redirectToExistingTransaction(id)} />                        
                        </Column>
                    </Row>
                </Fragment>
            );            
        }
    }
    
    render() {
        let { props, state } = this;
        return (
            <Fragment>
                <HomeHeader 
                    {...props.data.header} 
                    {...props.methods.header}
                    currentAccount={props.data.currentAccount}
                    isReportsActive={state.isReportsActive}
                    isTransactionsActive={state.isTransactionsActive}
                    isLoading={props.data.loading.isLoading}
                    isDemo={props.isDemo}
                    redirectToNewIncome={props.methods.redirectToNewIncome}
                    redirectToNewExpense={props.methods.redirectToNewExpense}
                    redirectToSearchPage={props.methods.redirectToSearchPage} />
                {props.data.loading.isLoading?
                    <Loader />
                :
                    <Container page="page-home">
                        <Fade in={state.isReportsActive}>
                            <div>
                                {state.isReportsActive && this.renderReports()}
                            </div>
                        </Fade>
                        <Fade in={state.isTransactionsActive}>
                            <div>
                                {state.isTransactionsActive && this.renderTransactions()}
                            </div>
                        </Fade>     
                    </Container>
                }
                {!props.data.loading.isLoading &&
                    <Visible sizes={[1, 0, 0, 0]}>
                        <FloatingButton
                            redirectToNewIncome={props.methods.redirectToNewIncome}
                            redirectToNewExpense={props.methods.redirectToNewExpense}
                            redirectToSearchPage={props.methods.redirectToSearchPage} />
                    </Visible>
                }
                <Notification {...props.data.notification} clickEvent={props.methods.clearNotification} />
            </Fragment>
        )
    }
}

export default Home;
