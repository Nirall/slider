import * as types from '../types';

class MakeObservableObject {
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
    for (let i = 0; i < this.observers.length; i += 1) {
      const observer = this.observers[i];
      if (observer === fn) {
        this.observers.splice(i, 1);
        return;
      }
    }
    throw new Error('could not find observer in list of observers');
  }

  notifyObservers<T>(eventName: string, data?: T): void {
    const observersSnapshot = [...this.observers];
    observersSnapshot.map((observer) => observer(eventName, data));
  }
}

export default MakeObservableObject;
