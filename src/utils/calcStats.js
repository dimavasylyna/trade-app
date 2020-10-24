import Time from "./calcTime";
let time = new Time();

function getMean(arr) {
    return Math.round(arr.reduce((a, b) => (a + b)) / arr.length);
}
function getSD(arr, mean) {
    return Math.round(Math.sqrt(arr.reduce(function (sq, n) {
        return sq + Math.pow(n - mean, 2);
    }, 0) / (arr.length - 1)));
}


export function calcMean(arr) {
    return time.calcTime(getMean, 'mean')(arr);
}

export function calcSD(arr, mean) {
    return time.calcTime(getSD, 'sd')(arr, mean);
}

export { time }