import * as types from '../types';

class ObservableObject {
  observers: Array<types.ObserverFunction>;

  constructor() {
    this.observers = [];
  }

  addObserver(fn: types.ObserverFunction): void {
    if (typeof fn !== 'function') {
      throw new Error('observer must be a function');
    }
    this.observers.forEach((observer) => {
      if (observer === fn) {
        throw new Error('observer already in the list');
      }
    });
    this.observers.push(fn);
  }

  removeObserver(fn: types.ObserverFunction): void {
    const observers = this.observers.filter((observer) => {
      return observer !== fn;
    });

    if (observers === this.observers) {
      throw new Error('could not find observer in list of observers');
    } else {
      this.observers = observers;
    }
  }

  notifyObservers<T>(eventName: string, data?: T): void {
    const observersSnapshot = [...this.observers];
    observersSnapshot.map((observer) => observer(eventName, data));
  }
}

export default ObservableObject;
