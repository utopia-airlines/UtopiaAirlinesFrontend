"use strict";

import Dispatcher from '../dispatcher/appDispatcher';
import {FLIGHT_ACTIONS} from '../actions/flightActions';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _flightStore = {
    flights: [],
    filteredFlights: null,
    selected: null
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
}

const FlightStore = new FlightStoreClass();

Dispatcher.register((action) => {
    switch (action.type) {
        case FLIGHT_ACTIONS.FILTER_SEARCH:
            _flightStore.filteredFlights = action.value;
            FlightStore.emitChange();
            break;
        case FLIGHT_ACTIONS.SELECT_FLIGHT:
            _flightStore.selected = action.value;
            FlightStore.emitChange();
            break;
        case FLIGHT_ACTIONS.RETURN_TO_HOMEPAGE:
            _flightStore.filter = null;
            _flightStore.selected = null;
            FlightStore.emitChange();
            break;
        default:
            return;
    }
});

export default FlightStore;
