export interface ServiceEventModel {
  event: string;
  code: number;
}
export type SnapshotEntry = [number, number, number];
export type OrderBookUpdate =
  | [number, SnapshotEntry[]]
  | [number, SnapshotEntry];
