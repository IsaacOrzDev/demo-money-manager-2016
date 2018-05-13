// @flow
import React, { Fragment } from 'react';
import { 
    Container,
    Row,
    Column,
    TextBox, 
    DropDownList,
    BlockButton,
    Loader,
    Notification
} from '../common';
import type { Option } from '../../flowTypes';

export type UserFormDataProps = {
    loading: {
        isLoading: boolean
    },
    notification: {
        type: string,
        text: string,
        isVisible: boolean
    },
    currencyOptionList: Array<Option>
}

export type UserFormMethodsProps = {
    redirectToSignIn: () => any,
    redirectToSignUp: () => any,
    signIn: (user: {
        usernameEmail: string,
        password: string
    }) => any,
    signUp: (user: {
        username: string,
        password: string,
        email: string,
        currency: string,
        defaultAccount: string
    }) => any,
    clearNotification: () => any,
}

export type UserFormProps = {
    data: UserFormDataProps,
    methods: UserFormMethodsProps,
    type: string
};

type State = {
    signIn: {
        visible: boolean,
        usernameEmail: string,
        password: string,
        errors: {
            usernameEmail: string,
            password: string,
            fail: string
        }
    },
    signUp: {
        visible: boolean,        
        username: string,
        email: string,
        password: string,
        passwordRepeat: string,
        currency: string,
        defaultAccount: string,
        errors: {
            username: string,
            email: string,
            password: string,
            currency: string,
            defaultAccount: string
        }
    },
};

const signInDefault = {
    usernameEmail: "",
    password: "",
    errors: {
        usernameEmail: "",
        password: "",
        fail: ""
    }
};

const signUpDefault = {
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
    currency: "",
    defaultAccount: "",
    errors: {
        username: "",
        email: "",
        password: "",
        currency: "",
        defaultAccount: ""
    }
};

const signInErrorMsgs = {
    usernameEmailEmpty: "please input your username or email",
    passwordEmpty: "please input your password"
};

const signUpErrorMsgs = {
    usernameEmpty: "Username cannot be empty",
    usernameTaken: "Username is taken",
    passwordEmpty: "Password cannot be empty",
    passwordNotMatch: "Password is not match with Repeat Password",
    passwordNotValid: "",
    emailEmpty: "Email cannot be empty",
    currencyEmpty: "Currency cannot be empty",
    defaultAccountEmpty: "Default Account cannot be empty"
};

class UserForm extends React.Component<UserFormProps, State> {

    constructor(props: UserFormProps) {
        super(props);
        this.state = {
            signIn: {
                ...signInDefault,
                visible: this.props.type === "in"
            },
            signUp: {
                ...signUpDefault,
                visible: this.props.type === "up"
            }
        };
        let component: any = this;
        component.inputSignInUsernameEmail = this.inputSignInUsernameEmail.bind(this);
        component.inputSignInPassword = this.inputSignInPassword.bind(this);
        component.inputSignUpUsername = this.inputSignUpUsername.bind(this);
        component.inputSignUpPassword = this.inputSignUpPassword.bind(this);
        component.inputSignUpPasswordRepeat = this.inputSignUpPasswordRepeat.bind(this);
        component.inputSignUpEmail = this.inputSignUpEmail.bind(this);
        component.selectSignUpCurrency = this.selectSignUpCurrency.bind(this);
        component.inputSignUpDefaultAccount = this.inputSignUpDefaultAccount.bind(this);
        component.signIn = this.signIn.bind(this);
        component.signUp = this.signUp.bind(this);
    }

    inputSignInUsernameEmail(value: string) {
        this.setState({
            signIn: Object.assign({}, this.state.signIn, {usernameEmail: value})
        });
    }

    inputSignInPassword(value: string) {
        this.setState({
            signIn: Object.assign({}, this.state.signIn, {password: value})
        });
    }

    inputSignUpUsername(value: string) {
        this.setState({
            signUp: Object.assign({}, this.state.signUp, {username: value})
        });
    }

