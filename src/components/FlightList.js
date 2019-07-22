"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { FlightActions } from '../actions/flightActions';
import {datePart, timePart} from '../util/datetime';

function prettyPrintDate(dateString) {
    return `${timePart(dateString)} ${datePart(dateString)}`;
}
function createFlightRow(flight) {
    return (
        <tr key={flight.flight_number} onClick={() => FlightActions.selectFlight(flight)}>
            <td> {flight.flight_number} </td>
            <td> {prettyPrintDate(flight.departure_date)} </td>
            <td> {flight.departure} </td>
            <td> {prettyPrintDate(flight.arrival_date)} </td>
            <td> {flight.destination} </td>
            <td> <button className="blue-btn btn button-sm">
                Select{/* FIXME: Add handler */}</button></td>
        </tr>
    );
}

export function FlightList(props) {
    return (
        <div>
            <h1>Available Flights</h1>
            <Table className="table flights-table">
                <thead id="flight-search-bar">
                    <tr>
                        <th scope="col">{'Flight #'}</th>
                        <th scope="colgroup" colSpan={2}>Departing</th>
                        <th scope="colgroup" colSpan={2}>Arriving</th>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <th scope="col"><input type="date" id="departureDate" />&nbsp;&nbsp;from&nbsp;&nbsp;</th>
                        <th scope="col"><input maxLength={3} id="origin" width="5" /></th>
                        <th scope="col"><input type="date" id="arrivalDate" />&nbsp;&nbsp;to&nbsp;&nbsp;</th>
                        <th scope="col"><input maxLength={3} id="destination" width="5" /></th>
                        <th scope="col"><button className="orange-btn btn btn-sm" id="submitFilter">
                            Search{/*FIXME: Add click handler*/}</button></th>
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



