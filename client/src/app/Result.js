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
        if (!isNaN(num)) {
            this.values[id] = num;
        }
    }

    collectSum() {
        let sum = 0;
        Object.values(this.values).forEach((val) => {
            sum += val;
        });
        return sum;
    }

    submit() {
        this.average = this.collectSum()/Object.values(this.values).length;
		this.processRecommended();
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
                if (valLow < valHigh) {
                    this.recommended = low;
                    break;
                }
                else if (valLow > valHigh) {
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