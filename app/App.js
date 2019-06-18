import React from 'react';
import StatApp from './src/App';
import { Provider } from 'react-redux';

import { confStore } from './src/_helpers';
const store = confStore();

export default class App extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <StatApp />
            </Provider>
        );
    }
}

