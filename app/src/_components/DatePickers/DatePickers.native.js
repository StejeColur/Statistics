import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import { dateActions } from '../../_actions';
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

class DatePickers extends React.Component {

    constructor(props) {
        super(props);

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.state = {
            startDate: new Date(),
            endDate: tomorrow,
            testDate: new Date(),
        };
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
    }

    handleStartChange(date) {
        const tempFormateDate = moment(date,'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm');
        this.setState({
            startDate: date,
        },
        function () {
            this.props.dispatch(dateActions.setDate(
                moment(this.state.startDate,'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
                moment(this.state.endDate,'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm')
            ));
        });
    }

    handleEndChange(date) {
        this.setState({
            endDate: moment(Date(date)).format("YYYY-MM-DD HH:mm")
        },
        function () {
            this.props.dispatch(dateActions.setDate(
                moment(this.state.startDate,'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
                moment(this.state.endDate,'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm')
            ));
        });

    }
    componentDidMount() {
        this.props.dispatch(dateActions.setDate(this.state.startDate, this.state.endDate));
    }


    render() {
        return (
            <View style={ styles.dateContainer }>
                <View style={ styles.datePicker }>
                    <DatePicker
                        style={{width: 150}}
                        date={this.state.startDate}
                        mode="datetime"
                        placeholder="select date"
                        format="DD-MM-YYYY HH:mm"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={style}
                        onDateChange={this.handleStartChange}

                    />
                </View>
                <View style={ styles.datePicker }>
                    <DatePicker
                        style={{width: 150}}
                        date={this.state.endDate}
                        mode="datetime"
                        placeholder="select date"
                        format="DD-MM-YYYY HH:mm"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={style}
                        onDateChange={this.handleEndChange}
                    />
                </View>
            </View>
        );
    }
}


const style = {
    dateIcon: {
        position: 'absolute',
        left: 0,
        top: 4,
        marginLeft: 0
    },
    dateInput: {
        marginLeft: 36
    }
};
const styles = StyleSheet.create({
    dateContainer: {
	    flexDirection: 'row'
    },
    datePicker: {
        width: "45%"
    },
});


function mapStateToProps(state) {
    const { date } = state;

    return {
		date
    };
}


const connectedHomePage = connect(mapStateToProps)(DatePickers);
export { connectedHomePage as DatePickers };
