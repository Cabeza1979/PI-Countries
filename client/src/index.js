import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';


axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
   </Provider>
  </React.StrictMode>,
  document.getElementById('root')  //renderizo en el root
);

reportWebVitals();
