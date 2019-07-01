import React, { Component } from 'react';
import { TextInput, Button, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
/*import { Link } from '../routing';*/

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            /*submitted: false*/
        };
    }

    handleChangeUsername = (value) => {
        this.setState({
            username: value
        });
    }

    handleChangePassword = (value) => {
        this.setState({
            password: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        /*this.setState({ submitted: true });*/
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) { dispatch(userActions.login(username, password));
        }
    }

	render() {
	    const { loggingIn } = this.props;
        const { username, password } = this.state;
	    return (
            <View style={ styles.container }>
                <View>
                <TextInput
                    name="username"
                    type="username"
                    value={username}
                    onChangeText = { this.handleChangeUsername }
                    placeholder = "UserName"
                    style = { styles.placeInput2 }
                ></TextInput>
                <TextInput
                    name="password"
                    type="password"
                    value={password}
                    secureTextEntry={true}
                    onChangeText = { this.handleChangePassword }
                    placeholder = "PassWord"
                    style = { styles.placeInput2 }
                ></TextInput>
                <Button title = 'LogIn'
                    style = { styles.placeButton }
                    onPress = { this.handleSubmit.bind(this) }
                />
                {loggingIn}
            </View>
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

const mapStateToProps = state => {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedHomePage = connect(mapStateToProps)(LoginPage);
export { connectedHomePage as LoginPage };
