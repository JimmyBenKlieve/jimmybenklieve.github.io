import '@babel/polyfill/dist/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';

import App from './App';
import './index.scss';
import './scrollbar.scss';

ReactDOM.render(<App />, document.getElementById('root'));
