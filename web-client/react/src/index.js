import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { RunningModeEnums } from './enums';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
if(process.env.REACT_APP_MODE === RunningModeEnums.production)
    registerServiceWorker();