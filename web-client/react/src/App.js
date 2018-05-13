// @flow
import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { RunningModeEnums } from './enums';
import { queryStringToObject } from './componentFunctions';
import PrivateRoute from './containers/PrivateRoute';
import HomePage from './containers/HomePage';
import TransactionFormPage from './containers/TransactionFormPage';
import SearchPage from './containers/SearchPage';
import UserFormPage from './containers/UserFormPage';
import MaintenancePage from './components/pages/Maintenance';
import './styles/css/Main.css';

class App extends React.Component<{}> {

    render() {
        return (
            <div className="app" 
                autoComplete="off" 
                autoCorrect="off" 
                autoCapitalize="off" 
                spellCheck="false"
                onContextMenu={e => e.preventDefault()}>
                {process.env.REACT_APP_MODE === RunningModeEnums.demo?
                    <Router>
                        <Switch>
                            <Redirect exact from="/" to="/home/" />
                            <Route exact path="/home/" component={HomePage} />
                            <Route exact path="/home/:accountId" render={routeProps => 
                                <HomePage 
                                    {...routeProps.match.params} 
                                    {...queryStringToObject(routeProps.location.search)}
                                    isDemo={true} />
                            } />
                            <Route exact path="/transaction/:transactionId" render={routeProps => 
                                <TransactionFormPage {...routeProps.match.params} />
                            } />
                            <Route exact path="/transaction/" render={routeProps => 
                                <TransactionFormPage {...queryStringToObject(routeProps.location.search)} />
                            } />
                            <Route exact path="/search/:accountId" render={routeProps =>
                                <SearchPage
                                    {...routeProps.match.params} 
                                    {...queryStringToObject(routeProps.location.search)} />
                            } />
                            <Route path="*" render={() => <p>You shall not pass !</p>} />
                        </Switch>                        
                    </Router>
                :
                    <div>
                        <Router>
                            <Switch>
                                <Redirect exact from="/" to="/home/" />
                                <Route exact path="/signin" render={() => 
                                    <UserFormPage type="in" />
                                } />
                                <Route exact path="/signup" render={() => 
                                    <UserFormPage type="up" />
                                } />
                                <Route exact path="/maintenance" component={MaintenancePage} />
                                <PrivateRoute exact path="/home/" component={HomePage} />
                                <PrivateRoute exact path="/home/:accountId" render={routeProps => 
                                    <HomePage 
                                        {...routeProps.match.params} 
                                        {...queryStringToObject(routeProps.location.search)}
                                        isDemo={false} />
                                } />
                                <PrivateRoute exact path="/transaction/:transactionId" render={routeProps => 
                                    <TransactionFormPage {...routeProps.match.params} />
                                } />
                                <PrivateRoute exact path="/transaction/" render={routeProps => 
                                    <TransactionFormPage {...queryStringToObject(routeProps.location.search)} />
                                } />
                                <PrivateRoute exact path="/search/:accountId" render={routeProps =>
                                    <SearchPage
                                        {...routeProps.match.params} 
                                        {...queryStringToObject(routeProps.location.search)} />
                                } />
                                <Route path="*" render={() => <p>You shall not pass !</p>} />
                            </Switch>
                        </Router>
                    </div>
                }
            </div>
        )
    }
}

export default App;