import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import { confStore } from './_helpers';

import { App } from './App';

import './index.css';

const store = confStore();
ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
