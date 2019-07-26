// TODO: Customize the formatting based on the user's locale!

function datePart(dateTimeString) {
    const date = new Date(dateTimeString);
    if (isNaN(date.getMonth())) {
        return 'Unknown';
    }
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

function timePart(dateTimeString) {
    const date = new Date(dateTimeString);
    if (isNaN(date.getHours())) {
        return 'Unknown';
    }
    return `${date.getHours()}:${date.getMinutes()}`;
}

exports.datePart = datePart;
exports.timePart = timePart;