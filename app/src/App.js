import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Router, Switch, Route, Link } from './routing';
import { connect } from 'react-redux';
import { history } from './history';
import { alertActions} from './_actions';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { DatePickers } from './_components/DatePickers';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            checkUser: false,
        }
        /*const { dispatch } = this.props;*/
        history.listen((location, action) => {
            // clear alert on location change
            /*dispatch(alertActions.clear());*/
			alertActions.clear();
        });
    }
  render() {
      /*const { alert } = this.props;*/
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
                    <View style={styles.nav}>
                        <View style={styles.navItem}>
                            <Link to="/" >
                                <Text >Home</Text>
                             </Link>
                        </View>
                        <View style={styles.navItem}>
                            <Link to="/login" >
                                <Text >Login</Text>
                            </Link>
                        </View>
                    </View>
                    <DatePickers />
                    <Switch>
                        <ScrollView style={ styles.contentContainer } >
                            <Route exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                        </ScrollView>
                    </Switch>
                </Router>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        padding: 10,
        width: "100%",
        height: "100%"
    },
    contentContainer: {
		paddingVertical: 20,
		width: "100%",
		height: "100%"
	},
    header: {
        fontSize: 20
    },
    nav: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    navItem: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        backgroundColor: "green"
    },
    subNavItem: {
        padding: 5
    },
    topic: {
        textAlign: "center",
        fontSize: 15
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
