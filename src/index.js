import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'react-date-range/dist/styles.css'
// import 'react-date-range/dist/theme/default.css'
// import 'react-datepicker/dist/react-datepicker.css'
// import 'react-dates/initialize'
// import 'react-dates/lib/css/_datepicker.css'
import './styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
