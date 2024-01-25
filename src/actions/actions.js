import { SET_CONNECTED, SET_DISCONNECTED, SET_PRECISION, SET_ORDER_BOOK_DATA, SET_LOAD, SET_NOT_LOAD } from './types';

export const setConnected = () => ({
  type: SET_CONNECTED,
});

export const setDisconnected = () => ({
  type: SET_DISCONNECTED,
});

export const setPrecision = (precision) => ({
  type: SET_PRECISION,
  payload: precision,
});

export const setOrderBookData = (orderBookData) => ({
  type: SET_ORDER_BOOK_DATA,
  payload: orderBookData,
});

export const showLoading = () => ({
  type: SET_LOAD,
});

export const hideLoading = () => ({
  type: SET_NOT_LOAD,
});