"use strict";

import Dispatcher from '../dispatcher/appDispatcher';
import TicketApi from '../api/ticketApi';
import { ERROR_ACTIONS } from './errorActions';

export const TICKET_ACTIONS = {
    SELECT_SEAT: 'ticketActions.SelectSeat',
    BOOK_TICKET: 'ticketActions.BookTicket',
    SHOW_BOOKING_DETAILS: 'ticketActions.ShowBookingDetails',
    PAY_FOR_TICKET: 'ticketActions.PayForTicket',
    EXTEND_TIMEOUT: 'ticketActions.ExtendTimeout',
    TIME_OUT: 'ticketActions.BookingTimedOut',
    CANCEL: 'ticketActions.CancelTicket'
}

export const TicketActions = {
    selectSeat: function(flight, row, seat) {
        let flightNumber;
        if (typeof flight === 'number' || typeof flight === 'string') {
            flightNumber = flight;
        } else {
            flightNumber = flight.flight_number;
        }
        TicketApi.getBookingDetailsBySeat(flightNumber, row, seat).then((val) => {
            Dispatcher.dispatchOnResponse(val, {
                type: TICKET_ACTIONS.SELECT_SEAT,
                value: val.data
            }, {
                type: ERROR_ACTIONS.SHOW_ERROR,
                value: 'Getting booking details failed unexpectedly',
                extra: val
            });
        }, (err) => {
            Dispatcher.dispatch({
                type: ERROR_ACTIONS.SHOW_ERROR,
                value: 'Getting booking details failed',
                extra: err // Currently ignored by dispatcher, but possibly useful in debugging
            })
        });
    },

    bookTicket: function(ticket) {
        const promiseResult = TicketApi.bookTicket(ticket);
        promiseResult.then((val) => {
            Dispatcher.dispatchOnResponse(val, {
                type: TICKET_ACTIONS.BOOK_TICKET,
                value: val.data
            }, {
                type: ERROR_ACTIONS.SHOW_ERROR,
                value: 'Booking ticket failed unexpectedly',
                extra: val
            });
        }, (err) => {
            Dispatcher.dispatch({
                type: ERROR_ACTIONS.SHOW_ERROR,
                value: 'Booking ticket failed',
                extra: err
            });
        });
    },

    showBookingDetails: function (ticket) {
        let booking;
        if (typeof ticket === 'string') {
            booking = TicketApi.getBookingDetailsById(ticket);
        } else if (ticket.bookingId) {
            booking = TicketApi.getBookingDetailsById(ticket.bookingId);
        } else {
            booking = TicketApi.getBookingDetailsBySeat(ticket.flight, ticket.row, ticket.seat);
        }
        booking.then((val) => {
            Dispatcher.dispatchOnResponse(val, {
                type: TICKET_ACTIONS.SHOW_BOOKING_DETAILS,
                value: val.data
            }, {
                type: ERROR_ACTIONS.SHOW_ERROR,
                value: 'Getting booking details failed',
                extra: val
            });
        }, (err) => {
            Dispatcher.dispatch({
                type: ERROR_ACTIONS.SHOW_ERROR,
                value: 'No such booking', // TODO: Adjust based on the error
                extra: err // This isn't actually used, but may be useful in debugging
            });
        });
    },

    payForTicket: function(ticket, price) {
        TicketApi.payForTicket(ticket, price).then((result) => {
            Dispatcher.dispatchOnResponse(result, {
                type: TICKET_ACTIONS.PAY_FOR_TICKET,
                value: result
            }, {
                type: ERROR_ACTIONS.SHOW_ERROR,
                value: 'Accepting payment failed',
                extra: result
            });
        }, (err) => {
            Dispatcher.dispatch({
                type: ERROR_ACTIONS.SHOW_ERROR,
                value: 'Payment failed', // TODO: Adjust based on the error
                extra: err // This isn't actually used, but may be useful in debugging
            })
        });
    },

    extendTimeout: function (ticket) {
        const promiseResult = TicketApi.extendTimeout(ticket);
        promiseResult.then((val) => {
            Dispatcher.dispatchOnResponse(val, {
                type: TICKET_ACTIONS.SHOW_BOOKING_DETAILS,
                value: val.data
            }, {
                type: ERROR_ACTIONS.SHOW_ERROR,
                value: 'Extending timeout failed unexpectedly',
                extra: val
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
        TicketApi.cancelTicket(ticket).then((resp) => {
            Dispatcher.dispatchOnResponse(resp, {
                type: TICKET_ACTIONS.CANCEL,
                value: ticket
            }, {
                type: ERROR_ACTIONS.SHOW_ERROR,
                value: 'Cancellation unexpectedly failed',
                extra: resp
            });
        }, (err) => {
            Dispatcher.dispatch({
                type: ERROR_ACTIONS.SHOW_ERROR,
                value: 'Cancellation failed', // TODO: Adjust based on the error
                extra: err // This isn't actually used, but may be useful in debugging
            })
        });
    },

    invalidBookingId: function() {
        Dispatcher.dispatch({
            type: ERROR_ACTIONS.SHOW_ERROR,
            value: 'No such booking'
        });
    },

    bookingConflict: function() {
        Dispatcher.dispatch({
            type: ERROR_ACTIONS.SHOW_ERROR,
            value: 'Ticket has already been reserved'
        })
    }
}
