import React from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import {datePart, timePart} from '../util/datetime';

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
                        {/*
                        <tr>
                            <td>1-a</td>
                            <td>$100</td>
                            <td>First</td>
                            <td className="button-col">
                                <button className="blue-btn btn btn-sm" >
                                    Select
                                </button>
                            </td>
                        </tr> */}
                    </tbody>
                </Table>
            </div>);
    }
}

FlightDetails.propTypes = {
    flight: PropTypes.object.isRequired
};
