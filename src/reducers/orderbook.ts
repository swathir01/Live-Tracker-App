import { SET_ORDER_BOOK_DATA } from "../actions/types";
import { StateOrderBook } from "../model/orderbook";

const initialState: StateOrderBook = {
  bids: [],
  offers: []
};

const orderBookReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case SET_ORDER_BOOK_DATA:
        return { ...state, bids: action.payload.bids, offers: action.payload.offers };
      default:
        return state;
    }
};
export default orderBookReducer;