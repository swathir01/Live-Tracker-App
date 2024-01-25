import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './orderbook.scss';

import WebSocketService from '../services/WebSocketService';
import { useTypedSelector } from '../hooks/useTypeSelector';
import { DecreasePrecisionIcon, IncreasePrecisionIcon } from '../img/Precisions';
import { setConnected, setDisconnected } from '../actions/actions';

export const OrderBook:React.FC<any> = () => {
  const { bids, offers} = useTypedSelector((state) => state.orderbook);
  const { precision } = useTypedSelector((state) => state.precision);
  const { isConnected } = useTypedSelector((state) => state.websocket);

  const dispatch = useDispatch<any>();
  const websocketService = WebSocketService.getInstance(dispatch);

  useEffect(() => {
    if (isConnected) {
      websocketService.connect();
    } else {
      websocketService.disconnect();
    }

    return () => {
      websocketService.disconnect();
    };
  }, [websocketService, isConnected]);

  const handleConnectClick = () => {
    dispatch(setConnected());
  };

  const handleDisconnectClick = () => {
    dispatch(setDisconnected());
  };

  return (
    <div className='main-container'>
      <button className='button' onClick={handleConnectClick}>Connect</button>
      <button className='button' onClick={handleDisconnectClick}>Disconnect</button>
      <div className='heading-container'>
        <div>
          <h2 className='title'>
            ORDER BOOK <span className='sub-title'>BTC/USD</span>
          </h2>
        </div>
        <div className='precision-container'>
          <button className='button' onClick={() => websocketService.decreasePrecision()}>
            <DecreasePrecisionIcon />
          </button>
          <button className='button' onClick={() => websocketService.increasePrecision()}>
            <IncreasePrecisionIcon />
          </button>
        </div>
      </div>

      <table className='table'>
        <thead className='tableheader'>
          <tr>
            <th colSpan={4}>Bids</th>
            <th colSpan={4}>Asks</th>
          </tr>
          <tr>
          <th className="table-col">COUNT</th>
          <th className="table-col">AMOUNT</th>
          <th className="table-col">TOTAL</th>
          <th className="table-col">PRICE</th>
          <th className="table-col">PRICE</th>
          <th className="table-col">TOTAL</th>
          <th className="table-col">AMOUNT</th>
          <th className="table-col">COUNT</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid: any, i: number) => (
            <tr key={i}>
              <td>{bid.count}</td>
              <td>{bid.amount.toFixed(4)}</td>
              <td>{bid.total.toFixed(4)}</td>
              <td>{bid.price.toFixed(precision)}</td>
              <td>
                {offers[i]
                  ? offers[i].price.toFixed(precision)
                  : ''}
              </td>
              <td>
                {offers[i] ? offers[i].total.toFixed(4) : ''}
              </td>
              <td>
                {offers[i] ? offers[i].amount.toFixed(4) : ''}
              </td>
              <td>{offers[i] ? offers[i].count : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};