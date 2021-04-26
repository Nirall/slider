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
    const checkedCurrentMinValue = Number.isFinite(currentMinValue)
      ? currentMinValue
      : this.currentMinValue;

    const checkedCurrentMaxValue = Number.isFinite(currentMaxValue)
      ? currentMaxValue
      : this.currentMaxValue;

    let [roundedCurrentMinValue, roundedCurrentMaxValue] = [
      checkedCurrentMinValue,
      checkedCurrentMaxValue
    ].map((item) => {
      if (item <= this.minValue) return this.minValue;
      if (item >= this.maxValue) return this.maxValue;
      return Number((reductValue(item - this.minValue, this.step) + this.minValue).toFixed(2));
    });

    if (roundedCurrentMinValue > roundedCurrentMaxValue) {
      if (checkedCurrentMinValue !== this.currentMinValue) {
        roundedCurrentMinValue = roundedCurrentMaxValue;
      } else {
        roundedCurrentMaxValue = roundedCurrentMinValue;
      }
    }

    const isMinValueChanged = checkedCurrentMinValue !== this.currentMinValue
      || roundedCurrentMinValue !== this.currentMinValue;

    const isMaxValueChanged = checkedCurrentMaxValue !== this.currentMaxValue
      || roundedCurrentMaxValue !== this.currentMaxValue;

    if (isMinValueChanged || isMaxValueChanged) {
      this.currentMinValue = roundedCurrentMinValue;
      this.currentMaxValue = roundedCurrentMaxValue;
      this.observers.notifyObservers(
        'SendingCurrentValues',
        { currentMinValue: this.currentMinValue, currentMaxValue: this.currentMaxValue }
      );
    }
  }

  observeSourceFromModel = (eventName: string, data?: unknown)
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
          if (data.isRange === false) this.currentMinValue = this.minValue;
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
