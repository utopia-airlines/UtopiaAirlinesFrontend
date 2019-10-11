"use strict";

import { EventEmitter } from "events";
import Dispatcher from '../dispatcher/appDispatcher';
import { ERROR_ACTIONS } from "../actions/errorActions";

let _errorStore = {
    errors: [],
    lastNumber: -1
}

const CHANGE_EVENT = 'change';

class ErrorStoreClass extends EventEmitter {
    addChangeListener(cb) {
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getAllErrors() {
        return _errorStore.errors;
    }
}

const ErrorStore = new ErrorStoreClass();

function pushError(err) {
    const errNum = ++_errorStore.lastNumber;
    _errorStore.errors.push([errNum, err]);
}

Dispatcher.register((action) => {
    switch (action.type) {
        case ERROR_ACTIONS.SHOW_ERROR:
            pushError(action.value);
            break;
        case ERROR_ACTIONS.DISMISS_ERROR:
            _errorStore.errors = _errorStore.errors.filter((pair) => pair[0] !== action.value);
            break;
        default:
            return;
    }
    ErrorStore.emitChange();
});

export default ErrorStore;