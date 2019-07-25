"use strict";

import Dispatcher from '../dispatcher/appDispatcher';
import {FLIGHT_ACTIONS, FlightActions} from '../actions/flightActions';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _flightStore = {
    flights: [],
    filteredFlights: null,
    selected: null,
    seats: []
}

class FlightStoreClass extends EventEmitter {
    addChangeListener(cb) {
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getAllFlights() {
        return _flightStore.flights;
    }

    getFilteredFlights() {
        return _flightStore.filteredFlights;
    }

    getSelectedFlight() {
        return _flightStore.selected;
    }

    getSeats() {
        return _flightStore.seats;
    }
}

const FlightStore = new FlightStoreClass();

function maybeSaveSelectedFlight(value) {
    if (typeof value === 'number' || typeof value === 'string') {
        // We deliberately use == rather than === here, because we want '1' to match 1 or vice versa
        _flightStore.selected = _flightStore.filteredFlights.find((flight) => flight.flight_number == value);
    } else {
        _flightStore.selected = null;
    }
}

Dispatcher.register((action) => {
    switch (action.type) {
        case FLIGHT_ACTIONS.FILTER_SEARCH:
            _flightStore.filteredFlights = action.value;
            maybeSaveSelectedFlight(_flightStore.selected);
            break;
        case FLIGHT_ACTIONS.SELECT_FLIGHT:
            _flightStore.selected = action.value;
            FlightActions.seatsForFlight(action.value);
            break;
        case FLIGHT_ACTIONS.RETURN_TO_HOMEPAGE:
            _flightStore.filter = null;
            _flightStore.selected = null;
            break;
        case FLIGHT_ACTIONS.SEATS_FOR_FLIGHT:
            _flightStore.seats = action.value;
            break;
        default:
            return;
    }
    FlightStore.emitChange();
});

export default FlightStore;
