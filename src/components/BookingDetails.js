"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { FlightEndpointColumn } from './FlightEndpointColumn';
import { ErrorActions } from '../actions/errorActions';
import { FlightIcon } from './FlightIcon';

function getFlightFromBooking(booking) {
    if (!booking) {
        return {
            departureDate: 'Unknown',
            departureAirport: 'Unknown',
            destination: 'Unknown',
            arrivalDate: 'Unknown'
        };
    } else if (booking.flight) {
        return booking.flight;
    } else if (booking.id) {
        return booking.id.flight;
    } else {
        ErrorActions.showError('Failed to get flight from booking');
        return undefined;
    }
}

function getSeatFromBooking(booking) {
    if (!booking) {
        ErrorActions.showError('Failed to get seat from booking');
        return undefined;
    }
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

function priceColumn(booking) {
    if (booking && booking.price) {
        return <div><div>Price Paid:</div><div>{booking.price}</div></div>;
    } else {
        return <div><div>Price:</div><div>$100</div></div>;
    }
}

function bookingStatusColumn(booking) {
    if (!booking) {
        return <div><div>Booking Status:</div><div>Unknown</div></div>;
    } else if (booking.price) {
        return <div><div>Booking Status:</div><div>Confirmed</div></div>;
    } else {
        return <div><div>Booking Status:</div><div>Pending Payment</div></div>;
    }
}

export function BookingDetails(props) {
    const flight = getFlightFromBooking(props.booking);
    const seat = getSeatFromBooking(props.booking);
    return (
        <div className="ticket-container">
            <div className="flight_info container">
                <div className="row">
                    <FlightEndpointColumn airport={flight.departureAirport} date={flight.departureDate} />
                    <div className="col-sm">
                        <FlightIcon />
                    </div>
                    <FlightEndpointColumn airport={flight.destination} date={flight.arrivalDate} />
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
    booking: PropTypes.object
}
