import moment from 'moment';

export function formatNumber2Digits(number) {
    if (number < 10) {
        return "0" + number;
    }
    return number;
}

export function formatDateTime(date) {
    return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
}