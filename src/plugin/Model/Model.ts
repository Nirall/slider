import * as types from '../types';
import roundValue from '../helpers/roundValue';
import ObservableObject from '../observableObject/ObservableObject';

const isCurrentValues = (data: types.CurrentValues | types.RawParameters)
  : data is types.CurrentValues => {
  return ('currentMinValue' in data || 'currentMaxValue' in data);
};

class Model {
  currentMinValue: number;

  currentMaxValue: number;

  step: number;

  observers: ObservableObject;

  constructor({
    currentMinValue, currentMaxValue, step, observer
  }: types.ModelCreateParameters) {
    this.currentMinValue = currentMinValue;
    this.currentMaxValue = currentMaxValue;
    this.step = step;
    this.observers = new ObservableObject();
    this.observers.addObserver(observer);
  }

  setCurrentValues = ({ currentMinValue, currentMaxValue }: types.CurrentValues): void => {
    const isCurrentMaxValueReal = currentMaxValue || currentMaxValue === 0;
    const isCurrentMinValueReal = currentMinValue || currentMinValue === 0;
    if (isCurrentMinValueReal) {
      const valueRounded = roundValue(currentMinValue, this.step);
      if (valueRounded !== this.currentMinValue) {
        if (valueRounded < this.currentMaxValue) {
          this.currentMinValue = valueRounded;
        }

        this.observers.notifyObservers(
          'SendingCurrentValuesForTracking',
          { currentMinValue: this.currentMinValue, currentMaxValue: this.currentMaxValue }
        );
      }
    }

    if (isCurrentMaxValueReal) {
      const valueRounded = roundValue(currentMaxValue, this.step);
      if (valueRounded !== this.currentMaxValue) {
        if (valueRounded > this.currentMinValue) {
          this.currentMaxValue = valueRounded;
        }

        this.observers.notifyObservers(
          'SendingCurrentValuesForTracking',
          { currentMinValue: this.currentMinValue, currentMaxValue: this.currentMaxValue }
        );
      }
    }
  }

  observeSourceFromModel = (eventName: string, data?: types.CurrentValues | types.RawParameters)
  : void => {
    switch (eventName) {
      case 'ChangingCurrentValue':
        if (data && isCurrentValues(data)) {
          this.setCurrentValues(data);
        }

        break;
      case 'GettingValues':
        this.observers.notifyObservers(
          'SendingCurrentValuesForTracking',
          { currentMinValue: this.currentMinValue, currentMaxValue: this.currentMaxValue }
        );

        break;
      case 'UpdatingConfig':
        this.observers.notifyObservers(
          'SendingCurrentValues',
          { currentMinValue: this.currentMinValue, currentMaxValue: this.currentMaxValue }
        );
        break;
      default:
        break;
    }
  }
}

export default Model;
