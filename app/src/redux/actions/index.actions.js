import {createAction} from 'redux-actions';


export const TEST_ACTION = 'TEST_ACTION';

export const SET_COUNT = 'SET_COUNT';


export const setCount = createAction(SET_COUNT);
/* This is equivalent to
export const setCount = (payload) => {
  return {
    type: SET_COUNT,
    payload: payload
  };
};
*/

