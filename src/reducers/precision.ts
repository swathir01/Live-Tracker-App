import { SET_PRECISION } from "../actions/types";
import { PrecisionState } from "../model/precision";

const initialState: PrecisionState = {
  precision: 2,
};

const precisionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PRECISION:
      return { ...state, precision: action.payload };
    default:
      return state;
  }
};

export default precisionReducer;

// const selectPrecision = (state: any) => state.precision.precision;