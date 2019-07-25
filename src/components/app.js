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
import { BookingDetails } from './BookingDetails';
import { TicketActions } from '../actions/ticketActions';

function currentFlightOrPlaceholder(flight) {
    if (typeof flight === 'string' || typeof flight === 'number') {
        return {
            departure: 'Unknown',
            departure_date: 'Unknown',
            destination: 'Unknown ',
            arrival_date: 'Unknown',
            flight_number: flight
        };
    } else {
        return flight;
    }
}

function currentBookingOrPlaceholder(booking) {
    if (typeof booking === 'string') {
        return {
            bookingId: booking,
            price: 'Unknown',
            reservationTimeout: 'Unknown',
            reserved: null,
            seatClass: 'Unknown',
            flight: currentFlightOrPlaceholder('Unknown'),
            row: 'Unknown',
            seat: 'Unknown'
        }
    } else {
        return booking;
    }
}

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flightList:[],
            selectedFlight: null,
            seatList: [],
            selectedSeat: null,
            bookedTicket: null,
            bookingFailureReason: null,
            paymentResult: null,
            globalError: null
        };
    }

    render() {
        const currentFlight = currentFlightOrPlaceholder(this.state.selectedFlight);
        const currentBooking = currentBookingOrPlaceholder(this.state.bookedTicket);
        return (
            <div>
                <Header error={this.state.globalError} />
                <div className="app-container">
                    <Switch>
                        <Route exact path='/' render={(props) => (<FlightList {...props} flightList={this.state.flightList} />)}/>
                        <Route path='/flight/:flightNumber' render={(props) => (<FlightDetails key={currentFlight} flight={currentFlight} seatList={this.state.seatList} {...props} />)}/>
                        <Route path='/flights' render={(props) => (<Flights {...props} flightList={this.state.flightList} />)}/>
                        <Route path='/booking/:bookingId' render={() => (<BookingDetails key={currentBooking} booking={currentBooking} />)} />
                    </Switch>
                </div>
            </div>
        );
    }

    componentDidMount() {
        FlightStore.addChangeListener(this._onFlightChange.bind(this));
        TicketStore.addChangeListener(this._onTicketChange.bind(this));
        FlightActions.filterSearch((arg) => arg);
        if (/^#\/flight\/[0-9]*\/?$/.test(window.location.hash)) {
            const flightFromUrl = window.location.hash.replace(/^#\/flight\//, '').replace(/\/$/, '');
            FlightActions.selectFlight(flightFromUrl);
        } else if (/^#\/booking\/[0-9a-z]*\/?$/.test(window.location.hash)) {
            const bookingFromUrl = window.location.hash.replace(/^#\/booking\//, '').replace(/\/$/, '');
            TicketActions.showBookingDetails(bookingFromUrl);
        }
    }

    componentWillUnmount() {
        FlightStore.removeChangeListener(this._onFlightChange.bind(this));
        TicketStore.removeChangeListener(this._onTicketChange.bind(this));
    }

    _onFlightChange() {
        const oldLocation = window.location.hash;
        const oldSelectedFlight = this.state.selectedFlight;
        const newSelectedFlight = FlightStore.getSelectedFlight();
        this.setState({
            flightList: FlightStore.getFilteredFlights(),
            selectedFlight: newSelectedFlight,
            seatList: FlightStore.getSeats()
        });
        if ((newSelectedFlight && oldLocation !== '#/flight/' + newSelectedFlight.flight_number) || (newSelectedFlight && !oldSelectedFlight)) {
            window.location.hash = '#/flight/' + newSelectedFlight.flight_number;
        }
    }

    _onTicketChange() {
        const oldLocation = window.location.hash;
        const oldBookedTicket = this.state.bookedTicket;
        const newBookedTicket = TicketStore.getBookedTicket();
        this.setState({
            globalError: TicketStore.getGlobalError(),
            bookedTicket: newBookedTicket
        });
        if ((newBookedTicket && oldLocation !== '#/booking/' + newBookedTicket.bookingId) ||
                (oldBookedTicket !== newBookedTicket && newBookedTicket)) {
            window.location.hash = '#/booking/' + newBookedTicket.bookingId;
        }
    }
}
