import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Router, Switch, Route, Redirect } from './routing';
import { connect } from 'react-redux';
import { PrivateRoute } from './_components';
import { history } from './history';
import { alertActions} from './_actions';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import {AsyncStorage} from 'react-native';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            checkUser: false,
        }
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            /*dispatch(alertActions.clear());*/
			/*alertActions.clear();*/
        });
    }
    render() {
        const { alert } = this.props;
        const { user } = this.props;
		console.log("TYPE_OF: " + typeof user);
		let authCheck = false;
		if(typeof user != 'undefined'){
			if(user.username){
				authCheck = true;
			}
			console.log("USER_ " + user.username + " CHECK_: " + authCheck );
		}
        console.log(" CHECK_: " + authCheck );
        return (
            <View style={styles.container}>
                <Router history={history}>
                    <Switch>
                        <View>
                            <Route path="/login" component={LoginPage} />
                            <PrivateRoute exact path="/" component={HomePage} authed={authCheck} />
                        </View>
                    </Switch>
                </Router>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 50
  }
});

function mapStateToProps(state) {
    const { alert, authentication } = state;
    const { user } = authentication;

    return {
        alert,
		user
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
