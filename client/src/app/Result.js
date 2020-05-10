class Result {

    constructor() {
        this.clear();
    }

    addResult(res) {
        let num = parseFloat(res);
        if (isNaN(num)) {
            num = 0;
        }
        this.sum += num;
        this.count += 1;
    }

    clear() {
        this.average = null;
        this.recommended = null;
        this.sum = 0;
        this.count = 0;
    }

    submit() {
        this.average = this.sum/this.count;
		this.processRecommended();
    }

    processRecommended() {
        const values = [
            0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100
        ];
        let low = 0;
        let high = 0;
        for(var i = 0; i < values.length; i++) {
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

}

export default Result;