"use strict";

import axios from 'axios';
import Config from '../config';
import Dispatcher from '../dispatcher/appDispatcher';
import { ERROR_ACTIONS } from '../actions/errorActions';

const FlightApi = {
    getFlights: function(filter, cb) {
        // TODO: If filtering is ever exposed in REST API, use that instead of doing the filtering ourselves
        axios.get(Config.api + '/flights').then((response) => {
            if (response.status && response.status >= 200 && response.status < 300) {
                cb(filter(response.data));
            } else {
                Dispatcher.dispatch({
                    type: ERROR_ACTIONS.SHOW_ERROR,
                    value: 'Getting list of flights failed',
                    extra: response // Not used, but useful in debugging
                });
            }
        }, (err) => {
            Dispatcher.dispatch({
                type: ERROR_ACTIONS.SHOW_ERROR,
                value: 'Getting list of flights failed',
                extra: err // Not used, but useful in debugging
            });
        });
    },

    getSeats: function(flight, cb) {
        let flightNumber;
        if (flight.flight_number) {
            flightNumber = flight.flight_number;
        } else {
            flightNumber = flight;
        }
        axios.get(Config.api + '/flight/' + flightNumber + '/seats').then((response) => {
            if (response.status && response.status >= 200 && response.status < 300) {
                cb(response.data);
            } else {
                Dispatcher.dispatch({
                    type: ERROR_ACTIONS.SHOW_ERROR,
                    value: 'Getting list of seats failed',
                    extra: response // Not used, but useful in debugging
                });
            }
        }, (err) => {
            Dispatcher.dispatch({
                type: ERROR_ACTIONS.SHOW_ERROR,
                value: 'Getting list of seats failed',
                extra: err // Not used, but useful in debugging
            });
        });
    }
}

export default FlightApi;