import jquery from 'jquery';
import Config from '../config';

const FlightApi = {
    getFlights: function(filter, cb) {
        // TODO: If filtering is ever exposed in REST API, use that instead of doing the filtering ourselves
        jquery.get(Config.api + '/flights', {}, (data) => {
            const parsed = JSON.parse(data);
            cb(filter(parsed));
        }, "json");
    }
}

export default FlightApi;