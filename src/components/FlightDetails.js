"use strict"

import React from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import {datePart, timePart} from '../util/datetime';
import { TicketActions } from '../actions/ticketActions';

function getSeatClass(cls) {
    switch (cls) {
        case '1':
        case 1:
            return 'First';
        case '2':
        case 2:
            return 'Business';
        case '3':
        case 3:
            return 'Economy';
        default:
            return 'Unknown';
    }
}

function createSeatRow(flight, seat) {
    // TODO: Once seat object includes flight details, drop flight parameter
    const seatId = `${seat.seat_row}${seat.seat}`;
    return (
        <tr key={seatId} onClick={() => TicketActions.selectSeat(flight, seat.seat_row, seat.seat)}>
            <td> {seatId} </td>
            <td> $100 </td>
            <td> {getSeatClass(seat.class)} </td>
            <td className="button-col">
                <button className="blue-btn btn btn-sm" >
                    Select
                </button>
            </td>
        </tr>
    );
}

function flightOrPlaceholder(flight) {
    if (flight) {
        return flight;
    } else {
        return {
            departure: 'Unknown',
            departure_date: 'Unknown',
            destination: 'Unknown ',
            arrival_date: 'Unknown',
            flight_number: 'Placeholder'
        };
    }
}

function FlightDetailsHeader(props) {
    return (<div className="flight_info container">
        <div className="row">
            <div className="col-4" key={props.flight.departure}>
                <div> {props.flight.departure} </div>
                <div> {datePart(props.flight.departure_date)} </div>
                <div> {timePart(props.flight.departure_date)} </div>
            </div>
            <div className="col-4">
                <img src="./images/plane_icon.png" width={72} />
            </div>
            <div className="col-4" key={props.flight.destination}>
                <div> {props.flight.destination} </div>
                <div> {datePart(props.flight.arrival_date)} </div>
                <div> {timePart(props.flight.arrival_date)} </div>
            </div>
        </div>
    </div>);
}

FlightDetailsHeader.propTypes = {
    flight: PropTypes.object.isRequired
}

export class FlightDetails extends React.Component {
    render() {
        const flight = flightOrPlaceholder(this.props.flight);
        return (
            <div className="seat-list">
                <FlightDetailsHeader flight={flight} />

                <Table responsive className="table">
                    <thead>
                        <tr>
                            <th scope="col">Seat</th>
                            <th scope="col">Price</th>
                            <th scope="col">Class</th>
                            <th scope="col" className="button-col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.seatList.filter((seat) => !seat.reserved).map((seat) => createSeatRow(flight, seat))}
                    </tbody>
                </Table>
            </div>);
    }
}

FlightDetails.propTypes = {
    flight: PropTypes.object,
    seatList: PropTypes.array
};
