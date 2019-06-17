import {SET_COUNT} from '../actions/index.actions';

const defaultState = {
  count: 0
};

const content = (state = defaultState, action) => {
  switch (action.type) {
  case SET_COUNT: {
    return {...state, count: action.payload};
  }
  default:
    return state;
  }
};

export default content;
