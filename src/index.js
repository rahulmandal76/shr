import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Toaster } from 'react-hot-toast';

ReactDOM.render(
  <CartProvider>
    <BrowserRouter>
      <Toaster position="top-center" containerStyle={{ top: '90px', zIndex: 99999 }} />
      <App />
    </BrowserRouter>
  </CartProvider>,
  document.getElementById("root")
);
