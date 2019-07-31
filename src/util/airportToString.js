export function airportToString(airport) {
    if (typeof airport === 'string') {
        return airport;
    } else if (typeof airport === 'undefined') {
        return 'Unknown';
    } else if (airport.name && !airport.code) {
        return airport.name;
    } else if (airport.code && !airport.name) {
        return airport.code;
    } else {
        return `${airport.name} (${airport.code})`;
    }
}