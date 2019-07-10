"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from './header';
import {Flights} from './Flights';
import FlightStore from '../stores/flightStore';
import {FlightList} from './FlightList';
import {FlightActions} from '../actions/flightActions';

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
                    <Route exact path='/' component={(props) => (<FlightList {...props} flightList={this.state.flightList} />)}/>
                    <Route path='/flights' render={(props) => (<Flights {...props} flightList={this.state.flightList} />)}/>
                </Switch>
            </div>
        );
    }

    componentDidMount() {
        FlightStore.addChangeListener(this._onFlightChange.bind(this));
        FlightActions.filterSearch((arg) => arg);
    }

    componentWillUnmount() {
        FlightStore.removeChangeListener(this._onFlightChange.bind(this));
    }

    _onFlightChange() {
        this.setState({flightList: FlightStore.getAllFlights()});
    }
}