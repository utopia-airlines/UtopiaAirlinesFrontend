"use strict";

import axios from 'axios';
import Config from '../config';

const FlightApi = {
    getFlights: function(filter, cb) {
        // TODO: If filtering is ever exposed in REST API, use that instead of doing the filtering ourselves
        axios.get(Config.api + '/flights').then((response) => {
            cb(filter(response.data));
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
            cb(response.data);
        });
    }
}

export default FlightApi;