import { dateConstants } from '../_constants';

export const dateActions = {
    setDate,
};

function setDate(startDate, endDate) {

    return dispatch => {
        dispatch(request({ startDate, endDate }));
        const date = {
            startDate: startDate,
            endDate: endDate
        }
        if(date !== 'undefined'){
            dispatch(success(date));
        }
    };

    function request(date) { return { type: dateConstants.SETDATE_REQUEST, date } }
    function success(date) { return { type: dateConstants.SETDATE_SUCCESS, date } }
    /*function failure(error) { return { type: dateConstants.SETDATE_FAILURE, error } }*/
}

