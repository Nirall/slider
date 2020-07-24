class MakeObservableObject {
    observers: Array<Function>;
    constructor() {
        this.observers = [];
    }
    addObserver (fn: Function) {
        if (typeof fn !== 'function') {
            throw new Error('observer must be a function');
        }
        for (let observer of this.observers) {
            if (observer === fn) {
                throw new Error('observer already in the list');
            }
        }
        this.observers.push(fn);
    };
    removeObserver (fn: Function) {
        for (let i = 0; i < this.observers.length; i++) {
            var observer = this.observers[i];
            if (observer === fn) {
                this.observers.splice(i, 1);
                return;
            }
        }
        throw new Error('could not find observer in list of observers');
    };
    notifyObservers () {
        const observersSnapshot = this.observers.slice(0);
        for (let i = 0; i < observersSnapshot.length; i++) {
            observersSnapshot[i]();
        }
    };
}

export {MakeObservableObject};