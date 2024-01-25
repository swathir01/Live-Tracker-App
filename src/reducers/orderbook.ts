import { SET_ORDER_BOOK_DATA } from "../actions/types";
import { StateOrderBook } from "../model/orderbook";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('orderBookState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: StateOrderBook) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('orderBookState', serializedState);
  } catch(err: any) {
    console.log("Error saving data in local storage");
  }
};

const initialState: StateOrderBook = loadState() || {
  bids: [],
  offers: []
};

const orderBookReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ORDER_BOOK_DATA:
      const newState = { ...state, bids: action.payload.bids, offers: action.payload.offers };
      saveState(newState);
      return newState;
    default:
      return state;
  }
};
export default orderBookReducer;