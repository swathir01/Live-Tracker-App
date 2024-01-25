import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import './global-style.css'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
      <Provider store={store}>
      <App />
      </Provider>
  </StrictMode>
);
