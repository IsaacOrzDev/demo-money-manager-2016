// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import thunk from 'redux-thunk';
import { asyncSessionStorage } from 'redux-persist/storages';
import CookieStorage from 'redux-persist-cookie-storage';
import reducer from './reducers';
import actions from './actions';
import { RunningModeEnums } from '../enums';

const composeEnhancers = process.env.NODE_ENV === RunningModeEnums.development ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk), autoRehydrate()));

if(process.env.REACT_APP_MODE === RunningModeEnums.demo) {

    store.dispatch(actions.reloadDemoData());

} else if(process.env.REACT_APP_MODE === RunningModeEnums.development) {

    persistStore(store, {whitelist: ["persistence", "filter"], storage: asyncSessionStorage}, 
    ()=> {
        store.dispatch(actions.completePersistStore());
    });

} else if(process.env.REACT_APP_MODE === RunningModeEnums.production) {

    persistStore(store, {whitelist: ["persistence", "filter"], storage: new CookieStorage({
        expiration: {
            'default': 30 * 86400 // Cookies expire after one month 
        }    
    })}, 
    ()=> {
        store.dispatch(actions.completePersistStore());
    });
    
}

export default store;