// @flow
import React from 'react';
import moment from 'moment';
import {
    IonIcon,
    FloatItem,
    FloatGroup,
    DropDownButton,
    BlockButton,
    LineBreak,
    AppTitle,
    IconButton,
    ButtonGroup,
    ButtonGroupItem,
    Tabs,
    TabItem,
    Visible,
    Container,
    Row,
    Column,
    DropDownList,
    MultiDropDownList,
    DatePicker,
    TextBox,
    Accordion,
    AccordionExpandPart
} from '../common';
import { BalanceReport } from '../partials';
import { Fade } from '../animations';
import { TimeRangeEnums } from '../../enums';
import type { Option, Account } from '../../flowTypes';

type Props = {
    isReportsActive: boolean,
    isTransactionsActive: boolean,
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
    currentAccount: Account,
    accountRecords: Array<Account>,
    isLoading: boolean,
    isDemo: boolean,
    redirectToNewIncome: () => any,
    redirectToNewExpense: () => any,
    redirectToSearchPage: () => any,
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
};

type State = {
    isHeaderFixed: boolean,
    isUserProfileActive: boolean,
    isAddMenuActive: boolean,
    isAccountMenuActive: boolean,
    isOptionsMenuActive: boolean,
    filter: {
        timeRange: string,
        dateFrom: string,
        dateTo: string,
        incomeCategories: Array<string>,
        expenseCategories: Array<string>,
    },
    errors: {
        timeRange: string,
        dateFrom: string,
        dateTo: string
    },
    accountForm: {
        name: string,
        nameError: string
    }
};

const errorMsgs = {
    timeRangeEmpty: "Time-range cannot be empty",
    dateEmpty: "Date cannot be empty",
};

const defaultErrors = {
    timeRange: "",
    dateFrom: "",
    dateTo: ""
};

const errors = {
    nameEmpty: "Name cannot be empty"
};

const defaultAccountForm = {
    name: "",
    nameError: ""
};

