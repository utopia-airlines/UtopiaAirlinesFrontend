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

function sameDate(dateOne, dateTwo) {
    // The Date constructor will parse a string or number into a Date. If passed a
    // Date it will convert it to a string and reparse it in ES5, which basically
    // throws away the milliseconds (which we don't care about here), and constructs
    // an identical Date in ES6. However, parsing a string properly can be
    // browser-dependent behavior.
    const dateOneObj = new Date(dateOne);
    const dateTwoObj = new Date(dateTwo);
    return dateOneObj.getFullYear() == dateTwoObj.getFullYear() &&
        dateOneObj.getMonth() == dateTwoObj.getMonth() && dateOneObj.getDay() == dateTwoObj.getDay();
}

function sameAirport(code, airport) {
    if (typeof airport === 'string') {
        return code.toLowerCase() === airport.toLowerCase();
    } else if (airport && airport.code) {
        return sameAirport(code, airport.code);
    } else {
        return false;
    }
}

class FlightListHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departureDate: '',
            origin: '',
            arrivalDate: '',
            destination: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit() {
        FlightActions.filterSearch((flights) => {
            return flights.filter((flight) => {
                if (this.state.departureDate && !sameDate(this.state.departureDate, flight.departure_date)) {
                    return false;
                } else if (this.state.origin && !sameAirport(this.state.origin, flight.departure)) {
                    return false;
                } else if (this.state.arrivalDate && !sameDate(this.state.arrivalDate, flight.arrival_date)) {
                    return false;
                } else if (this.state.destination && !sameAirport(this.state.destination, flight.destination)) {
                    return false;
                } else {
                    return true;
                }
            });
        });
        event.preventDefault();
    }

    render() {
        // FIXME: Allow submitting from any control. Obvious routes won't work: <form> can't be nested inside
        // <tr>, <thead>, or <table>. If we define the form outside the table, that means this component is
        // no longer self-contained.
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
                    <th scope="col"><input type="date" id="departureDate" onChange={this.handleChange} />&nbsp;&nbsp;from&nbsp;&nbsp;</th>
                    <th scope="col"><input maxLength={3} id="origin" width="5" onChange={this.handleChange} /></th>
                    <th scope="col"><input type="date" id="arrivalDate" onChange={this.handleChange} />&nbsp;&nbsp;to&nbsp;&nbsp;</th>
                    <th scope="col"><input maxLength={3} id="destination" width="5" onChange={this.handleChange} /></th>
                    <th scope="col"><button className="orange-btn btn btn-sm" id="submitFilter" onClick={this.handleSubmit} >
                        Search</button></th>
                </tr>
            </thead>
        );
        }
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



