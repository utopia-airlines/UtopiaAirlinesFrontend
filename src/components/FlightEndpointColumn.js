import React from 'react';
import PropTypes from 'prop-types';
import { airportToString } from '../util/airportToString';
import { datePart, timePart } from '../util/datetime';

export function FlightEndpointColumn(props) {
    const airport = props.airport;
    return <div className="col-sm" key={airport.code}>
        <div>{airportToString(airport)}</div>
        <div>{datePart(props.date)}</div>
        <div>{timePart(props.date)}</div>
    </div>
}

FlightEndpointColumn.propTypes = {
    airport: PropTypes.object,
    date: PropTypes.string
}