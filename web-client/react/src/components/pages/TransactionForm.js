// @flow
import React, { Fragment } from 'react';
import moment from 'moment';
import { 
    Container, 
    Row, 
    Column, 
    LineBreak,
    TextBox, 
    DropDownList, 
    BlockButton,
    DatePicker,
    Checkbox,
    TableEditableContainer as TableContainer,
    TableEditableRow as TableRow,
    TableTextBox,
    Header,
    Loader,
    Notification
} from '../common';
import { TransactionTypeEnums } from '../../enums';
import { defaultTransactionDetailRow } from '../../defaultObjects';
import { getCurrencySymbol } from '../../componentFunctions';
import type { Option, Transaction } from '../../flowTypes';

export type TransactionFormDataProps = {
    form: Transaction,
    typeOptionList: Array<Option>,
    incomeCategoryOptionList: Array<Option>,
    expenseCategoryOptionList: Array<Option>,
    accountOptionList: Array<Option>,
    detailTitles: Array<Option>,
    userCurrency: string,
    notification: {
        type: string,
        text: string,
        isVisible: boolean
    },
    loading: {
        isLoading: boolean
    }            
};

export type TransactionFormMethodsProps = {
    save: (draft: Transaction) => any,
    redirectToPreviousPage: () => any,
    loadTransaction: (id: string) => any,
    setupNewIncome: (accountId: string) => any,
    setupNewExpense: (accountId: string) => any,
    clearNotification: () => any,
};

export type TransactionFormProps = {
    data: TransactionFormDataProps,
    methods: TransactionFormMethodsProps,
    type?: string,
    account?: string,
    transactionId?: string
};

type State = {
    isSplit: boolean,
    form: Transaction,
    errors: {
        docDate: string,
        title: string,
        category: string,
        amount: string,
        detail: Array<{
            description: string,
            amount: string
        }>
    }
}

const errorMsgs = {
    titleEmpty: "Title cannot be empty",
    amountEmpty: "Amount cannot be empty",
    amountZero: "Amount cannot be zero",
    docDateEmpty: "Date cannot be empty",
    docDateInvalid: "Date cannot be invalid format",
    categoryEmpty: "Category cannot be empty",
    descriptionEmpty: "Description cannot be empty"
};

const defaultErrors = {
    docDate: "",
    title: "",
    category: "",
    amount: "" 
};

const defaultDetailErrors = {
    description: "", amount: ""
};

class TransitionForm extends React.Component<TransactionFormProps, State> {

    constructor(props: TransactionFormProps) {
        super(props);
        this.state = {
            isSplit: this.props.data.form.detail.length > 0,
            form: this.props.data.form,
            errors: {
                ...defaultErrors,
                detail: this.props.data.form.detail.map(x => ({...defaultDetailErrors}))
            }
        };
        let component: any = this;
        component.toggleSplitting = this.toggleSplitting.bind(this);
        component.isNew = this.isNew.bind(this);
        component.getCategoryOptionList = this.getCategoryOptionList.bind(this);
        component.pickDate = this.pickDate.bind(this);
        component.inputTitle = this.inputTitle.bind(this);
        component.selectCategory = this.selectCategory.bind(this);
        component.inputAmount = this.inputAmount.bind(this);
        component.addDetailRow = this.addDetailRow.bind(this);
        component.deleteDetailRow = this.deleteDetailRow.bind(this);
        component.inputDetailDescription = this.inputDetailDescription.bind(this);
        component.inputDetailAmount = this.inputDetailAmount.bind(this);
        component.save = this.save.bind(this);
        component.renderHeader = this.renderHeader.bind(this);
    }

    toggleSplitting() {
        if(!this.state.isSplit && this.state.form.detail.length === 0) {
            this.setState({
                isSplit: true,
                form: Object.assign({}, this.state.form, {amount: 0})
            });
            this.addDetailRow();
        }
        if(this.state.isSplit && this.state.form.detail.length > 0) {
            this.setState({
                isSplit: false,
                form: Object.assign({}, this.state.form, {detail: []})
            });
        }
    }

    isNew() {
        return this.props.data.form.id === "";
    }

    getCategoryOptionList() {
        let { form, incomeCategoryOptionList, expenseCategoryOptionList } = this.props.data;
        return form.type === TransactionTypeEnums.income? incomeCategoryOptionList : expenseCategoryOptionList;
    }

    pickDate(value: string) {
        this.setState({
            form: Object.assign({}, this.state.form, {docDate: value})
        });
    }
    
    inputTitle(value: string) {
        this.setState({
            form: Object.assign({}, this.state.form, {title: value})
        });
    }

    selectCategory(value: string) {
        this.setState({
            form: Object.assign({}, this.state.form, {category: value})
        });
    }

    inputAmount(value: number) {
        this.setState({
            form: Object.assign({}, this.state.form, {amount: value})
        });
    }

