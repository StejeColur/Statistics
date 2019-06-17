import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from '../routing';
/*import {AsyncStorage} from 'react-native';*/
import { connect } from 'react-redux';
import { history } from '../history';
import { userActions } from '../_actions';
import { VictoryBar, VictoryChart, VictoryTheme } from '../victory';

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

class HomePage extends React.Component {

    componentDidMount() {

    }

	render() {
	const { user, users } = this.props;
	return (
        <View style={ styles.container }>
            <Text>Så jeg sku inde!!!</Text>
            <VictoryChart width={350} theme={VictoryTheme.material}>
                <VictoryBar data={data} x="quarter" y="earnings" />
            </VictoryChart>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  },
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
