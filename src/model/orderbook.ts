export type EntryOrderBook = {
    count: number;
    amount: number;
    total: number;
    price: number;
  };

export interface StateOrderBook{
    bids: EntryOrderBook[];
    offers: EntryOrderBook[];
}