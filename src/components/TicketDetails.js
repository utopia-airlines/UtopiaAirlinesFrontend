import React from 'react';
import PropTypes from 'prop-types';
import {datePart, timePart} from '../util/datetime';

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
        return undefined;
    }
}

function getSeatFromTicket(ticket) {
    if (!ticket) {
        return undefined;
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

function airportToString(airport) {
    if (typeof airport === 'string') {
        return airport;
    } else if (typeof airport === 'undefined') {
        return 'Unknown';
    } else if (airport.name && !airport.code) {
        return airport.name;
    } else if (airport.code && !airport.name) {
        return airport.code;
    } else {
        return `${airport.name} (${airport.code})`;
    }
}

function endpointColumn(airport, date) {
    return <div className="col-sm" key={airport.code}>
        <div>{airportToString(airport)}</div>
        <div>{datePart(date)}</div>
        <div>{timePart(date)}</div>
    </div>;
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
                        {/* TODO: Extract a component for this icon, since it also appears in FlightDetails */}
                        <img src="./images/plane_icon.png" width={72} />
                    </div>
                    {endpointColumn(flight.destination, flight.arrivalDate)}
                </div>
                <div className="row">
                    <div className="col-sm" key={seat}>Seat: {seat}</div>
                    <div className="col-sm">$100</div>
                    <div className="col-sm">{/* FIXME: Need a 'book ticket' button here! */}</div>
                </div>
            </div>
        </div>
    );
}

TicketDetails.propTypes = {
    ticket: PropTypes.object
}