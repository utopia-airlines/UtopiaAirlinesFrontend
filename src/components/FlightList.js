"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';

function createFlightRow(flight) {
    return (
        <tr key={flight.flight_number}>
            <td> {flight.flight_number} </td>
            <td> {flight.departure} </td>
            <td> {flight.departure_date} </td>
            <td> {flight.destination} </td>
            <td> {flight.arrival_date} </td>
        </tr>
    );
}

export function FlightList(props) {
    return (
        <div>
            <h1>Available Flights</h1>
            <Table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Departure</th>
                        <th>Departure Date/Time</th>
                        <th>Destination</th>
                        <th>Arrival Date/Time</th>
                    </tr>
                </thead>
                <tbody>
                    {props.flightList.map(createFlightRow)}
                </tbody>
            </Table>
        </div>
    );
}

FlightList.propTypes = {
    flightList: PropTypes.array.isRequired
};



