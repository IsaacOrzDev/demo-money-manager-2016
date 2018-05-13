// @flow
import React from 'react';
import UserForm from '../components/pages/UserForm';
import { connect } from 'react-redux';
import actions from '../store/actions';
import type { State } from '../flowTypes';
import type { UserFormProps, UserFormDataProps, UserFormMethodsProps } from '../components/pages/UserForm';

type MapStateToProps = {
    data: UserFormDataProps
};

type MapDispatchToProps = {
    methods: UserFormMethodsProps
};

const UserFormPage = (props: UserFormProps) => (
    <UserForm {...props} />
);

const mapStateToProps = (state: State) => ({
    data: {
        loading: {
            ...state.loading
        },
        notification: {
            ...state.notification
        },
        currencyOptionList: state.option.currencies
    }
}: MapStateToProps);

const mapDispatchToProps = dispatch => ({
    methods: {
        redirectToSignIn: () => dispatch(actions.redirectToSignIn()),
        redirectToSignUp: () => dispatch(actions.redirectToSignUp()),
        signIn: user => dispatch(actions.signIn(user)),
        signUp: user => dispatch(actions.signUp(user)),
        clearNotification: () => dispatch(actions.clearNotification()),
    }
}: MapDispatchToProps);

export default connect(mapStateToProps, mapDispatchToProps)(UserFormPage);


