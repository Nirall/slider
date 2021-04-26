import * as types from '../types';
import ObservableObject from '../observableObject/ObservableObject';
import Track from './blocks/Track/Track';

class View {
  parameters: types.Parameters;

  observers: ObservableObject;

  private track: Track;

  constructor(parameters: types.Parameters, observer: types.ObserverFunction) {
    this.observers = new ObservableObject();
    this.track = new Track(parameters, this.handleTrackValueChanging);
    this.parameters = parameters;
    this.init(observer);
  }

  update = (parameters: types.RawParameters): void => {
    const checkedParameters = this.validateConfig(parameters);
    this.parameters = checkedParameters;
    this.observers.notifyObservers('UpdatingConfig', this.parameters);
    this.observers.notifyObservers('SendingConfig', this.parameters);
  }

  handleTrackValueChanging = <T>(eventName: string, data: T | types.CurrentValues): void => {
    if (eventName === 'ChangingCurrentValueFromTrack') {
      if (types.isCurrentValues(data)) {
        this.observers.notifyObservers('ChangingCurrentValue', data);
      }
    }
  }

  observeSourceFromView = <T>(eventName: string, data: T): void => {
    switch (eventName) {
      case 'SendingCurrentValues':
        this.observers.notifyObservers('SendingCurrentValuesFromView', data);
        break;
      case 'UpdatingConfig':
        this.update(data);
        break;
      case 'GettingConfig':
        this.observers.notifyObservers('SendingConfig', this.parameters);
        break;
      case 'AppendingToNode':
        this.observers.notifyObservers('AppendingToNode', data);
        break;
      default:
        break;
    }
  }

  private init = (observer: types.ObserverFunction): void => {
    this.observers.addObserver(observer);
    this.observers.addObserver(this.track.observeViewFromTrack);
  }

  private validateConfig = (parameters: types.RawParameters): types.Parameters => {
    const key = Object.keys(parameters)[0];
    const checkedParameters = this.parameters;
    switch (key) {
      case 'step':
        checkedParameters.step = this.checkStep(parameters.step);
        break;
      case 'maxValue':
        checkedParameters.maxValue = this.checkMaxValue(parameters.maxValue);
        break;
      case 'minValue':
        checkedParameters.minValue = this.checkMinValue(parameters.minValue);
        break;
      case 'range':
        if (parameters.range === 'toggle') checkedParameters.isRange = !this.parameters.isRange;
        break;
      case 'vertical':
        if (parameters.vertical === 'toggle') checkedParameters.isVertical = !this.parameters.isVertical;
        break;
      case 'showLabel':
        if (parameters.showLabel === 'toggle') checkedParameters.showLabel = !this.parameters.showLabel;
        break;
      default:
        break;
    }

    return checkedParameters;
  }

  private checkStep = (step: number | undefined): number => {
    if (step) {
      if (step > 0 && step <= this.parameters.maxValue - this.parameters.minValue) {
        return step;
      }
    }

    return this.parameters.step;
  }

  private checkMaxValue = (maxValue: number | undefined): number => {
    if (typeof maxValue === 'number') {
      if (maxValue >= this.parameters.minValue + this.parameters.step) {
        return maxValue;
      }
    }

    return this.parameters.maxValue;
  }

  private checkMinValue = (minValue: number | undefined): number => {
    if (typeof minValue === 'number') {
      if (minValue < this.parameters.maxValue) {
        return minValue;
      }
    }

    return this.parameters.minValue;
  }
}

export default View;
