"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import {FlightList} from '../components/FlightList';

export class Flights extends React.Component {

    render() {
        return (
            <div>
                <FlightList flightList = {this.props.flightList} />
            </div>
        );
    }
}

Flights.propTypes = {
    flightList: PropTypes.array.isRequired
};
