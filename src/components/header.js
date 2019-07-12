"use strict"

import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {TicketActions} from '../actions/ticketActions';
import Alert from 'react-bootstrap/Alert';

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

function OptionalError(props) {
    if (props.error) {
        return <Alert variant='danger' dismissible onClose={() => TicketActions.clearError()}>
            {props.error}
        </Alert>;
    } else {
        return <Alert variant='danger' show={false} dismissible>No error currently</Alert>;
    }
}

export default function Header(props) {
    return (
        <Navbar className="navbar navbar-default" bg="light">
            <Navbar.Brand>
                <Link to="/" className="navbar-brand">
                    <img width="90px" height="30px" src="images/logo.png"
                        className="d-inline-block align-top" alt="Utopia Airlines logo" />
                    {' Home'}
                </Link>
            </Navbar.Brand>
            <Form inline className="float-right" onSubmit={handleBookingCodeSubmission}>{/* FIXME: This doesn't actually right-align!*/}
                <InputGroup>
                    <InputGroup.Prepend id="booking-code-input-label">
                        <Navbar.Text>Enter booking code:</Navbar.Text>
                        <InputGroup.Text>#</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder="Booking Code" aria-label="Booking Code"
                        aria-describedby="booking-code-input-label" pattern="[a-fA-F0-9]{32}" />
                </InputGroup>
            </Form>
            <OptionalError {...props} />
        </Navbar>
    );
}