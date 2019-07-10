"use strict";

import axios from 'axios';
import Config from '../config';

const FlightApi = {
    getFlights: function(filter, cb) {
        // TODO: If filtering is ever exposed in REST API, use that instead of doing the filtering ourselves
        axios.get(Config.api + '/flights').then((response) => {
            cb(filter(response.data));
        });
    }
}

export default FlightApi;