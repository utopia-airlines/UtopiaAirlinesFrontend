"use strict";

import Dispatcher from '../dispatcher/appDispatcher';
import TicketApi from '../api/ticketApi';

export const TICKET_ACTIONS = {
    SELECT_SEAT: 'ticketActions.SelectSeat',
    BOOK_TICKET: 'ticketActions.BookTicket',
    SHOW_BOOKING_DETAILS: 'ticketActions.ShowBookingDetails',
    BOOKING_FAILURE: 'ticketActions.BookingFailure',
    PAY_FOR_TICKET: 'ticketActions.PayForTicket',
    EXTEND_TIMEOUT: 'ticketActions.ExtendTimeout',
    TIME_OUT: 'ticketActions.BookingTimedOut',
    CANCEL: 'ticketActions.CancelTicket',
    INVALID_BOOKING_ID: 'ticketActions.InvalidBookingId',
    CLEAR_ERROR: 'ticketActions.clearError'
}

export const TicketActions = {
    selectSeat: function(flight, row, seat) {
        Dispatcher.dispatch({
            type: TICKET_ACTIONS.SELECT_SEAT,
            value: [flight, row, seat]
        });
    },

    bookTicket: function(ticket) {
        const promiseResult = TicketApi.bookTicket(ticket);
        promiseResult.then((val) => {
            Dispatcher.dispatch({
                type: TICKET_ACTIONS.BOOK_TICKET,
                value: val
            });
        }, (err) => {
            Dispatcher.dispatch({
                type: TICKET_ACTIONS.BOOKING_FAILURE,
                value: err
            });
        });
    },

    showBookingDetails: function (ticket) {
        let booking;
        if (ticket.bookingId) {
            booking = TicketApi.getBookingDetailsById(ticket.bookingId);
        } else {
            booking = TicketApi.getBookingDetailsBySeat(ticket.flight, ticket.row, ticket.seat);
        }
        booking.then((val) => { // TODO: what if booking invalid (error returned)?
            Dispatcher.dispatch({
                type: TICKET_ACTIONS.SHOW_BOOKING_DETAILS,
                value: val
            });
        }, (err) => {
            console.log(err);
            this.invalidBookingId();
        });
    },

    payForTicket: function(ticket, price) {
        TicketApi.payForTicket(ticket, price).then((result) => { // TODO: error handling
            Dispatcher.dispatch({
                type: TICKET_ACTIONS.PAY_FOR_TICKET,
                value: result
            });
        });
    },

    extendTimeout: function (ticket) {
        const promiseResult = TicketApi.extendTimeout(ticket);
        promiseResult.then((val) => {
            Dispatcher.dispatch({
                type: TICKET_ACTIONS.SHOW_BOOKING_DETAILS,
                value: val
            });
        }, () => {
            Dispatcher.dispatch({
                type: TICKET_ACTIONS.TIME_OUT,
                value: ticket
            });
        });
    },

    bookingTimedOut: function(ticket) {
        Dispatcher.dispatch({
            type: TICKET_ACTIONS.TIME_OUT,
            value: ticket
        });
    },

    cancelTicket: function(ticket) {
        TicketApi.cancelTicket(ticket).then(() => { // TODO: error handling
            Dispatcher.dispatch({
                type: TICKET_ACTIONS.CANCEL,
                value: ticket
            });
        });
    },

    invalidBookingId: function() {
        Dispatcher.dispatch({
            type: TICKET_ACTIONS.INVALID_BOOKING_ID,
            value: true
        });
    },

    clearError: function() {
        Dispatcher.dispatch({
            type: TICKET_ACTIONS.CLEAR_ERROR,
            value: true
        });
    }
}
