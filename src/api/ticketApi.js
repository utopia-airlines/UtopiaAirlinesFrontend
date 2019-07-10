"use strict";

import axios from 'axios';
import Config from '../config';

const TicketApi = {
    bookTicket: (ticket) => {
        return axios.post(Config.api + '/flight/' + ticket.flight + '/seat/' +
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