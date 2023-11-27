// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Update the path based on your actual file structure
import { store } from './store/store'; // Update the path based on your actual file structure
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
