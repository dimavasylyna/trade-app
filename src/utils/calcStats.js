export class RunningStatsCalculator {
    constructor() {
        this.count = 0;
        this._mean = 0;
        this._dSquared = 0;
        this._time = 0;
    }

    update(newValue) {
        this.count++;
        const t0 = performance.now();
        const meanDifferential = (newValue - this._mean) / this.count;
        const newMean = this._mean + meanDifferential;
        const dSquaredIncrement = (newValue - newMean) * (newValue - this._mean);
        const newDSquared = this._dSquared + dSquaredIncrement;
        const t1 = performance.now();
        const newTime = t1 - t0;
        this._mean = newMean;
        this._dSquared = newDSquared;
        this._time += newTime;
    }

    get mean() {
        this.validate();
        return this._mean;
    }

    get dSquared() {
        this.validate();
        return this._dSquared;
    }

    get populationVariance() {
        return this.dSquared / this.count
    }

    get populationStdev() {
        return Math.sqrt(this.populationVariance)
    }

    get sampleVariance() {
        return this.count > 1 ? this.dSquared / (this.count - 1) : 0
    }

    get sampleStdev() {
        return Math.sqrt(this.sampleVariance)
    }
    get time() {
        return this._time;
    }

    validate() {
        if (this.count == 0) {
            throw new StatsError('Mean is undefined');
        }
    }
}

class StatsError extends Error {
    constructor(...params) {
        super(...params)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, StatsError);
        }
    }
}