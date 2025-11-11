import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import GlobalStyle from './component/GlobalStyle';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_API_URL);
const root = ReactDOM.createRoot(document.getElementById('root'));
export const MyContextSocket = createContext();

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <MyContextSocket.Provider value={{socket}}>
        <GlobalStyle>
          <App />
        </GlobalStyle>
      </MyContextSocket.Provider>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();