class MakeObservableObject {
  observers: Array<Function>;

  constructor() {
    this.observers = [];
  }

  addObserver(fn: Function): void {
    if (typeof fn !== 'function') {
      throw new Error('observer must be a function');
    }
    this.observers.map((observer) => {
      if (observer === fn) {
        throw new Error('observer already in the list');
      }
    });
    this.observers.push(fn);
  }

  removeObserver(fn: Function): void {
    for (let i = 0; i < this.observers.length; i++) {
      const observer = this.observers[i];
      if (observer === fn) {
        this.observers.splice(i, 1);
        return;
      }
    }
    throw new Error('could not find observer in list of observers');
  }

  notifyObservers(): void {
    const observersSnapshot = [...this.observers];
    observersSnapshot.map((observer) => observer());
  }

  notifyObserversData(data: any): void {
    const observersSnapshot = [...this.observers];
    observersSnapshot.map((observer) => observer(data));
  }
}

export default MakeObservableObject;
