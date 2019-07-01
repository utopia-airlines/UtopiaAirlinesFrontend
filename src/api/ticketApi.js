"use strict";

import jquery from 'jquery';
import Config from '../config';

const TicketApi = {
    bookTicket: (ticket) => {
        return jquery.post(Config.api + '/flight/' + ticket.flight + '/seat/' +
            ticket.row + '/' + ticket.seat + '/ticket', null, null, "json");
    },
    getBookingDetailsById: (bookingId) => {
        return jquery.get(Config.api + '/booking/' + bookingId, null, null, "json");
    },
    getBookingDetailsBySeat: (flight, row, seat) => {
        return jquery.get(Config.api + '/flight/' + flight + '/seat/' + row + '/' + seat,
            null, null, "json");
    },
    payForTicket: (ticket, price) => {
        return jquery.ajax(Config.api + '/booking/' + ticket.bookingId, {
            method: 'PUT', data: { price }, dataType: 'json'});
    },
    extendTimeout: (ticket) => {
        return jquery.ajax(Config.api + '/booking/' + ticket.bookingId,
            {method: 'PUT', dataType: 'json'});
    },
    cancelTicket: (ticket) => {
        return jquery.ajax(Config.api + '/booking/' + ticket.bookingId, {method: 'DELETE'});
    }
}

export default TicketApi;