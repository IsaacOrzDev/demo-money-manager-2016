// @flow
import { combineReducers } from 'redux';
import { RunningModeEnums } from '../enums';
import transactionReducer from './reducers/transactionReducer';
import accountReducer from './reducers/accountReducer';
import userReducer from './reducers/userReducer';
import searchReducer from './reducers/searchReducer';
import filterReducer from './reducers/filterReducer';
import reportReducer from './reducers/reportReducer';
import notificationReducer from './reducers/notificationReducer';
import loadingReducer from './reducers/loadingReducer';
import optionReducer from './reducers/optionReducer';
import persistenceReducer from './reducers/persistenceReducer';
import demoReducer from './reducers/demoReducer';



const rootReducer = process.env.REACT_APP_MODE === RunningModeEnums.demo?
    combineReducers({
        transaction: transactionReducer,
        account: accountReducer,
        user: userReducer,
        search: searchReducer,
        filter: filterReducer,
        report: reportReducer,
        notification: notificationReducer,
        loading: loadingReducer,
        option: optionReducer,
        demo: demoReducer
    })
:
    combineReducers({
        transaction: transactionReducer,
        account: accountReducer,
        user: userReducer,
        search: searchReducer,
        filter: filterReducer,
        report: reportReducer,
        notification: notificationReducer,
        loading: loadingReducer,
        option: optionReducer,
        persistence: persistenceReducer
    });

export default rootReducer;