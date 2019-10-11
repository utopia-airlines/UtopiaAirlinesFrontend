"use strict";

import { Dispatcher } from 'flux';

class DispatcherClass extends Dispatcher {
    /**
     * It isn't clear to me whether Axios passes 400-level responses to the "accepted" or "rejected"
     * lambda when its promises' then() method is called, so we want to always check that the API
     * returned a "success code." But because this pattern should be used all over the place, it
     * seemed better to implement it once and call that implementation everywhere.
     *
     * @param {object} response the Axios response to dispatch based on
     * @param {number} response.status the HTTP status code associated with the response
     * @param {object} onSuccess the message to dispatch if the status code is in the 200 series
     * @param {string} onSuccess.type the message tag
     * @param {any} onSuccess.value the message value
     * @param {object} onError the message to dispatch otherwise
     * @param {string} onError.type the message tag
     * @param {any} onError.value the message value
     * @param {any} [onError.extra] an object the developer may want to inspect on error
     */
    dispatchOnResponse(response, onSuccess, onError) {
        if (response && response.status && response.status >= 200 && response.status < 300) {
            this.dispatch(onSuccess);
        } else {
            this.dispatch(onError);
        }
    }
}

const AppDispatcher = new DispatcherClass();

export default AppDispatcher;