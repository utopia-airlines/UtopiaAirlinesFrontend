"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from './header';
import {Books} from './books';
import FlightStore from '../stores/flightStore';
import {FlightList} from './FlightList';

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookList:[]
        };
    }

    render() {
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={FlightList}/>
                    <Route path='/books' render={(props) => (<Books {...props} bookList={this.state.bookList} />)}/>
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