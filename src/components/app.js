"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from './header';
import {Flights} from './Flights';
import FlightStore from '../stores/flightStore';
import {FlightList} from './FlightList';
import {FlightActions} from '../actions/flightActions';
import {FlightDetails} from './FlightDetails';
import TicketStore from '../stores/ticketStore';

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flightList:[],
            selectedFlight: null,
            selectedSeat: null,
            bookedTicket: null,
            bookingFailureReason: null,
            paymentResult: null,
            globalError: null
        };
    }

    render() {
        return (
            <div>
                <Header error={this.state.globalError} />
                <div className="app-container">
                    <Switch>
                        <Route exact path='/' render={(props) => (<FlightList {...props} flightList={this.state.flightList} />)}/>
                        <Route path='/#/flights' render={(props) => (<Flights {...props} flightList={this.state.flightList} />)}/>
                        <Route path='/#/flight/:flightNumber' render={(props) => (<FlightDetails flight={this.state.selectedFlight} {...props} />)}/>
                    </Switch>
                </div>
            </div>
        );
    }

    componentDidMount() {
        FlightStore.addChangeListener(this._onFlightChange.bind(this));
        TicketStore.addChangeListener(this._onTicketChange.bind(this));
        FlightActions.filterSearch((arg) => arg);
    }

    componentWillUnmount() {
        FlightStore.removeChangeListener(this._onFlightChange.bind(this));
    }

    _onFlightChange() {
        const oldSelectedFlight = this.state.selectedFlight;
        const newSelectedFlight = FlightStore.getSelectedFlight();
        this.setState({
            flightList: FlightStore.getFilteredFlights(),
            selectedFlight: newSelectedFlight
        });
        if (oldSelectedFlight !== newSelectedFlight && newSelectedFlight) {
            history.pushState(null, 'Flight Details', '/#/flight/' + newSelectedFlight.flight_number);
        }
    }

    _onTicketChange() {
        const oldBookedTicket = this.state.bookedTicket;
        const newBookedTicket = TicketStore.getBookedTicket();
        this.setState({
            globalError: TicketStore.getGlobalError(),
            bookedTicket: newBookedTicket
        });
        if (oldBookedTicket !== newBookedTicket && newBookedTicket) {
            history.pushState(null, 'Booking Details', '/#/booking/' + newBookedTicket.data.bookingId);
        }
    }
}
