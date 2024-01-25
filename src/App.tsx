import React, { useEffect } from 'react';
import './App.css';
import OrderBook from './orderbook';
import { useTypedSelector } from './hooks/useTypeSelector';
import LoadingScreen from './loader/loader';

const App:React.FC<any> = () => {
  const { isLoading } = useTypedSelector((state) => state.loader);
  useEffect(() => {
  }, []);
  return (
    <div className="App">
      {isLoading && <LoadingScreen/>}
      <OrderBook />
    </div>
  );
}

export default App;
