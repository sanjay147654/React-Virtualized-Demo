import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Report from './components/Report';
import VirtualizedReport from './components/VirtualizedReport';
import ReactDataGridReport from './components/ReactDataGridReport'
import MuiVirtualizedTable from './components/MuiVirtualizedTable'
import Demo from './components/Demo'
import AntdInfinityTable from './components/AntdInfinityTable'

ReactDOM.render(<ReactDataGridReport/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
