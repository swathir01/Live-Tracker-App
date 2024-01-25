import { SET_LOAD, SET_NOT_LOAD } from '../actions/types';

const initialState: any = {
    isLoading: false,
};

const loaderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOAD:
      return {
        ...state,
        isLoading: true,
      };
    case SET_NOT_LOAD:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};


export default loaderReducer;