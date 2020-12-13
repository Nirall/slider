import * as types from '../types';
import MakeObservableObject from '../makeObservableObject/MakeObservableObject';

class Model {
  currentValues: types.CurrentValues;

  observers: MakeObservableObject;

  constructor(currentValues: types.CurrentValues) {
    this.currentValues = currentValues;
    this.observers = new MakeObservableObject();
  }

  setCurrentMinValue(data: number): void {
    if (this.currentValues.currentMinValue !== data) {
      this.currentValues.currentMinValue = data;
      this.observers.notifyObservers();
    }
  }

  setCurrentMaxValue(data: number): void {
    if (this.currentValues.currentMaxValue !== data) {
      this.currentValues.currentMaxValue = data;
      this.observers.notifyObservers();
    }
  }
}

export default Model;
