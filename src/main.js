// @ts-nocheck
/* eslint-disable */

"use strict";

import jquery from 'jquery';
window.$ = window.jQuery=jquery;

import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import {App} from './components/App.js';

ReactDom.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('app'));
