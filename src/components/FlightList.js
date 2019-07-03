"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import {FlightActions} from '../actions/flightActions';


export class FlightList extends React.Component {

    createFlightRow(flight) {
        return (
            <tr key={flight.id}>
                <td> {flight.id} </td>
                <td> {flight.departure} </td>
                <td> {flight.departureDate} </td>
                <td> {flight.destination} </td>
                <td> {flight.arrivalDate} </td>
            </tr>
        );
    }

    componentWillMount() {
        FlightActions.filterSearch();
    }

    render() {
        return(
            <div>
                <h1>Available Flights</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.flightList.map(this.createFlightRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
}

FlightList.propTypes = {
    flightList: PropTypes.array.isRequired
};