    addDetailRow() {
        this.setState({
            form: Object.assign({}, this.state.form, {
                detail: [
                    ...this.state.form.detail,
                    defaultTransactionDetailRow
                ]
            }),
            errors: Object.assign({}, this.state.errors, {
                detail: [
                    ...this.state.errors.detail,
                    {description: "", amount: ""}
                ]
            })
        });
    }

    deleteDetailRow(index: number) {
        let detail = [
            ...this.state.form.detail.slice(0, index),
            ...this.state.form.detail.slice(index + 1)
        ];
        let detailErrors = [
            ...this.state.errors.detail.slice(0, index),
            ...this.state.errors.detail.slice(index + 1)
        ];
        this.setState({
            form: Object.assign({}, this.state.form, { detail }),
            errors: Object.assign({}, this.state.errors, {detail: detailErrors})
        });
    }

    inputDetailDescription(index: number, value: string) {
        let detail = [
            ...this.state.form.detail.slice(0, index),
            Object.assign({}, this.state.form.detail[index], {description: value}),
            ...this.state.form.detail.slice(index + 1)
        ];
        this.setState({
            form: Object.assign({}, this.state.form, { detail })
        });
    }

    inputDetailAmount(index: number, value: number) {
        let detail = [
            ...this.state.form.detail.slice(0, index),
            Object.assign({}, this.state.form.detail[index], {amount: value}),
            ...this.state.form.detail.slice(index + 1)
        ];
        this.setState({
            form: Object.assign({}, this.state.form, { detail })
        });
    }

    dummy() {

    }

    save(e: any) {
        e.preventDefault();
        let { form, errors } = this.state;
        let newErrors = {
            ...defaultErrors,
            detail: errors.detail.map(x => ({...defaultDetailErrors}))
        };
        let pass = true;
        if(!form.docDate) {
            newErrors.docDate = errorMsgs.docDateEmpty;
            pass = false;
        }
        if(!form.title) {
            newErrors.title = errorMsgs.titleEmpty;
            pass = false;
        }
        if(!form.category) {
            newErrors.category = errorMsgs.categoryEmpty;
            pass = false;
        }
        if(form.detail.length === 0) {
            if(form.amount === 0) {
                newErrors.amount = errorMsgs.amountZero;
                pass = false;
            } else if(!form.amount) {
                newErrors.amount = errorMsgs.amountEmpty;
                pass = false;
            }            
        } else {
            for(let i = 0; i < form.detail.length; i++) {
                if(!form.detail[i].description) {
                    newErrors.detail[i].description = errorMsgs.descriptionEmpty;
                    pass = false;
                }
                if(form.detail[i].amount === 0) {
                    newErrors.detail[i].amount = errorMsgs.amountZero;
                    pass = false;
                } else if(!form.detail[i].amount) {
                    newErrors.detail[i].amount = errorMsgs.amountEmpty;
                    pass = false;
                }             
            }  
        }
        if(pass) {
            if(form.detail.length > 0) {
                form.amount = form.detail.reduce((total, row) => { return total + parseFloat(row.amount)}, 0);
            }
            this.props.methods.save(form);
        } else {
            this.setState({errors: newErrors});
        }
    }

    componentWillMount() {
        if(this.props.transactionId) {
            this.props.methods.loadTransaction(this.props.transactionId);
        } else if(this.props.account && this.props.type) {
            if(this.props.type === TransactionTypeEnums.income) {
                this.props.methods.setupNewIncome(this.props.account);
            } else {
                this.props.methods.setupNewExpense(this.props.account);
            }
        }
    }

    componentWillReceiveProps(nextProps: TransactionFormProps) {
        if(this.props.data.form !== nextProps.data.form) {
            this.setState({
                form: nextProps.data.form,
                isSplit: nextProps.data.form.detail.length > 0,
                errors: {
                    ...defaultErrors,
                    detail: nextProps.data.form.detail.map(x => ({...defaultDetailErrors}))
                }
            });
        }
    }

    componentDidUpdate() {
        if(this.state.form.detail.length === 0 && this.state.isSplit) {
            this.setState({
                isSplit: false
            });
        }
    }

    renderHeader() {
        let { form, userCurrency } = this.props.data, { redirectToPreviousPage } = this.props.methods, title = "";
        switch(form.type) {
            case TransactionTypeEnums.income:
                if(this.isNew())
                    title = "New Income Entry";
                else
                    title = `Income: ${form.title}`
                break;
            case TransactionTypeEnums.expense:
                if(this.isNew())
                    title = "New Expense Entry";
                else
                    title = `Expense: ${form.title}`
                break;
            default:
                break;
        }
        return (
            <Header 
                title={title} 
                currency={userCurrency} 
                goBackEvent={redirectToPreviousPage} />
        );
    }

