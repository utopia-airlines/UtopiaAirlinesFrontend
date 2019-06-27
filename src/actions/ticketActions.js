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
    CANCEL: 'ticketActions.CancelTicket'
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
        Dispatcher.dispatch({
            type: TICKET_ACTIONS.SHOW_BOOKING_DETAILS,
            value: booking
        });
    },

    payForTicket: function(ticket, price) {
        const result = TicketApi.payForTicket(ticket, price);
        Dispatcher.dispatch({
            type: TICKET_ACTIONS.PAY_FOR_TICKET,
            value: result
        });
    },

    extendTimeout: function (ticket) {
        const promiseResult = TicketApi.extendTimeout(ticket);
        promiseResult.then((val) => {
            Dispatcher.dispatch({
                type: TICKET_ACTIONS.SHOW_BOOKING_DETAILS,
                value: val
            });
        }, (err) => {
            Dispatcher.dispatch({
                type: TICKET_ACTIONS.BOOKING_FAILURE,
                value: err
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
        TicketApi.cancelTicket(ticket);
        Dispatcher.dispatch({
            type: TICKET_ACTIONS.CANCEL,
            value: ticket
        });
    }
}