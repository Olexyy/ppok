class Timer {

    constructor() {
        this.sec = 0;
        this.stopped = true;
        this.time = '';
    }

    processTime() {
        this.sec += 1;
        let timeObj = new Date(null);
        timeObj.setSeconds(this.sec);
        let min = timeObj.getUTCMinutes();
        let sec = timeObj.getUTCSeconds();
        let hour = timeObj.getUTCHours();
        if (min <= 9) min = `0${min}`;
        if (sec <= 9) sec = `0${sec}`;
        if (hour <= 9) hour = `0${hour}`;
        this.time = `${hour}:${min}:${sec}`;
    }

    start() {
        if (this.stopped) {
            this.stopped = false;
            const handle = setInterval(() => {
                if (this.stopped) {
                    clearInterval(handle);
                    this.sec = 0;
                } else {
                    this.processTime();
                }
            }, 1000);
        }
    }

    stop() {
        this.stopped = true;
    }

    clear() {
        this.time = '';
    }
}

export default Timer;