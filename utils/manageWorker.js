const { Worker } = require('worker_threads');
const path = require('path');
const requestTracker = require('./requestTracker');

const fifteenMinutes = 15 * 60 * 1000;

class ManageWorker{

    constructor(workerName, idleTime = fifteenMinutes) {
        this.workerName = workerName;
        this.worker = null;
        this.timeout = null;
        this.idleTime =idleTime;
    }

    createWorker() {
        console.log('createWorker ..... ');
        if(this.worker) return worker;

        this.worker = new Worker(path.join(__dirname, '../workers', this.workerName));

        this.worker.on('message', (data) => {
            console.log('createWorker ..... message ...');
            const { response, requestId } = data;
            requestTracker[requestId](response);
            delete requestTracker[requestId];
        });

        this.worker.on('error', () => {
            console.log('createWorker ..... error ...');
            worker.terminate();
        });

        return this.worker;
    }

    getWorker() {
        console.log('getWorker ...');
        if(this.worker) {
            this.resetTimer();
            return this.worker;
        }

        return this.createWorker();
    }

    terminateWorker() {
        console.log('terminateWorker ...');

        if(this.worker) {
            this.worker.terminate();
            this.worker = null;
        }
    }


    resetTimer() {
        console.log('resetTimer ...');
        if(this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => this.terminateWorker(), this.idleTime);
    }
}

module.exports = ManageWorker;