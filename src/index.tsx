import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/main.css'
import App from './App';
import { Provider } from 'react-redux';
import {store} from './store/index'
import { SocketProvider } from './Contexts/SocketContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
) ;
root.render(
  
    <Provider store={store}>
      <SocketProvider>
    <App />
    </SocketProvider>
    </Provider>
  
);

