import React from 'react';
import { Route, Redirect } from '../routing';

export const PrivateRoute = ({ component: Component, authed, ...rest }) => (
    <Route {...rest} render={props => (
        /*localStorage.getItem('user')*/
        authed
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
