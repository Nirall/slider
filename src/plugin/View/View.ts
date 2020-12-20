import * as types from '../types';
import MakeObservableObject from '../makeObservableObject/MakeObservableObject';
import Track from './blocks/Track/Track';

const isOthersValuesFloat = (item: View, parameter: string): boolean => {
  switch (parameter) {
    case 'step':
      return (item.parameters.maxValue % 1 !== 0 || item.parameters.minValue % 1 !== 0);
    case 'maxValue':
      return (item.parameters.step % 1 !== 0 || item.parameters.minValue % 1 !== 0);
    case 'minValue':
      return (item.parameters.step % 1 !== 0 || item.parameters.maxValue % 1 !== 0);
    default:
      return false;
  }
};

class View {
  parameters: types.Parameters;

  observers: MakeObservableObject;

  private track: Track;

  constructor(parameters = types.defaultParameters, observer: types.ObserverFunction) {
    this.observers = new MakeObservableObject();
    this.track = new Track(parameters, this.handleTrackValueChanging);
    this.parameters = parameters;
    this.init(observer);
  }

  update = (parameters: types.Parameters): void => {
    const checkedParameters = this.validateConfig(parameters);
    this.parameters = checkedParameters;
    this.observers.notifyObservers('UpdatingConfig', this.parameters);
  }

  handleTrackValueChanging = (eventName: string, data: types.CurrentValues): void => {
    if (eventName === 'ChangingCurrentValueFromTrack') {
      this.observers.notifyObservers('ChangingCurrentValueFromView', data);
    }
  }

  observeControllerFromView = (eventName: string, data: any): void => {
    if (eventName === 'SendingCurrentValues') {
      this.observers.notifyObservers('SendingCurrentValues', data);
    } if (eventName === 'UpdatingConfig') {
      this.update(data);
    } if (eventName === 'GettingConfig') {
      this.observers.notifyObservers('SendingConfig', this.parameters);
    }
  }

  appendToNode = (entry: HTMLElement): void => {
    this.observers.notifyObservers('AppendingToNode', entry);
  }

  private init = (observer: types.ObserverFunction): void => {
    this.observers.addObserver(observer);
    this.observers.addObserver(this.track.observeViewFromTrack);
    this.observers.notifyObservers('UpdatingConfig', this.parameters);
  }

  private validateConfig = (parameters: types.Parameters): types.Parameters => {
    const parametersSnapshot = parameters;
    Object.keys(parameters).forEach((key) => {
      if (key === 'step') {
        parametersSnapshot.step = this.checkStep(parameters.step);
      } else if (key === 'maxValue') {
        parametersSnapshot.maxValue = this.checkMaxValue(parameters.maxValue);
      } else if (key === 'minValue') {
        parametersSnapshot.minValue = this.checkMinValue(parameters.minValue);
      }
    });

    const newParameters = Object.assign(this.parameters, parametersSnapshot);
    return newParameters;
  }

  private checkStep = (step: number): number => {
    if (!step || step > (this.parameters.maxValue - this.parameters.minValue) / 2) {
      return this.parameters.step;
    }

    if (step % 1 !== 0) {
      this.parameters.isFloat = true;
    } else if (!isOthersValuesFloat(this, 'step')) {
      this.parameters.isFloat = false;
    }

    return step;
  }

  private checkMaxValue = (maxValue: number): number => {
    if (Number.isNaN(maxValue) || maxValue <= this.parameters.minValue) {
      return this.parameters.maxValue;
    }

    if (maxValue % 1 !== 0) {
      this.parameters.isFloat = true;
    } else if (!isOthersValuesFloat(this, 'maxValue')) {
      this.parameters.isFloat = false;
    }

    return maxValue;
  }

  private checkMinValue = (minValue: number): number => {
    if (Number.isNaN(minValue) || minValue >= this.parameters.maxValue) {
      return this.parameters.minValue;
    }

    if (minValue % 1 !== 0) {
      this.parameters.isFloat = true;
    } else if (!isOthersValuesFloat(this, 'minValue')) {
      this.parameters.isFloat = false;
    }

    return minValue;
  }
}

export default View;
