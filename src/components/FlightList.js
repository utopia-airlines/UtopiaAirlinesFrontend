"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { FlightActions } from '../actions/flightActions';
import {datePart, timePart} from '../util/datetime';

function prettyPrintDate(dateString) {
    return `${timePart(dateString)} ${datePart(dateString)}`;
}
function FlightRow(props) {
    return (
        <tr key={props.flight.flight_number} onClick={() => FlightActions.selectFlight(props.flight)}>
            <td> {props.flight.flight_number} </td>
            <td> {prettyPrintDate(props.flight.departure_date)} </td>
            <td> {props.flight.departure} </td>
            <td> {prettyPrintDate(props.flight.arrival_date)} </td>
            <td> {props.flight.destination} </td>
            <td> <button className="blue-btn btn button-sm" onClick={() => FlightActions.selectFlight(props.flight)}>
                Select</button></td>
        </tr>
    );
}

FlightRow.propTypes = {
    flight: PropTypes.shape({
        flight_number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        departure_date: PropTypes.string,
        departure: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        arrival_date: PropTypes.string,
        destination: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    })
}

function FlightListHeader() {
    return (
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
    );
}

export function FlightList(props) {
    return (
        <div>
            <h1>Available Flights</h1>
            <Table responsive className="table flights-table">
                <FlightListHeader />
                <tbody>
                    {props.flightList.map((flight) => <FlightRow flight={flight} key={flight} />)}
                </tbody>
            </Table>
        </div>
    );
}

FlightList.propTypes = {
    flightList: PropTypes.array.isRequired
};



