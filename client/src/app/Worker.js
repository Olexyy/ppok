class Worker {

    constructor(callable, interval = 1000) {
        this.stopped = true;
        this.started = false;
        this.callable = callable;
        this.interval = interval;
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
                        this.callable();
                    }
                }, this.interval);
                this.callable();
            }
        }
    }

    stop() {
        this.stopped = true;
        this.started = false;
    }
}

export default Worker;