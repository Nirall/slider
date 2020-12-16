import * as types from '../types';

class MakeObservableObject {
  observers: Array<types.FunctionCallbackData>;

  constructor() {
    this.observers = [];
  }

  addObserver(fn: types.FunctionCallbackData): void {
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

  removeObserver(fn: types.FunctionCallbackData): void {
    for (let i = 0; i < this.observers.length; i += 1) {
      const observer = this.observers[i];
      if (observer === fn) {
        this.observers.splice(i, 1);
        return;
      }
    }
    throw new Error('could not find observer in list of observers');
  }

  notifyObservers(data: any = null): void {
    const observersSnapshot = [...this.observers];
    observersSnapshot.map((observer) => observer(data));
  }
}

export default MakeObservableObject;
