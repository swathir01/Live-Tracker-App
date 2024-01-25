import { Dispatch } from 'redux';
import {
  setOrderBookData,
} from '../actions/actions';

import store from '../store';
import { EntryOrderBook } from '../model/orderbook';
import { OrderBookUpdate, SnapshotEntry } from '../model';


export const orderBookUpdate = (
  data: OrderBookUpdate,
  dispatch: Dispatch,
) => {
  if (Array.isArray(data[1])) {
    if (Array.isArray(data[1][0])) {
      handleSnapshot(data[1] as SnapshotEntry[], dispatch);
    } else {
      handleIndividualUpdate(data[1] as unknown as SnapshotEntry);
    }
  }
};

const handleSnapshot = (snapshot: SnapshotEntry[], dispatch: Dispatch) => {
  const bids: EntryOrderBook[] = [];
  const offers: EntryOrderBook[] = [];

  snapshot.forEach((entry) => {
    const [price, count, amount] = entry;
    const order = {
      price,
      count,
      amount,
      total: Math.abs(count * amount),
    };
    if (amount > 0) {
      bids.push(order);
    } else {
      offers.push(order);
    }
  });

  bids.sort((a, b) => a.price - b.price);
  offers.sort((a, b) => a.price - b.price);

  dispatch(setOrderBookData({ bids, offers }));
};

const handleIndividualUpdate = (update: SnapshotEntry) => {
  const [price, count, amount] = update;
  const order = {
    price,
    count,
    amount,
    total: Math.abs(count * amount),
  };

  store.dispatch((dispatch: Dispatch, getState: any) => {
    let { bids, offers } = getState().orderbook;

    bids = [...bids];
    offers = [...offers];
    if (amount > 0) {
      const index = bids.findIndex((bid: any) => bid.price === price);
      if (index !== -1) {
        if (count === 0) {
          bids.splice(index, 1);
        } else {
          bids[index] = order;
        }
      } else if (count !== 0) {
        bids.push(order);
        bids.sort((a: any, b: any) => a.price - b.price);
      }
    } else {
      const index = offers.findIndex((ask: any) => ask.price === price);
      if (index !== -1) {
        if (count === 0) {
          offers.splice(index, 1);
        } else {
          offers[index] = order;
        }
      } else if (count !== 0) {
        offers.push(order);
        offers.sort((a: any, b: any) => a.price - b.price);
      }
    }
    dispatch(setOrderBookData({ bids, offers }));
  });
};
