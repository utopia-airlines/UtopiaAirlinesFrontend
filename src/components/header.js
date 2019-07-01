"use strict"

import React from 'react';
import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img width="90px" height="30px" src="images/logo.png" />
                </Link>
                <ul className="nav navbar-nav">
                    <li><Link to="/" replace>Home</Link></li>
                    {/* TODO: make asking for booking ID a modal dialog */}
                    <li><Link to="/enter-booking-id" replace>Enter Booking ID</Link></li>
                </ul>
            </div>
        </nav>
    );
}