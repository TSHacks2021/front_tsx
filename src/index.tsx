import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Time from './Time/Time';
import Memo from './Memo/Memo';
import { TimeInfo } from './TimeInfo';
import reportWebVitals from './reportWebVitals';

const timeInfo = new TimeInfo();

ReactDOM.render(
  <React.StrictMode>
    <Time timeInfo={timeInfo}/>
    <Memo />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
