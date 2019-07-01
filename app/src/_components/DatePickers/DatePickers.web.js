import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker'
import { Portal } from 'react-overlays'
import { dateActions } from '../../_actions';
import "react-datepicker/dist/react-datepicker.css";

const CalendarContainer = ({children}) => {
    const el = document.getElementById('calendar-portal')

    return (
        <Portal container={el}>
            {children}
        </Portal>
    )
}


class DatePickers extends React.Component {

    constructor(props) {
        super(props);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.state = {
            startDate: new Date(),
            endDate: tomorrow,
        };
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
    }

    handleStartChange(date) {
        this.setState({
            startDate: date
        },
        function () {
            this.props.dispatch(dateActions.setDate(this.state.startDate, this.state.endDate));
        });
    }

    handleEndChange(date) {
        this.setState({
            endDate: date
        },
        function () {
            this.props.dispatch(dateActions.setDate(this.state.startDate, this.state.endDate));
        });

    }

    componentDidMount() {
        this.props.dispatch(dateActions.setDate(this.state.startDate, this.state.endDate));
    }


    render() {
        return (
            <View style={ styles.dateContainer }>
                <View style={ styles.datePicker }>
                    <Text>Start Date</Text>
                    <DatePicker
                        popperContainer={CalendarContainer}
                        selected={this.state.startDate}
                        onChange={this.handleStartChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        dateFormat="dd-MM-yyyy HH:mm"
                        timeIntervals={15}
                    />
                </View>
                <View style={ styles.datePicker }>
                    <Text>End Date</Text>
                    <DatePicker
                        popperContainer={CalendarContainer}
                        selected={this.state.endDate}
                        onChange={this.handleEndChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        dateFormat="dd-MM-yyyy HH:mm"
                        timeIntervals={15}
                    />
                </View>
            </View>
        );
    }
}


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
