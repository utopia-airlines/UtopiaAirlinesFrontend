"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from './header';
import {Flights} from './Flights';
import FlightStore from '../stores/flightStore';
import {FlightList} from './FlightList';

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flightList:[]
        };
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={FlightList}/>
                    <Route path='/books' render={(props) => (<Flights {...props} flightList={this.state.flightList} />)}/>
                </Switch>
            </div>
        );
    }

    componentWillMount() {
        FlightStore.addChangeListener(this._onFlightChange.bind(this));
    }

    componentWillUnmount() {
        FlightStore.removeChangeListener(this._onFlightChange.bind(this));
    }

    _onFlightChange() {
        this.setState({flightList: FlightStore.getAllFlights()});
    }
}