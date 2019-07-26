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

export class BookingDetails extends React.Component {
    render() {
        const flight = getFlightFromBooking(this.props.booking);
        const seat = getSeatFromBooking(this.props.booking);
        return (
            <div className="ticket-container">
                <div className="flight_info container">
                    <div className="row">
                        <div className="col-sm" key={flight.departure}>
                            <div>{airportToString(flight.departureAirport)}</div>
                            <div>{datePart(flight.departureDate)}</div>
                            <div>{timePart(flight.departureDate)}</div>
                        </div>
                        <div className="col-sm">
                            {/* TODO: Extract a component for this icon, since it also appears in FlightDetails */}
                            <img src="./images/plane_icon.png" width={72} />
                        </div>
                        <div className="col-sm" key={flight.destination}>
                        <div>{airportToString(flight.destination)}</div>
                            <div>{datePart(flight.arrivalDate)}</div>
                            <div>{timePart(flight.arrivalDate)}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm" key={seat}>Seat: {seat}</div>
                        <div className="col-sm">{priceColumn(this.props.booking)}</div>
                        <div className="col-sm">{bookingStatusColumn(this.props.booking)}</div>
                    </div>
                </div>
            </div>
        );
    }
}

BookingDetails.propTypes = {
    booking: PropTypes.object.isRequired
}
