import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { tools } from './tools.reducer';
import { dates } from './date.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
    tools,
    dates,
    alert
});

export default rootReducer;
