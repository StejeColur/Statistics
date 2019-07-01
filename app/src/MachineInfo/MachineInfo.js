import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { MachineInfoCard } from '../_components';

class MachineInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showTools: false,
        };
        this.rows = [];
    }
    toggleTools() {
        console.log("CLICKED");
        const tmpShowTools = !this.state.showTools;
        console.log('tmpShowTools: ' + tmpShowTools);
        this.setState({
            showTools: tmpShowTools,
        });
    }
    componentWillUpdate(nextProps,nextState) {
        console.log("componentWillUpdate");
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate");
        this.renderMachineInfoCard();
    }

    componentWillMount() {
        console.log("ComponentWillMount");
        this.renderMachineInfoCard();
    }

    renderMachineInfoCard(){
        Object.entries(this.props.items).forEach(([key, items], index) => {
            const tempInfo = (
                <View key={key} style={styles.machineCardContainer}>
                    <MachineInfoCard key={key} items={items}  />
                </View>
            );
            if(index % 2 === 0){
                this.rows.push([tempInfo]);
            } else {
                this.rows[this.rows.length - 1].push(tempInfo);
            }
        });
    }

	render() {
	return (
        <View style={ styles.container }>
            {this.rows.map((r, i) => (
                <View key={i} style={ styles.row }>
                    {r}
                    {r.lenght < 2 ? <View style={styles.machineCardContainer} />:null}
                </View>
            ))}
        </View>
    );
  }
}

const styles = StyleSheet.create({
	row: {
	    flexDirection: 'row'
	},
	machineCardContainer: {
        flex: 1,
        padding: 10
	},
});

const connectedHomePage = connect(null, null)(MachineInfo);
export { connectedHomePage as MachineInfo };
