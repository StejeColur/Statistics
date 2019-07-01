import { toolConstants } from '../_constants';
import { toolService } from '../_services';
/*import { alertActions } from './';*/
/*import { history } from '../history';*/

export const toolActions = {
    getToolInfo,
};

function getToolInfo(startDate, endDate) {
    return dispatch => {
        dispatch(request());
        toolService.getToolInfo(startDate, endDate)
            .then( response => {
                dispatch(success(response));
            });
    };

    function request() { return { type: toolConstants.GETALL_REQUEST } }
    function success(tools) { return { type: toolConstants.GETALL_SUCCESS, tools } }
    /*function failure(error) { return { type: toolConstants.GETALL_FAILURE, error } }*/
}

