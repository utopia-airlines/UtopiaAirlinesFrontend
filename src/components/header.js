"use strict"

import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {TicketActions} from '../actions/ticketActions';

function handleBookingCodeSubmission(event) {
    const textField = event.target[0];
    const code = textField.value.toLowerCase();
    event.preventDefault();
    event.stopPropagation();
    if (/^[a-f0-9]{32,32}$/.test(code)) {
        textField.setCustomValidity('');
        TicketActions.showBookingDetails({bookingId: code});
    } else {
        textField.setCustomValidity('Invalid booking code');
    }
}

function BookingCodeForm() {
    return (
        <Form inline className="float-right navbar-nav flex-row ml-md-auto d-none d-sm-flex"
            onSubmit={handleBookingCodeSubmission}>
            <InputGroup>
                <InputGroup.Prepend id="booking-code-input-label">
                    <Navbar.Text>Enter booking code:&nbsp;&nbsp;</Navbar.Text>
                    <InputGroup.Text><i>#</i></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="Booking Code" aria-label="Booking Code"
                    aria-describedby="booking-code-input-label" pattern="[a-fA-F0-9]{32}" />
            </InputGroup>
        </Form>);
}

export default function Header() {
    return (
        <Navbar className="navbar navbar-default sticky-top navbar-expand flex-column flex-md-row bd-navbar" bg="light">
            <div className="d-sm-none">
                <button className="btn btn-outline-secondary" type="button">
                    <i className="fa fa-list">{/*TODO: Does this need an extra inclusion?*/}</i>
                </button>
            </div>
            <Navbar.Brand className="logo navbar-brand d-none d-sm-block">
                <Link to="/" className="navbar-brand">
                    <img width="90px" height="30px" src="images/logo.png"
                        className="d-inline-block align-top" alt="Utopia Airlines logo" />
                    {' Home'}
                </Link>
            </Navbar.Brand>
            <BookingCodeForm />
            {/*TODO: Add log-in/sign-up links?*/}
        </Navbar>
    );
}