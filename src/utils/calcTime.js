export default class Time {
    constructor() {
        this.timers = {}
        this.totalCalcTime = 0
    }

    calcTime(func, timer) {
        let _this = this;
        return function() {
            let t0 = performance.now();
            let result = func.apply(null, arguments);

            // час для останнього виклику ф-ції
            _this.timers[timer] = performance.now() - t0;
            _this.totalCalcTime +=_this.timers[timer];

            // загальний час для декількох викликів ф-ції
            // if (!_this.timers[timer]) {
            //     _this.timers[timer] = 0;
            // }
            // _this.timers[timer] += performance.now() - t0;

            return result;
        }
    }
}