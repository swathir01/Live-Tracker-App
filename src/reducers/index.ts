import { combineReducers } from 'redux';
import precision from './precision';
import websocket from './websocket';
import orderbook from './orderbook';

const reducers = combineReducers({
  precision,
  websocket,
  orderbook
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;