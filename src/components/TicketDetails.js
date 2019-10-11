"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { TicketActions } from '../actions/ticketActions';
import { FlightEndpointColumn } from './FlightEndpointColumn';
import { FlightIcon } from './FlightIcon';

// TODO: Reduce duplication between this and BookingDetails. We don't want to *export* (most of) the
// helper functions, but this and BookingDetails need mostly the same functionality.

function getFlightFromTicket(ticket) {
    if (!ticket) {
        return {
            departureDate: 'Unknown',
            departureAirport: 'Unknown',
            destination: 'Unknown',
            arrivalDate: 'Unknown'
        };
    } else if (ticket.flight) {
        return ticket.flight;
    } else if (ticket.id) {
        return ticket.id.flight;
    } else {
        return 'Unknown';
    }
}

function getSeatFromTicket(ticket) {
    if (!ticket) {
        return 'Unknown';
    }
    let row;
    if (ticket.row) {
        row = ticket.row;
    } else if (ticket.seat_row) {
        row = ticket.seat_row;
    } else if (ticket.id) {
        return getSeatFromTicket(ticket.id);
    }
    let seat;
    if (ticket.seat) {
        seat = ticket.seat;
    } else if (ticket.id) {
        return getSeatFromTicket(ticket.id);
    }
    return `${row}${seat}`;
}

function endpointColumn(airport, date) {
    let local;
    if (airport) {
        local = airport;
    } else {
        local = { code: 'Unknown' };
    }
    return <FlightEndpointColumn airport={local} date={date} />;
}

function bookTicket(event, ticket) {
    if (ticket.reserved) {
        TicketActions.bookingConflict();
    } else {
        TicketActions.bookTicket(ticket);
    }
    event.preventDefault();
}

function bookOrCancelButton(ticket) {
    if (!ticket || ticket.reserved) {
        // FIXME: Allow (only) the ticket-holder to cancel from this screen
        return <span>Ticket Reserved</span>;
    } else {
        return <button onClick={(event) => bookTicket(event, ticket)}>Book Ticket</button>
    }
}

export function TicketDetails(props) {
    const flight = getFlightFromTicket(props.ticket);
    const seat = getSeatFromTicket(props.ticket);
    return (
        <div className="ticket-container">
            <div className="flight_info container">
                <div className="row">
                    {endpointColumn(flight.departureAirport, flight.departureDate)}
                    <div className="col-sm">
                        <FlightIcon />
                    </div>
                    {endpointColumn(flight.destination, flight.arrivalDate)}
                </div>
                <div className="row">
                    <div className="col-sm" key={seat}>Seat: {seat}</div>
                    <div className="col-sm">$100</div>
                    <div className="col-sm">{bookOrCancelButton(props.ticket)}</div>
                </div>
            </div>
        </div>
    );
}

TicketDetails.propTypes = {
    ticket: PropTypes.object
}