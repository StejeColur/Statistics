import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { toolActions } from '../_actions';
import { VictoryBar, VictoryChart, VictoryTheme } from '../victory';
import moment from 'moment'
import { MachineInfo } from '../MachineInfo';

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: moment().format("YYYY-MM-DD HH:mm"),
            endDate: moment().format("YYYY-MM-DD HH:mm"),
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps){
        if(this.props.dates.dates !== nextProps.dates.dates){
            this.setState({
                startDate: moment(nextProps.dates.dates.startDate).format("YYYY-MM-DD HH:mm"),
                endDate: moment(nextProps.dates.dates.endDate).format("YYYY-MM-DD HH:mm"),
            },
            function () {
                this.props.dispatch(toolActions.getToolInfo(this.state.startDate, this.state.endDate));
            });
        }
    }


	render() {
	const { tools } = this.props;
	return (
        <View style={ styles.container }>
            <View style={ styles.machineInfoContainer} >
				<Text>TEST MachineInfo</Text>
                {tools.loading &&
					    <Text>Loading...Loading...</Text>
				}
                {tools.items &&
			        <MachineInfo items={tools.items} />
				}
            </View>
            <VictoryChart width={350} theme={VictoryTheme.material}>
                <VictoryBar data={data} x="quarter" y="earnings" />
            </VictoryChart>
        </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
		width: "100%",
		height: "100%"
	},
	machineInfoContainer: {
	    marginBottom: 10

	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
});

function mapStateToProps(state) {
    const { tools, dates } = state;
    return {
        tools,
        dates
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
