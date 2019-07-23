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

export class FlightDetails extends React.Component {
    render() {
        const flight = flightOrPlaceholder(this.props.flight);
        return (
            <div className="seat-list">
                <div className="flight_info container">
                    <div className="row">
                        <div className="col-4" key={flight.departure}>
                            <div> {flight.departure} </div>
                            <div> {datePart(flight.departure_date)} </div>
                            <div> {timePart(flight.departure_date)} </div>
                        </div>
                        <div className="col-4">
                            <img src="./resources/plane_icon_72.png" />
                        </div>
                        <div className="col-4" key={flight.destination}>
                            <div> {flight.destination} </div>
                            <div> {datePart(flight.arrival_date)} </div>
                            <div> {timePart(flight.arrival_date)} </div>
                        </div>
                    </div>
                </div>

                <Table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Seat</th>
                            <th scope="col">Price</th>
                            <th scope="col">Class</th>
                            <th scope="col" className="button-col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.seatList.map((seat) => createSeatRow(flight, seat))}
                    </tbody>
                </Table>
            </div>);
    }
}

FlightDetails.propTypes = {
    flight: PropTypes.object,
    seatList: PropTypes.array
};
