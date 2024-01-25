import React, { useEffect } from 'react';
import './App.css';
import OrderBook from './orderbook';

const App:React.FC<any> = () => {
  useEffect(() => {
  }, []);
  return (
    <div className="App">
      <OrderBook />
    </div>
  );
}

export default App;
