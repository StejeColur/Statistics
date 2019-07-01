import { dateConstants } from '../_constants';

export function dates(state = {}, action) {
  switch (action.type) {
    case dateConstants.SETDATE_REQUEST:
      return {
        loading: true,
        date: action.date
      };
    case dateConstants.SETDATE_SUCCESS:
      return {
        loading: false,
        dates: action.date
      };
    case dateConstants.SETDATE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}