    inputSignUpPassword(value: string) {
        this.setState({
            signUp: Object.assign({}, this.state.signUp, {password: value})
        });
    }

    inputSignUpPasswordRepeat(value: string) {
        this.setState({
            signUp: Object.assign({}, this.state.signUp, {passwordRepeat: value})
        });
    }

    inputSignUpEmail(value: string) {
        this.setState({
            signUp: Object.assign({}, this.state.signUp, {email: value})
        });
    }

    selectSignUpCurrency(value: string) {
        this.setState({
            signUp: Object.assign({}, this.state.signUp, {currency: value})
        });
    }

    inputSignUpDefaultAccount(value: string) {
        this.setState({
            signUp: Object.assign({}, this.state.signUp, {defaultAccount: value})
        });
    }

    signIn(e: any) {
        e.preventDefault();
        let { signIn } = this.state;
        let newErrors = { ...signInDefault.errors };
        let pass = true;
        if(!signIn.usernameEmail) {
            newErrors.usernameEmail = signInErrorMsgs.usernameEmailEmpty;
            pass = false;
        }
        if(!signIn.password) {
            newErrors.password = signInErrorMsgs.passwordEmpty;
            pass = false;
        }
        if(pass) {
            this.props.methods.signIn({
                usernameEmail: signIn.usernameEmail,
                password: signIn.password
            });
        }
        this.setState({
            signIn: Object.assign({}, signIn, {errors: newErrors})
        });
    }

    signUp(e: any) {
        e.preventDefault();
        let { signUp } = this.state;
        let newErrors = { ...signUpDefault.errors };
        let pass = true;
        if(!signUp.username) {
            newErrors.username = signUpErrorMsgs.usernameEmpty;
            pass = false;
        }
        if(!signUp.password || !signUp.passwordRepeat) {
            newErrors.password = signUpErrorMsgs.passwordEmpty;
            pass = false;
        } else if (signUp.password !== signUp.passwordRepeat) {
            newErrors.password = signUpErrorMsgs.passwordNotMatch;
            pass = false;
        } else if(false) {
            newErrors.password = signUpErrorMsgs.passwordNotValid;
            pass = false;
        }
        if(!signUp.email) {
            newErrors.email = signUpErrorMsgs.emailEmpty;
            pass = false;
        }
        if(!signUp.currency) {
            newErrors.currency = signUpErrorMsgs.currencyEmpty;
            pass = false;
        }
        if(!signUp.defaultAccount) {
            newErrors.defaultAccount = signUpErrorMsgs.defaultAccountEmpty;
            pass = false;
        }
        if(pass) {
            this.props.methods.signUp({
                username: signUp.username,
                email: signUp.email,
                password: signUp.password,
                currency: signUp.currency,
                defaultAccount: signUp.defaultAccount
            });
        }
        this.setState({
            signUp: Object.assign({}, signUp, {errors: newErrors})
        });
    }

    componentWillReceiveProps(nextProps: UserFormProps) {
        if(this.props.type !== nextProps.type) {
            this.setState({
                signIn: {...signInDefault, visible: nextProps.type === "in"},
                signUp: {...signUpDefault, visible: nextProps.type === "up"}
            });
        }
    }

