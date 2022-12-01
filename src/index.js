import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {MuiPickersUtilsProvider} from "@material-ui/pickers"
import DateFnsUtils from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
      <App />
    </MuiPickersUtilsProvider>
  </React.StrictMode>
);
