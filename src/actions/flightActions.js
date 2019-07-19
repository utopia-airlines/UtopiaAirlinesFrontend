"use strict";

import Dispatcher from '../dispatcher/appDispatcher';
import FlightApi from '../api/flightApi';

export const FLIGHT_ACTIONS = {
    FILTER_SEARCH: 'searchActions.FilterSearch',
    SELECT_FLIGHT: 'searchActions.SelectFlight',
    RETURN_TO_HOMEPAGE: 'searchActions.ReturnToHomepage',
    SEATS_FOR_FLIGHT: 'searchActions.SeatsForFlight'
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
    },
    seatsForFlight: function(flight) {
        FlightApi.getSeats(flight, (data) => {
            Dispatcher.dispatch({
                type: FLIGHT_ACTIONS.SEATS_FOR_FLIGHT,
                value: data
            });
        });
    }
}