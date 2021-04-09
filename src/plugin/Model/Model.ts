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
      let valueRounded;
      if (currentMaxValue === this.minValue) {
        valueRounded = this.minValue;
      } else {
        valueRounded = currentMinValue > this.minValue
          ? reductValue(currentMinValue, this.step)
          : this.minValue;
      }

      if (currentMinValue !== this.currentMinValue) {
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
      let valueRounded;
      if (currentMaxValue === this.maxValue) {
        valueRounded = this.maxValue;
      } else {
        valueRounded = currentMaxValue < this.maxValue
          ? reductValue(currentMaxValue, this.step)
          : this.maxValue;
      }

      if (currentMaxValue !== this.currentMaxValue) {
        if (valueRounded > this.currentMinValue && valueRounded) {
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
