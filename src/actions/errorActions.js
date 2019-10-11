"use strict";

import Dispatcher from '../dispatcher/appDispatcher';

export const ERROR_ACTIONS = {
    SHOW_ERROR: 'errorActions.ShowError',
    DISMISS_ERROR: 'errorActions.DismissError'
}

export const ErrorActions = {
    showError: function(err) {
        Dispatcher.dispatch({
            type: ERROR_ACTIONS.SHOW_ERROR,
            value: err
        });
    },

    dismissError: function(errId) {
        Dispatcher.dispatch({
            type: ERROR_ACTIONS.DISMISS_ERROR,
            value: errId
        });
    }
}