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
      let valueRounded = reductValue(currentMinValue - this.minValue, this.step) + this.minValue;

      if (valueRounded > this.maxValue - this.step / 2) {
        valueRounded = reductValue(this.maxValue - this.step, this.step);
      }

      if (currentMinValue === this.minValue || valueRounded < this.minValue) {
        valueRounded = this.minValue;
      }

      valueRounded = Number(valueRounded.toFixed(2));

      if (currentMinValue !== this.currentMinValue || valueRounded !== this.currentMinValue) {
        if (valueRounded < this.currentMaxValue) {
          this.currentMinValue = valueRounded;
        }

        this.observers.notifyObservers(
          'SendingCurrentValues',
          { currentMinValue: this.currentMinValue, currentMaxValue: this.currentMaxValue }
        );
      }
    }

    if (isCurrentMaxValueReal) {
      let valueRounded = reductValue(currentMaxValue - this.minValue, this.step) + this.minValue;
      if (currentMaxValue === this.maxValue || valueRounded > this.maxValue) {
        valueRounded = this.maxValue;
      }

      if (valueRounded < this.minValue + this.step) {
        valueRounded = this.minValue + this.step;
      }

      valueRounded = Number(valueRounded.toFixed(2));

      if (currentMaxValue !== this.currentMaxValue || valueRounded !== this.currentMaxValue) {
        if (valueRounded > this.currentMinValue) {
          this.currentMaxValue = valueRounded;
        }

        this.observers.notifyObservers(
          'SendingCurrentValues',
          { currentMinValue: this.currentMinValue, currentMaxValue: this.currentMaxValue }
        );
      }
    }
  }

  observeSourceFromModel = <T>(eventName: string, data?: types.CurrentValues | types.Parameters | T)
  : void => {
    switch (eventName) {
      case 'ChangingCurrentValue':
        if (data && types.isCurrentValues(data)) {
          this.setCurrentValues(data);
        }
        break;
      case 'UpdatingConfig':
      case 'GettingValues':
        this.observers.notifyObservers(
          'SendingCurrentValues',
          { currentMinValue: this.currentMinValue, currentMaxValue: this.currentMaxValue }
        );
        break;
      case 'SendingConfig':
        if (data && types.isParametersData(data)) {
          this.minValue = data.minValue;
          this.maxValue = data.maxValue;
          this.step = data.step;
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