    render() {
        const { props, state } = this;
        let totalAmount = state.form.detail.reduce((total, row) => { 
            return total + (isNaN(row.amount) || row.amount === ""? 0 : parseFloat(row.amount))
        }, 0);
        let titles = props.data.detailTitles.map(x => {
            if(x.value === "amount")
                return Object.assign({}, x, {text: `Amount (${getCurrencySymbol(props.data.userCurrency)})`})
            else
                return x
        });
        return (
            <Fragment>
                {this.renderHeader()}
                {props.data.loading.isLoading?
                    <Loader />
                :
                    <Container page="page-transaction-form">
                        <Row>
                            <Column sizes={[6, 6, 6, 6]}>
                                <Checkbox description="Summary" value={state.isSplit} changeEvent={this.toggleSplitting} />
                            </Column>
                        </Row>
                        <Row>
                            <Column sizes={[6, 3, 3, 3]}>
                                <DropDownList description="Account"
                                    placeHolder="Account"
                                    editable={false}
                                    optionList={props.data.accountOptionList}
                                    selected={state.form.account}
                                    selectEvent={this.dummy} />
                            </Column>                        
                            <Column sizes={[6, 3, 3, 3]}>
                                <DropDownList description="Type"
                                    placeHolder="Type"
                                    editable={false}
                                    optionList={props.data.typeOptionList}
                                    selected={state.form.type}
                                    selectEvent={this.dummy} />     
                            </Column>
                        </Row>                    
                        <Row>
                            <Column sizes={[6, 3, 3, 3]}>
                                <DatePicker description="Date" 
                                    placeHolder="Date" 
                                    editable={true}
                                    value={state.form.docDate}
                                    error={state.errors.docDate}
                                    dateBefore={moment(new Date())}
                                    pickEvent={this.pickDate} />
                            </Column>
                            <Column sizes={[6, 3, 3, 3]}>
                                <TextBox description="Title" 
                                    placeHolder="Title"
                                    type="text"
                                    editable={true}
                                    value={state.form.title}
                                    error={state.errors.title}
                                    changeEvent={this.inputTitle} />                    
                            </Column>
                        </Row>

                        <Row>
                            <Column sizes={[6, 3, 3, 3]}>
                                <DropDownList description="Category" 
                                    placeHolder="Category"
                                    editable={true}
                                    optionList={this.getCategoryOptionList()}
                                    selected={state.form.category}
                                    error={state.errors.category}
                                    selectEvent={this.selectCategory} />
                            </Column>
                            <Column sizes={[6, 3, 3, 3]}>
                                {state.isSplit? 
                                    <TextBox description={`Total Amount (${getCurrencySymbol(props.data.userCurrency)})`}
                                        placeHolder={`Total Amount (${getCurrencySymbol(props.data.userCurrency)})`}
                                        type="number"
                                        editable={false}
                                        value={totalAmount}
                                        changeEvent={this.dummy} />
                                :
                                    <TextBox description={`Amount (${getCurrencySymbol(props.data.userCurrency)})`}
                                        placeHolder={`Amount (${getCurrencySymbol(props.data.userCurrency)})`}
                                        type="number"
                                        editable={true}
                                        value={state.form.amount}
                                        error={state.errors.amount}
                                        changeEvent={this.inputAmount} /> 
                                }                           
                            </Column>
                        </Row>                    
                        {state.isSplit && state.form.detail.length !== 0 &&
                            <Row>
                                <Column sizes={[6, 6, 6, 6]}>
                                    <TableContainer 
                                        titles={titles} 
                                        editable={true}
                                        addRowEvent={this.addDetailRow} >
                                        {state.form.detail.map((r, i) => 
                                            <TableRow 
                                                key={i}
                                                row={i}
                                                deleteEvent={this.deleteDetailRow}>
                                                <TableTextBox
                                                    row={i}
                                                    type="text" 
                                                    value={r.description}
                                                    error={state.errors.detail[i].description}
                                                    changeEvent={this.inputDetailDescription} />
                                                <TableTextBox 
                                                    row={i}
                                                    type="number" 
                                                    value={r.amount.toString()}
                                                    error={state.errors.detail[i].amount}
                                                    changeEvent={(row, value) => this.inputDetailAmount(row, parseFloat(value))} />
                                            </TableRow>                                 
                                        )}                                  
                                    </TableContainer>                            
                                </Column>
                            </Row>
                        }                    
                        <LineBreak size={'l'} />
                        <Row>
                            <Column sizes={[0, 1, 1, 1]}>
                                &nbsp;
                            </Column>
                            <Column sizes={[6, 4, 4, 4]}>
                                <BlockButton text={this.isNew()? "Create" : "Save"} color="green" icon="checkmark" clickEvent={this.save} />
                            </Column>
                            <Column sizes={[0, 1, 1, 1]}>
                                &nbsp;
                            </Column>
                        </Row>
                    </Container>                    
                }
                <Notification {...props.data.notification} clickEvent={props.methods.clearNotification} />
            </Fragment>            
        );
    }
}

export default TransitionForm;