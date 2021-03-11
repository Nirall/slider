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

  setCurrentValues = (data: types.CurrentValues, sourceOfChanging?: string): void => {
    const isCurrentMaxValueReal = data.currentMaxValue || data.currentMaxValue === 0;
    const isCurrentMinValueReal = data.currentMinValue || data.currentMinValue === 0;
    if (isCurrentMaxValueReal && data.currentMaxValue !== this.currentValues.currentMaxValue) {
      this.currentValues.currentMaxValue = data.currentMaxValue;
    } if (isCurrentMinValueReal && data.currentMinValue !== this.currentValues.currentMinValue) {
      this.currentValues.currentMinValue = data.currentMinValue;
    }

    if (sourceOfChanging === 'fromPanel') {
      this.observers.notifyObservers('SendingCurrentValues', this.currentValues);
    }
  }

  observeControllerFromModel = (eventName: string, data?: types.CurrentValues): void => {
    if (eventName === 'UpdatingConfig') {
      this.observers.notifyObservers('SendingCurrentValues', this.currentValues);
    } if (eventName === 'ChangingCurrentValueFromView') {
      if (data) this.setCurrentValues(data, 'fromView');
      this.observers.notifyObservers('SendingCurrentValuesForTracking', this.currentValues);
    } if (eventName === 'ChangingCurrentValueFromPanel') {
      if (data) this.setCurrentValues(data, 'fromPanel');
    } if (eventName === 'GettingValues') {
      this.observers.notifyObservers('SendingCurrentValuesForTracking', this.currentValues);
    }
  }
}

export default Model;
