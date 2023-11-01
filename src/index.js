import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './app/store/store';
import { Provider } from 'react-redux'
import { StyledEngineProvider } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
      <App />
      </StyledEngineProvider>
    </Provider>
  // </React.StrictMode>
);