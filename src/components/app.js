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
import { TicketDetails} from './TicketDetails';
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

function currentTicketOrPlaceholder(ticket) {
    if (typeof ticket === 'object') {
        return ticket;
    } else {
        return {
            flight: {
                arrival_date: 'Unknown',
                departure: 'Unknown', // FIXME: Make backends return full airport
                departure_date: 'Unknown',
                destination: 'Unknown ', // terminal space is deliberate; this and departure are used as React keys
                flight_number: 'Unknown'
            },
            row: 'Unknown',
            seat: 'Unknown'
        };
    }
}

function parseSeatFromURL(fragment) {
    const flight = fragment.replace(/\/row\/[0-9]*\/seat\/[A-Za-z]\/?$/, '');
    const row = fragment.replace(/^[0-9]*\/row\//, '').replace(/\/seat\/[A-Za-z]\/?$/, '');
    const seat = fragment.replace(/^[0-9]*\/row\/[0-9]*\/seat\//, '').replace(/\/?$/, '');
    TicketActions.selectSeat(flight, row, seat);
}

const initialDataHandlers = [[/^#\/flight\/[0-9]*\/?$/, /^#\/flight\//, FlightActions.selectFlight],
    [/^#\/booking\/[0-9a-z]*\/?$/, /^#\/booking\//, TicketActions.showBookingDetails],
    [/^#\/flight\/[0-9]*\/row\/[0-9]*\/seat\/[A-Za-z]\/?$/, /^#\/flight\//, parseSeatFromURL]]

function getDataFromInitialURL(url) {
    for (const tuple of initialDataHandlers) {
        const [pattern, replacement, callback] = tuple;
        // @ts-ignore
        if (pattern.test(url)) {
            // @ts-ignore
            callback(url.replace(replacement, '').replace(/\/$/, ''));
        }
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
        const currentTicket = currentTicketOrPlaceholder(this.state.selectedSeat);
        return (
            <div>
                <Header error={this.state.globalError} />
                <div className="app-container">
                    <Switch>
                        <Route exact path='/' render={(props) => (<FlightList {...props} flightList={this.state.flightList} />)}/>
                        <Route path='/flight/:flightNumber/row/:row/seat/:seat' render={(props) => <TicketDetails key={currentTicket} ticket={currentTicket} {...props} />} />
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
        getDataFromInitialURL(window.location.hash);
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
        const oldSelectedSeat = this.state.selectedSeat;
        const newSelectedSeat = TicketStore.getSelectedSeat();
        this.setState({
            globalError: TicketStore.getGlobalError(),
            bookedTicket: newBookedTicket,
            selectedSeat: newSelectedSeat
        });
        if ((newSelectedSeat &&
                oldLocation !== `#/flight/${newSelectedSeat.flight.flight_number}/row/${newSelectedSeat.row}/seat/${newSelectedSeat.seat}`) ||
                (oldSelectedSeat != newSelectedSeat && newSelectedSeat)) {
            window.location.hash = `#/flight/${newSelectedSeat.flight.flight_number}/row/${newSelectedSeat.row}/seat/${newSelectedSeat.seat}`;
        } else if ((newBookedTicket && oldLocation !== '#/booking/' + newBookedTicket.bookingId) ||
                (oldBookedTicket !== newBookedTicket && newBookedTicket)) {
            window.location.hash = '#/booking/' + newBookedTicket.bookingId;
        }
    }
}
