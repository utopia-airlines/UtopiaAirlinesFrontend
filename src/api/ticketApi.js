"use strict";

import axios from 'axios';
import Config from '../config';

function getFlightNumber(ticket) {
    if (typeof ticket.flight === 'string' || typeof ticket.flight === 'number') {
        return ticket.flight;
    } else if (ticket.flight.flight_number) {
        return ticket.flight.flight_number;
    } else if (ticket.flight.flightNumber) {
        return ticket.flight.flightNumber;
    } else {
        return undefined;
    }
}

const TicketApi = {
    bookTicket: (ticket) => {
        console.log(`About to post empty body to '${Config.api}/flight/${getFlightNumber(ticket)}/seat/${ticket.row}/${ticket.seat}/ticket'`);
        return axios.post(Config.api + '/flight/' + getFlightNumber(ticket) + '/seat/' +
            ticket.row + '/' + ticket.seat + '/ticket', {});
    },
    getBookingDetailsById: (bookingId) => {
        return axios.get(Config.api + '/booking/' + bookingId);
    },
    getBookingDetailsBySeat: (flight, row, seat) => {
        return axios.get(Config.api + '/flight/' + flight + '/seat/' + row + '/' + seat);
    },
    payForTicket: (ticket, price) => {
        return axios.put(Config.api + '/booking/' + ticket.bookingId, price);
    },
    extendTimeout: (ticket) => {
        return axios.put(Config.api + '/booking/' + ticket.bookingId);
    },
    cancelTicket: (ticket) => {
        return axios.delete(Config.api + '/booking/' + ticket.bookingId);
    }
}

export default TicketApi;