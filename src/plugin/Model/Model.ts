import * as types from '../types';
import MakeObservableObject from '../makeObservableObject/MakeObservableObject';

class Model {
  currentValues: types.CurrentValues;

  observers: MakeObservableObject;

  constructor(currentValues: types.CurrentValues, observer: types.ObserverFunction) {
    this.currentValues = currentValues;
    this.observers = new MakeObservableObject();
    this.observers.addObserver(observer);
  }

  setCurrentMinValue(data: number): void {
    if (this.currentValues.currentMinValue !== data) {
      this.currentValues.currentMinValue = data;
      this.observers.notifyObservers('SendingCurrentValues', this.currentValues);
    }
  }

  setCurrentMaxValue(data: number): void {
    if (this.currentValues.currentMaxValue !== data) {
      this.currentValues.currentMaxValue = data;
      this.observers.notifyObservers('SendingCurrentValues', this.currentValues);
    }
  }

  setCurrentValue(data: types.CurrentValueChangingData): void {
    if (data.typeOfValue === 'minValue') {
      this.setCurrentMinValue(data.value);
    } if (data.typeOfValue === 'maxValue') {
      this.setCurrentMaxValue(data.value);
    }
  }

  observeControllerFromModel = (eventName: string, data?: types.CurrentValueChangingData): void => {
    if (eventName === 'UpdatingConfig') {
      this.observers.notifyObservers('SendingCurrentValues', this.currentValues);
    } if (eventName === 'ChangingCurrentValueFromView') {
      this.setCurrentValue(data);
    }
  }
}

export default Model;
