import React from 'react';
import { datePart, timePart } from '../util/datetime';
import PropTypes from 'prop-types';

function getFlightFromBooking(booking) {
    if (booking.flight) {
        return booking.flight;
    } else if (booking.id) {
        return booking.id.flight;
    } else {
        return undefined;
    }
}

function getSeatFromBooking(booking) {
    let row;
    if (booking.row) {
        row = booking.row;
    } else if (booking.seat_row) {
        row = booking.seat_row;
    } else if (booking.id) {
        return getSeatFromBooking(booking.id);
    }
    let seat;
    if (booking.seat) {
        seat = booking.seat
    } else if (booking.id) {
        return getSeatFromBooking(booking.id);
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

function priceColumn(booking) {
    if (booking.price) {
        return <div><div>Price Paid:</div><div>{booking.price}</div></div>;
    } else {
        return <div><div>Price:</div><div>$100</div></div>;
    }
}

function bookingStatusColumn(booking) {
    if (booking.price) {
        return <div><div>Booking Status:</div><div>Confirmed</div></div>;
    } else {
        return <div><div>Booking Status:</div><div>Pending Payment</div></div>;
    }
}

function endpointColumn(airport, date) {
    return <div className="col-sm" key={airport}>
        <div>{airportToString(airport)}</div>
        <div>{datePart(date)}</div>
        <div>{timePart(date)}</div>
    </div>;
}

export function BookingDetails(props) {
    const flight = getFlightFromBooking(props.booking);
    const seat = getSeatFromBooking(props.booking);
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
                    <div className="col-sm">{priceColumn(props.booking)}</div>
                    <div className="col-sm">{bookingStatusColumn(props.booking)}</div>
                </div>
            </div>
        </div>
    );
}

BookingDetails.propTypes = {
    booking: PropTypes.object.isRequired
}
