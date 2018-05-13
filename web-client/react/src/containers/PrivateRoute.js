// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loader } from '../components/common';
import actions from '../store/actions';
import type { State } from '../flowTypes';

type Props = {
    isRehydrated: boolean,
    isAuthorized: boolean,
    checkConnection: () => any,
    resetAuthorizationStatus: () => any
};

class PrivateRoute extends React.Component<Props> {

    componentDidMount() {
        if(this.props.isRehydrated)
            this.props.checkConnection();
    }

    componentWillReceiveProps(nextProps: Props) {
        if(this.props.isRehydrated !== nextProps.isRehydrated && nextProps.isRehydrated) {
            this.props.checkConnection();
        }
    }

    componentWillUnmount() {
        this.props.resetAuthorizationStatus();
    }

    render() {
        let { props } = this;
        if(!props.isAuthorized || !props.isRehydrated){
            return <Loader />;
        } else {
            return <Route {...props} />
        }
    }
}

const mapStateToProps = (state: State) => ({
    isRehydrated: state.loading.isRehydrated,
    isAuthorized: state.loading.isAuthorized
});

const mapDispatchToProps = dispatch => ({
    checkConnection: () => dispatch(actions.checkConnection()),
    resetAuthorizationStatus: () => dispatch(actions.resetAuthorizationStatus())
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);