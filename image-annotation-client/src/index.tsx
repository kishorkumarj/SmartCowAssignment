import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import './assets/css/main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import config from './config';
import store from './store/root';

const application = (
  <Provider store={store}>
    <App baseUrl={config.baseUrl}/>
  </Provider>
)

ReactDOM.render(application, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();