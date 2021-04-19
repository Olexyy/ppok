class Result {

    constructor() {
        this.clear();
    }

    clear() {
        this.values = {};
        this.average = null;
        this.recommended = null;
    }

    addResult(res, id) {
        let num = parseFloat(res);
        if (isNaN(num)) {
            num = 0;
        }
        this.values[id] = num;
    }

    collectCount() {
        let count = 0;
        Object.values(this.values).forEach((val) => {
            if (val > 0) {
                count += 1;
            }
        });
        return count;
    }

    collectSum() {
        let sum = 0;
        Object.values(this.values).forEach((val) => {
            sum += val;
        });
        return sum;
    }

    submit() {
        const count = this.collectCount();
        if (count) {
            this.average = this.collectSum()/count;
            this.processRecommended();
        }

    }

    processRecommended() {
        const values = [
            0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100
        ];
        let low = 0;
        let high = 0;
        for(let i = 0; i < values.length; i++) {
            if (this.average > values[i]) {
                low = values[i];
            }
            else if (this.average === values[i]) {
                this.recommended = values[i];
                break;
            }
            else {
                high = values[i];
                let valLow = this.recommended - low;
                let valHigh = high - this.recommended;
                if (valLow <= valHigh) {
                    this.recommended = low;
                    break;
                }
                else {
                    this.recommended = high;
                    break;
                }
            }
        }
    }

    stringify() {
        return JSON.stringify(this);
    }

}

export default Result;