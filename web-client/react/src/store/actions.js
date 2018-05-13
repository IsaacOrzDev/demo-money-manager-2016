// @flow
import { RunningModeEnums } from '../enums';
import axiosActions from './actions/axiosActions';
import demoActions from './actions/demoActions';

export default process.env.REACT_APP_MODE === RunningModeEnums.demo? new demoActions() : new axiosActions();