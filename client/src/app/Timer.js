class Timer {

    constructor() {
        this.sec = 0;
        this.stopped = true;
        this.time = '';
        this.started = false;
    }

    processTime() {
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
        if (!this.started) {
            this.started = true;
            if (this.stopped) {
                this.stopped = false;
                const handle = setInterval(() => {
                    if (this.stopped) {
                        clearInterval(handle);
                    } else {
                        this.sec += 1;
                        this.processTime();
                    }
                }, 1000);
                this.processTime();
            }
        }

    }

    stop() {
        this.stopped = true;
        this.started = false;
    }

    clear() {
        this.time = '';
        this.sec = 0;
        this.stop();
    }
}

export default Timer;