class HomeHeader extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isHeaderFixed: false,
            isUserProfileActive: false,
            isAddMenuActive: false,
            isAccountMenuActive: false,
            isOptionsMenuActive: false,
            filter: this.props.filter,
            errors: defaultErrors,
            accountForm: defaultAccountForm
        };
        const component: any = this;
        component.toggleAddMenu = this.toggleAddMenu.bind(this);
        component.closeAddMenu = this.closeAddMenu.bind(this);
        component.toggleUserProfile = this.toggleUserProfile.bind(this);
        component.toggleAccountMenu = this.toggleAccountMenu.bind(this);
        component.showOptionsMenu = this.showOptionsMenu.bind(this);
        component.closeOptionsMenu = this.closeOptionsMenu.bind(this);
        component.createNewIncome = this.createNewIncome.bind(this);
        component.createNewWithdraw = this.createNewWithdraw.bind(this);
        component.selectTimeRange = this.selectTimeRange.bind(this);
        component.pickDateFrom = this.pickDateFrom.bind(this);
        component.pickDateTo = this.pickDateTo.bind(this);
        component.confirmIncomeCategories = this.confirmIncomeCategories.bind(this);
        component.confirmExpenseCategories = this.confirmExpenseCategories.bind(this);
        component.applyFilterParameters = this.applyFilterParameters.bind(this);
        component.switchAccount = this.switchAccount.bind(this);
        component.inputNewAccountName = this.inputNewAccountName.bind(this);
        component.saveNewAccount = this.saveNewAccount.bind(this);
        component.renderMenu = this.renderMenu.bind(this);
        component.renderNavigationBarContent = this.renderNavigationBarContent.bind(this);
        component.renderNavigationBarExtension = this.renderNavigationBarExtension.bind(this);
    }

    toggleAddMenu(e: any) {
        if(!this.state.isAddMenuActive && this.state.isUserProfileActive) {
            this.setState({
                isAddMenuActive: !this.state.isAddMenuActive,
                isUserProfileActive: false
            });
        } else {
            this.setState({
                isAddMenuActive: !this.state.isAddMenuActive
            });
        }
    }

    closeAddMenu(e: any) {
        this.setState({
            isAddMenuActive: false
        });
    }

    toggleUserProfile(e: any) {
        if(!this.state.isUserProfileActive && this.state.isAddMenuActive) {
            this.setState({
                isUserProfileActive: !this.state.isUserProfileActive,
                isAddMenuActive: false
            });
        } else {
            this.setState({
                isUserProfileActive: !this.state.isUserProfileActive
            });
        }
    }

    toggleAccountMenu(e: any) {
        if(!this.state.isAccountMenuActive) {
            this.setState({
                isAccountMenuActive: true,
                isUserProfileActive: false,
                isAddMenuActive: false,
                isOptionsMenuActive: false,
            });
        } else {
            this.setState({
                isAccountMenuActive: false,
            });
        }
    }

    showOptionsMenu(e: any) {
        let { timeRange, dateFrom, dateTo, incomeCategories, expenseCategories  } = this.props.filter;
        this.setState({
            isOptionsMenuActive: true,
            isUserProfileActive: false,
            isAddMenuActive: false,
            isAccountMenuActive: false,
            filter: {
                timeRange,
                dateFrom,
                dateTo,
                incomeCategories,
                expenseCategories
            }
        });
    }
    
    closeOptionsMenu(e: any) {
        this.setState({
            isOptionsMenuActive: false,
        });
    }

    selectTimeRange(value: string) {
        this.setState({
            filter: Object.assign({}, this.state.filter, {
                timeRange: value
            })
        });
    }

    pickDateFrom(value: string) {
        this.setState({
            filter: Object.assign({}, this.state.filter, {
                dateFrom: value
            })
        });
    }

    pickDateTo(value: string) {
        this.setState({
            filter: Object.assign({}, this.state.filter, {
                dateTo: value
            })
        });
    }

    confirmIncomeCategories(values: Array<string>) {
        this.setState({
            filter: Object.assign({}, this.state.filter, {
                incomeCategories: values
            })
        });
    }

    confirmExpenseCategories(values: Array<string>) {
        this.setState({
            filter: Object.assign({}, this.state.filter, {
                expenseCategories: values
            })
        });
    }

    applyFilterParameters(e: any) {
        e.preventDefault();
        let { filter } = this.state;
        let newErrors = { ...defaultErrors };
        let pass = true;
        if(!filter.timeRange) {
            newErrors.timeRange = errorMsgs.timeRangeEmpty;
            pass = false;
        }
        if(filter.timeRange === TimeRangeEnums.custom && !filter.dateFrom) {
            newErrors.dateFrom = errorMsgs.dateEmpty;
            pass = false;
        }
        if(filter.timeRange === TimeRangeEnums.custom && !filter.dateTo) {
            newErrors.dateTo = errorMsgs.dateEmpty;
            pass = false;
        }
        if(pass) {
            this.props.applyFilterParameters(this.state.filter);
            this.closeOptionsMenu();
        }
        this.setState({
            errors: newErrors
        });
    }

    switchAccount(e: any, accountId: string) {
        e.preventDefault();
        this.props.redirectToHomePageWithAccountId(accountId);
        this.setState({
            isAccountMenuActive: false
        });
    }

    createNewIncome(e: any) {
        e.preventDefault();
        this.props.redirectToNewIncome();
    }

    createNewWithdraw(e: any) {
        e.preventDefault();
        this.props.redirectToNewExpense();
    }

    inputNewAccountName(value: string) {
        this.setState({
            accountForm: Object.assign({}, this.state.accountForm, {name: value})
        });
    }

    saveNewAccount() {
        if(!this.state.accountForm.name) {
            this.setState({
                accountForm: Object.assign({}, this.state.accountForm, {nameError: errors.nameEmpty})
            });
        } else {
            this.props.createNewAccount({
                name: this.state.accountForm.name
            });
            this.setState({
                accountForm: Object.assign({}, defaultAccountForm),
                isAccountMenuActive: false
            });
        }
    }

    componentDidMount() {
        window.onscroll = () => {
            if(window.scrollY !== 0 && !this.state.isHeaderFixed) {
                this.setState({
                    isHeaderFixed: true
                });
            } else if(window.scrollY === 0 && this.state.isHeaderFixed) {
                this.setState({
                    isHeaderFixed: false
                });          
            }
        }
    }

    componentWillUnmount() {
        window.onscroll = () => {}
    }

    renderMenu() {
        let titles = this.props.accountRecords.map(x => ({text: x.name }));
        if(!this.props.isDemo)
            titles.push({icon: "plus-circled", text: "New"});
        return (
            <div className="header-home_menu">
                    <IconButton icon="close" clickEvent={this.toggleAccountMenu} />
                    <div className="user-content">
                        <div className="user-icon">
                            <span>{this.props.user.username[0]}</span>
                        </div>
                        <span className="user-name">{this.props.user.username}</span>
                        <span className="user-email">{this.props.user.email}</span>
                    </div>
                    <LineBreak size="s" />
                    <h3>Accounts</h3>
                    <LineBreak size="s" />
                    {this.props.isDemo?
                        <Accordion titles={titles}>
                            {this.props.accountRecords.map(x => 
                                <AccordionExpandPart key={x.id} isExpandable={true}>
                                    <BalanceReport
                                        balance={x.balance}
                                        income={x.income}
                                        expense={x.expense}
                                        currency={this.props.user.currency} />
                                        {this.props.currentAccount.id !== x.id &&
                                            <BlockButton text="Switch" color="green" icon="chevron-right" clickEvent={e => this.switchAccount(e, x.id)} />  
                                        }                
                                </AccordionExpandPart>
                            )}
                        </Accordion> 
                    :
                        <Accordion titles={titles}>
                            {this.props.accountRecords.map(x => 
                                <AccordionExpandPart key={x.id} isExpandable={true}>
                                    <BalanceReport
                                        balance={x.balance}
                                        income={x.income}
                                        expense={x.expense}
                                        currency={this.props.user.currency} />
                                        {this.props.currentAccount.id !== x.id &&
                                            <BlockButton text="Switch" color="green" icon="chevron-right" clickEvent={e => this.switchAccount(e, x.id)} />  
                                        }                           
                                </AccordionExpandPart>
                            )}
                            <AccordionExpandPart isExpandable={true}>
                                <Container>
                                    <TextBox description="Name"
                                        placeHolder="Name"
                                        type="text"
                                        editable={true}
                                        value={this.state.accountForm.name}
                                        error={this.state.accountForm.nameError}
                                        changeEvent={this.inputNewAccountName} />
                                    <BlockButton text="Create" color="green" icon="plus-round" clickEvent={this.saveNewAccount} />                              
                                </Container>
                            </AccordionExpandPart>
                        </Accordion>                                           
                    }
                    <LineBreak size="l" />                    
                    {!this.props.isDemo &&
                        <div className="log-out">
                            <a className="log-out_button" onClick={this.props.signOut}><IonIcon code="log-out" /> Sign out</a>
                        </div>
                    }
            </div>
        )
    }    

    renderNavigationBarContent() {
        return (
            <div className="nav_content">
                <Visible sizes={[1, 0, 0, 0]}>
                    <h2 className="nav_title-mob">{this.props.currentAccount.name}</h2>                    
                </Visible>
                <Visible sizes={[0, 1, 1, 1]}>
                    <FloatItem direction="left">
                        <h2 className="nav_title">{this.props.currentAccount.name}</h2>
                    </FloatItem>                    
                </Visible>

                <FloatItem direction="right">
                    {!this.props.isLoading &&
                        <FloatGroup direction="left">
                            <Fade in={!this.state.isOptionsMenuActive}>
                                <div className="nav_control">
                                    <IconButton icon="android-options" clickEvent={this.showOptionsMenu} />
                                </div>
                            </Fade>
                            <Visible sizes={[0, 1, 1, 1]}>
                            <div className="nav_control nav_control-search">
                                <IconButton icon="search" clickEvent={this.props.redirectToSearchPage} />
                            </div>                        
                            </Visible>                     

                            <Visible sizes={[0, 1, 1, 1]}>
                                <div className="nav_control nav_control-add">
                                    <Fade in={!this.state.isAddMenuActive}>
                                        <IconButton icon="plus-round" clickEvent={this.toggleAddMenu} />                                    
                                    </Fade>
                                    <div className={this.state.isAddMenuActive? "add-menu add-menu--active" : "add-menu"}
                                        tabIndex="-1" onClick={this.closeAddMenu}>
                                        <DropDownButton 
                                            in={this.state.isAddMenuActive}
                                            cssClass="menu-item--1"
                                            text="New Income Entry"
                                            icon="plus-circled"
                                            clickEvent={this.createNewIncome}/>
                                        <DropDownButton 
                                            in={this.state.isAddMenuActive}
                                            cssClass="menu-item--2"
                                            text="New Expense Entry"
                                            icon="minus-circled"
                                            clickEvent={this.createNewWithdraw}/>                                            
                                    </div>
                                </div>                        
                            </Visible>
                        </FloatGroup>                    
                    }
                </FloatItem>
                {!this.props.isLoading &&
                    <Visible sizes={[0, 1, 1, 1]}>
                        <div className="nav_content_center">
                            <ButtonGroup>
                                <ButtonGroupItem text="Reports" isActive={this.props.isReportsActive} clickEvent={this.props.redirectToHomePageReportSection}  />
                                <ButtonGroupItem text="Transactions" isActive={this.props.isTransactionsActive} clickEvent={this.props.redirectToHomePageTransactionSection} />
                            </ButtonGroup>   
                        </div>
                    </Visible>                       
                }
        
            </div>
        );            
    }

    renderNavigationBarExtension() {
        let dateFromDateBefore = this.state.filter.dateTo? moment(this.state.filter.dateTo) : moment(new Date());
        let dateToDateAfter = this.state.filter.dateFrom? moment(this.state.filter.dateFrom) : null;
        let dateToDateBefore = moment(new Date());
        let dateFromDefaultDate = moment(new Date()).startOf('month');

        return (
            <div className={this.state.isOptionsMenuActive? "nav_extension nav_extension--active" : "nav_extension"}>
                <FloatItem direction="right">
                    <IconButton icon="close" clickEvent={this.closeOptionsMenu} />
                </FloatItem>
                <Container>
                    <Row>
                        <Column sizes={[6, 3, 3, 3]}>
                            <DropDownList description="Time Range"
                                    placeHolder="Time Range"
                                    editable={true}
                                    optionList={this.props.filter.timeRangeOptions}
                                    selected={this.state.filter.timeRange}
                                    error={this.state.errors.timeRange}
                                    selectEvent={this.selectTimeRange} />
                        </Column>
                    </Row>
                    {this.state.filter.timeRange === "c" &&
                        <Row>
                            <Column sizes={[6, 3, 3, 3]}>
                                <DatePicker description="Date (From)"
                                        placeHolder="Date (From)" 
                                        editable={true}
                                        value={this.state.filter.dateFrom}
                                        error={this.state.errors.dateFrom}
                                        defaultDate={dateFromDefaultDate}
                                        dateBefore={dateFromDateBefore}
                                        pickEvent={this.pickDateFrom} />
                            </Column>
                            <Column sizes={[6, 3, 3, 3]}>
                                <DatePicker description="Date (To)"
                                    placeHolder="Date (To)" 
                                    editable={true}
                                    value={this.state.filter.dateTo}
                                    error={this.state.errors.dateTo}
                                    dateAfter={dateToDateAfter}
                                    dateBefore={dateToDateBefore}
                                    pickEvent={this.pickDateTo} />
                            </Column>
                        </Row>
                    }
                    <Row>
                        <Column sizes={[6, 3, 3, 3]}>
                            <MultiDropDownList description="Income Categories"
                                placeHolder="Income Categories"
                                editable={true}
                                optionList={this.props.filter.incomeCategoryOptions}
                                selected={this.state.filter.incomeCategories}
                                confirmEvent={this.confirmIncomeCategories} />
                        </Column>
                        <Column sizes={[6, 3, 3, 3]}>
                            <MultiDropDownList description="Expense Categories"
                                    placeHolder="Expense Categories"
                                    editable={true}
                                    optionList={this.props.filter.expenseCategoryOptions}
                                    selected={this.state.filter.expenseCategories}
                                    confirmEvent={this.confirmExpenseCategories} />
                        </Column>
                    </Row>
                    <LineBreak size="s" />
                    <Row>
                        <Column sizes={[0, 1, 1, 1]}>&nbsp;</Column>
                        <Column sizes={[6, 4, 4, 4]}>
                            <BlockButton text="Apply" color="green" icon="checkmark-round" clickEvent={this.applyFilterParameters} />
                        </Column>
                        <Column sizes={[0, 1, 1, 1]}>&nbsp;</Column>
                    </Row>
                </Container>
            </div>
        );
    }

    render() {
        return (
            <header className={this.state.isHeaderFixed? "header-home header-home--fixed" : "header-home"}>
                <Visible sizes={[0, 1, 1, 1]}>
                    <AppTitle isVisible={!this.state.isHeaderFixed} />                    
                </Visible>
                <button className={this.state.isAccountMenuActive? "header-home_toggle header-home_toggle--active" : "header-home_toggle"} onClick={this.toggleAccountMenu}>
                    {!this.props.isLoading &&
                        <IonIcon code="navicon-round" />
                    }
                </button>
                {this.renderMenu()}
                <div className="header-home_menu_cover"></div>
                <div className="header-home_nav">
                    <div className="nav">
                        {this.renderNavigationBarContent()}
                        {this.renderNavigationBarExtension()}
                    </div>
                </div>
                {!this.props.isLoading &&
                    <Visible sizes={[1, 0, 0, 0]}>
                        <div className="header-home_tabs">
                            <Tabs>
                                <TabItem text="Reports" isChecked={this.props.isReportsActive} clickEvent={this.props.redirectToHomePageReportSection} />
                                <TabItem text="Transactions" isChecked={this.props.isTransactionsActive} clickEvent={this.props.redirectToHomePageTransactionSection} />
                            </Tabs>
                        </div>                    
                    </Visible>
                }

                <div className="header-home_placeholder"></div>
                <LineBreak size="s" />
            </header>
        );
    }
}

export { HomeHeader };