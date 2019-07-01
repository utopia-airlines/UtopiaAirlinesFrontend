"use strict";

import Dispatcher from '../dispatcher/appDispatcher';
import FlightApi from '../api/flightApi';

export const FLIGHT_ACTIONS = {
    FILTER_SEARCH: 'searchActions.FilterSearch',
    SELECT_FLIGHT: 'searchActions.SelectFlight',
    RETURN_TO_HOMEPAGE: 'searchActions.ReturnToHomepage'
};

export const FlightActions = {
    filterSearch: function(filter) {
        FlightApi.getFlights(filter, (data) => {
            Dispatcher.dispatch({
                type: FLIGHT_ACTIONS.FILTER_SEARCH,
                value: data
            });
        });
    },
    selectFlight: function(flight) {
        Dispatcher.dispatch({
            type: FLIGHT_ACTIONS.SELECT_FLIGHT,
            value: flight
        });
    },
    returnToHomepage: function() {
        Dispatcher.dispatch({
            type: FLIGHT_ACTIONS.RETURN_TO_HOMEPAGE,
            value: true
        });
    }
}