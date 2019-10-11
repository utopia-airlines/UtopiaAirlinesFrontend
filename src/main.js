// @ts-nocheck
/* eslint-disable */

"use strict";

import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter} from 'react-router-dom';

import {App} from './components/App.js';

ReactDom.render((
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  ), document.getElementById('app'));
