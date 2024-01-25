import { SET_CONNECTED, SET_DISCONNECTED } from '../actions/types';
import { StateWebSocket } from '../model/websocket';

const initialState: StateWebSocket = {
  isConnected: false,
};

const websocketReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CONNECTED:
      return {
        ...state,
        isConnected: true,
      };
    case SET_DISCONNECTED:
      return {
        ...state,
        isConnected: false,
      };
    default:
      return state;
  }
};


export default websocketReducer;