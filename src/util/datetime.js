"use strict"

function datePart(dateTimeString) {
    const date = new Date(dateTimeString);
    if (isNaN(date.getMonth())) {
        return 'Unknown';
    }
    return date.toLocaleDateString();
}

function timePart(dateTimeString) {
    const date = new Date(dateTimeString);
    if (isNaN(date.getHours())) {
        return 'Unknown';
    }
    try {
        return date.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'});
    } catch (e) {
        // If e.name === 'RangeError', browser most likely doesn't support options parameter
        return `${date.getHours()}:${date.getMinutes()}`;
    }
}

exports.datePart = datePart;
exports.timePart = timePart;