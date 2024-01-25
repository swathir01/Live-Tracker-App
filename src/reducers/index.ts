import { combineReducers } from 'redux';
import precision from './precision';
import websocket from './websocket';
import orderbook from './orderbook';
import loader from './loader';


const reducers = combineReducers({
  precision,
  websocket,
  orderbook,
  loader
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;