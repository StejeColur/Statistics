import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from '../routing';
/*import {AsyncStorage} from 'react-native';*/
import { connect } from 'react-redux';
import { history } from '../history';
import { userActions } from '../_actions';

class HomePage extends React.Component {

    componentDidMount() {
        /*this.props.dispatch(userActions.getAll());*/
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    logOut() {
        this.props.dispatch(userActions.logout())
    }

	render() {
	const { user, users } = this.props;
	return (
        <View style={ styles.container }>
            <Text>Så jeg sku inde: {user.username}!!!</Text>
            <TouchableOpacity onPress={() => this.logOut()} >
                <Link to="/login">
                    <Text>LogOut</Text>
                </Link>
            </TouchableOpacity>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%'
  },
  listContainer: {
    width: '100%'
  }
});

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