    render() {
        let { props, state } = this;
        return (
            <Fragment>
                <div className="user-form">
                    <h1 className="user-form_title">Money Manager 101</h1>
                    {props.data.loading.isLoading?
                        <Loader />
                    :
                        <div className="user-form_content">
                            <div className={state.signIn.visible? "sign-in-form sign-in-form--active": "sign-in-form"}>
                                <Container>
                                    <Row>
                                        <Column sizes={[6, 6, 6, 6]}>
                                            <TextBox description="Username or Email" 
                                                placeHolder="Username or Email"
                                                type="text"
                                                editable={true}
                                                value={state.signIn.usernameEmail}
                                                error={state.signIn.errors.usernameEmail}
                                                changeEvent={this.inputSignInUsernameEmail} />                                
                                        </Column>
                                    </Row>
                                    <Row>
                                        <Column sizes={[6, 6, 6, 6]}>
                                            <TextBox description="Password" 
                                                placeHolder="password"
                                                type="password"
                                                editable={true}
                                                value={state.signIn.password}
                                                error={state.signIn.errors.password}
                                                changeEvent={this.inputSignInPassword} />                                
                                        </Column>
                                    </Row>
                                    <Row>
                                        <Column sizes={[6, 6, 6, 6]}>
                                            <BlockButton icon="log-in" color="green" text="SIGN IN" clickEvent={this.signIn} />
                                        </Column>
                                    </Row> 
                                </Container>
                                <p className="user-form_hint">Not a member? <a onClick={props.methods.redirectToSignUp}>Create one</a></p>    
                            </div>
                            <div className={state.signUp.visible? "sign-up-form sign-up-form--active": "sign-up-form"}>
                                <Container>
                                    <Row>
                                        <Column sizes={[6, 6, 6, 6]}>
                                            <TextBox description="Username" 
                                                placeHolder="Username"
                                                type="text"
                                                editable={true}
                                                value={state.signUp.username}
                                                error={state.signUp.errors.username}
                                                changeEvent={this.inputSignUpUsername} />                                
                                        </Column>
                                    </Row>
                                    <Row>
                                        <Column sizes={[6, 6, 6, 6]}>
                                            <TextBox description="Password" 
                                                placeHolder="Password"
                                                type="password"
                                                editable={true}
                                                value={state.signUp.password}
                                                error={state.signUp.errors.password}
                                                changeEvent={this.inputSignUpPassword} />                                
                                        </Column>
                                    </Row>
                                    <Row>
                                        <Column sizes={[6, 6, 6, 6]}>
                                            <TextBox description="Confirm Password" 
                                                placeHolder="Confirm Password"
                                                type="password"
                                                editable={true}
                                                value={state.signUp.passwordRepeat}
                                                error={state.signUp.errors.password}
                                                changeEvent={this.inputSignUpPasswordRepeat} />                                
                                        </Column>
                                    </Row>
                                    <Row>
                                        <Column sizes={[6, 6, 6, 6]}>
                                            <TextBox description="Email" 
                                                placeHolder="Email"
                                                type="text"
                                                editable={true}
                                                value={state.signUp.email}
                                                error={state.signUp.errors.email}
                                                changeEvent={this.inputSignUpEmail} />                                
                                        </Column>
                                    </Row>
                                    <Row>
                                        <Column sizes={[6, 6, 6, 6]}>
                                            <DropDownList description="Currency"
                                                placeHolder="Currency"
                                                editable={true}
                                                optionList={props.data.currencyOptionList}
                                                selected={state.signUp.currency}
                                                error={state.signUp.errors.currency}
                                                selectEvent={this.selectSignUpCurrency} />
                                        </Column>
                                    </Row>
                                    <Row>
                                        <Column sizes={[6, 6, 6, 6]}>
                                            <TextBox description="Default Account"
                                                placeHolder="Default Account"
                                                type="text"
                                                editable={true}
                                                value={state.signUp.defaultAccount}
                                                error={state.signUp.errors.defaultAccount}
                                                changeEvent={this.inputSignUpDefaultAccount} />
                                        </Column>
                                    </Row>                                                                  
                                    <Row>
                                        <Column sizes={[6, 6, 6, 6]}>
                                            <BlockButton icon="log-in" color="green" text="SIGN UP" clickEvent={this.signUp} />
                                        </Column>
                                    </Row>
                                </Container>                        
                                <p className="user-form_hint">Already member? <a onClick={props.methods.redirectToSignIn}>Sign in</a></p>
                            </div>                                             
                        </div>                    
                    }
                </div>
                <Notification {...props.data.notification} clickEvent={props.methods.clearNotification} />
            </Fragment>
        )
    }
}

export default UserForm;
