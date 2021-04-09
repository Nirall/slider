import * as types from '../types';
import reductValue from '../helpers/reductValue';
import ObservableObject from '../observableObject/ObservableObject';

class Model {
  currentMinValue: number;

  currentMaxValue: number;

  step: number;

  minValue: number;

  maxValue: number;

  observers: ObservableObject;

  constructor({
    currentMinValue, currentMaxValue, step, minValue, maxValue, observer
  }: types.ModelCreateParameters) {
    this.currentMinValue = currentMinValue;
    this.currentMaxValue = currentMaxValue;
    this.step = step;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.observers = new ObservableObject();
    this.observers.addObserver(observer);
  }

  setCurrentValues = ({ currentMinValue, currentMaxValue }: types.CurrentValues): void => {
    const isCurrentMaxValueReal = currentMaxValue || currentMaxValue === 0;
    const isCurrentMinValueReal = currentMinValue || currentMinValue === 0;
    if (isCurrentMinValueReal) {
      const valueRounded = reductValue(currentMinValue, this.step);
      if (valueRounded !== this.currentMinValue) {
        if (valueRounded < this.currentMaxValue && valueRounded >= this.minValue) {
          this.currentMinValue = valueRounded;
        }

        this.observers.notifyObservers(
          'SendingCurrentValues',
          { currentMinValue: this.currentMinValue, currentMaxValue: this.currentMaxValue }
        );
      }
    }

    if (isCurrentMaxValueReal) {
      const valueRounded = reductValue(currentMaxValue, this.step);
      if (valueRounded !== this.currentMaxValue) {
        if (valueRounded > this.currentMinValue && valueRounded <= this.maxValue) {
          this.currentMaxValue = valueRounded;
        }

        this.observers.notifyObservers(
          'SendingCurrentValues',
          { currentMinValue: this.currentMinValue, currentMaxValue: this.currentMaxValue }
        );
      }
    }
  }

  observeSourceFromModel = (eventName: string, data?: types.CurrentValues | types.RawParameters)
  : void => {
    switch (eventName) {
      case 'ChangingCurrentValue':
        if (data && types.isCurrentValues(data)) {
          this.setCurrentValues(data);
        }
        break;
      case 'GettingValues':
      case 'UpdatingConfig':
        if (data && types.isParametersData(data)) {
          this.minValue = data.minValue;
          this.maxValue = data.maxValue;
        }
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
