function datePart(dateTimeString) {
    return new Date(dateTimeString).toDateString();
}

function timePart(dateTimeString) {
    return new Date(dateTimeString).toTimeString();
}

exports.datePart = datePart;
exports.timePart = timePart;