import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

class MachineInfoCard extends React.Component {
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

	render() {
	    const { items } = this.props;
	    const { showTools } = this.state;
	    return (
            <View style={ styles.machineInfoContainer }>
                <TouchableOpacity onPress={() => this.toggleTools()} >
                    <Text style={ styles.machineInfoTitle }>
                        {items.cutter_name}:
                    </Text>
                    <View style={ styles.machineInfoSub }>
                        <Text style={ styles.machineInfoTime }>
                            Time Runed: {items.time_Runed} sec
                        </Text>
                        <View style={ styles.row }>
                            {console.log("----> " + showTools)}
                            {showTools?
                                <View style={ styles.toolsContainer}>
                                    <Text>Tools: </Text>
				                    <FlatList
					                    data={items.tools}
					                    renderItem={({item}) => (
						                    <Text style={styles.toolContainer}>{item.name}: {item.meters}m</Text>
					                    )}
					                    keyExtractor={(item, index) => index.toString()}/>
					            </View>
					        :null}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    machineInfoContainer: {
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {width: 2, height: 2 },
        shadowOpacity: 3,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        flexDirection: "column",
        padding: 10,
        marginBottom: 10,
        minHeight: 100
    },
    row: {
	    flexDirection: 'row'
	},
	toolsContainer: {
        marginTop: 5,
	},
	toolContainer: {
        flex: 1,
	},
});

const connectedHomePage = connect(null, null)(MachineInfoCard);
export { connectedHomePage as MachineInfoCard };
