"use strict";

import Dispatcher from '../dispatcher/appDispatcher';
import {TICKET_ACTIONS} from '../actions/ticketActions';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _ticketStore = {
    selectedSeat: null,
    bookedTicket: null,
    bookingFailureReason: null,
    paymentResult: null
}

class TicketStoreClass extends EventEmitter {
    addChangeListener(cb) {
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getSelectedSeat() {
        return _ticketStore.selectedSeat;
    }

    getBookedTicket() {
        return _ticketStore.bookedTicket;
    }

    getBookingFailureReason() {
        return _ticketStore.bookingFailureReason;
    }

    getPaymentResult() {
        return _ticketStore.paymentResult;
    }
}

const TicketStore = new TicketStoreClass();

Dispatcher.register((action) => {
	switch (action.actionType) {
        case TICKET_ACTIONS.SELECT_SEAT:
            _ticketStore.selectedSeat = action.data;
            break;
        case TICKET_ACTIONS.BOOK_TICKET:
        case TICKET_ACTIONS.SHOW_BOOKING_DETAILS:
            _ticketStore.bookedTicket = action.data;
            break;
        case TICKET_ACTIONS.BOOKING_FAILURE:
            _ticketStore.bookingFailureReason = action.data;
            break;
        case TICKET_ACTIONS.PAY_FOR_TICKET:
            _ticketStore.paymentResult = action.data;
            break;
        case TICKET_ACTIONS.TIME_OUT:
        case TICKET_ACTIONS.CANCEL:
            _ticketStore.bookedTicket = null;
            break;
        default:
            return;
    }
    TicketStore.emitChange();
});

export default TicketStore;