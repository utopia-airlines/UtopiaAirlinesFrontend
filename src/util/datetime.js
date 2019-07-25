// TODO: Customize the formatting based on the user's locale!

function datePart(dateTimeString) {
    const date = new Date(dateTimeString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

function timePart(dateTimeString) {
    const date = new Date(dateTimeString);
    return `${date.getHours()}:${date.getMinutes()}`;
}

exports.datePart = datePart;
exports.timePart = timePart;