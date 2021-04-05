import * as types from '../types';
import ObservableObject from '../observableObject/ObservableObject';

const isCurrentValues = (data: types.CurrentValues | types.RawParameters)
  : data is types.CurrentValues => {
  return ('currentMinValue' in data || 'currentMaxValue' in data);
};

class Model {
  currentValues: types.CurrentValues;

  maxValue: number;

  minValue: number;

  observers: ObservableObject;

  constructor(currentValues: types.CurrentValues, observer: types.ObserverFunction) {
    this.currentValues = currentValues;
    this.maxValue = currentValues.currentMaxValue;
    this.minValue = currentValues.currentMinValue;
    this.observers = new ObservableObject();
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

  private processConfigChanging = (parameters: types.RawParameters): void => {
    const key = Object.keys(parameters)[0];
    switch (key) {
      case 'maxValue':
        if (parameters.maxValue || parameters.maxValue === 0) {
          if (parameters.maxValue > this.minValue) {
            this.maxValue = parameters.maxValue;
          }
        }
        this.observers.notifyObservers('UpdatingConfigAfterModelChecking', { maxValue: this.maxValue });
        break;
      case 'minValue':
        if (parameters.minValue || parameters.minValue === 0) {
          if (parameters.minValue < this.maxValue) {
            this.minValue = parameters.minValue;
          }
        }
        this.observers.notifyObservers('UpdatingConfigAfterModelChecking', { minValue: this.minValue });
        break;
      default:
        this.observers.notifyObservers('UpdatingConfigAfterModelChecking', parameters);
    }

    this.observers.notifyObservers('SendingCurrentValues', this.currentValues);
  }

  observeControllerFromModel = (eventName: string, data?: types.CurrentValues | types.RawParameters)
  : void => {
    if (data && isCurrentValues(data)) {
      switch (eventName) {
        case 'ChangingCurrentValueFromView':
          this.setCurrentValues(data, 'fromView');
          this.observers.notifyObservers('SendingCurrentValuesForTracking', this.currentValues);
          break;
        case 'ChangingCurrentValueFromPanel':
          this.setCurrentValues(data, 'fromPanel');
          break;
        default:
          break;
      }
    } else {
      if (eventName === 'GettingValues') {
        this.observers.notifyObservers('SendingCurrentValuesForTracking', this.currentValues);
      }

      if (eventName === 'UpdatingConfig' && data) this.processConfigChanging(data);
    }
  }
}

export default Model;
