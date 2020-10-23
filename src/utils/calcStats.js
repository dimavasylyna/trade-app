export function getMean(arr) {
    return Math.round(arr.reduce((a, b) => (a + b)) / arr.length);
}

export function getSD(arr, mean) {
    return Math.round(Math.sqrt(arr.reduce(function (sq, n) {
        return sq + Math.pow(n - mean, 2);
    }, 0) / (arr.length - 1)));
}
