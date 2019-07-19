import React from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import {datePart, timePart} from '../util/datetime';

function getSeatClass(cls) {
    switch (cls) {
        case '1':
            return 'First';
        case '2':
            return 'Business';
        case '3':
            return 'Economy';
        default:
            return 'Unknown';
    }
}

function createSeatRow(seat) {
    const seatId = `${seat.seat_row}${seat.seat}`;
    return (
        <tr key={seatId} onClick={null}>
            {/*FIXME: Handle clicks on the row by doing something!*/}
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

export class FlightDetails extends React.Component {
    render() {
        return (
            <div className="seat-list">
                <div className="flight_info container">
                    <div className="row">
                        <div className="col-4">
                            <div> {this.props.flight.departure} </div>
                            <div> {datePart(this.props.flight.departure_date)} </div>
                            <div> {timePart(this.props.flight.departure_date)} </div>
                        </div>
                        <div className="col-4">
                            <img src="./resources/plane_icon_72.png" />
                        </div>
                        <div className="col-4">
                            <div> {this.props.flight.destination} </div>
                            <div> {datePart(this.props.flight.arrival_date)} </div>
                            <div> {timePart(this.props.flight.arrival_date)} </div>
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
                        {this.props.seatList.map(createSeatRow)}
                    </tbody>
                </Table>
            </div>);
    }
}

FlightDetails.propTypes = {
    flight: PropTypes.object.isRequired,
    seatList: PropTypes.array.isRequired
};
