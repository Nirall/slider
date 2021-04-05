import * as types from '../types';
import View from '../View/View';
import Model from '../Model/Model';
import ObservableObject from '../observableObject/ObservableObject';

class Controller {
  private view: View;

  private model: Model;

  observers: ObservableObject;

  constructor(parameters: types.Parameters, entry: JQuery<Methods>) {
    this.view = new View(parameters, this.handleViewChangingValue);
    this.model = new Model({
      currentMinValue: parameters.minValue,
      currentMaxValue: parameters.maxValue
    }, this.handleModelSendingValues);
    this.observers = new ObservableObject();
    this.init(parameters, entry);
  }

  update = (parameters: types.updateData): void => {
    this.observers.notifyObservers('UpdatingConfig', this.normalizeUpdateConfig(parameters));
  }

  setValues = (currentValues: types.CurrentValues): void => {
    this.observers.notifyObservers('ChangingCurrentValueFromPanel', this.normalizeSetValues(currentValues));
  }

  renew = (): void => {
    this.observers.notifyObservers('GettingConfig');
    this.observers.notifyObservers('GettingValues');
  }

  private normalizeUpdateConfig = (parameters: types.updateData)
    : types.RawParameters => {
    const key = Object.keys(parameters)[0];
    switch (key) {
      case 'minValue':
        return { minValue: parseFloat(String(parameters.minValue)) };
      case 'maxValue':
        return { maxValue: parseFloat(String(parameters.maxValue)) };
      case 'step':
        return { step: parseFloat(String(parameters.step)) };
      case 'range':
        return { range: parameters.range ? 'toggle' : '' };
      case 'vertical':
        return { vertical: parameters.vertical ? 'toggle' : '' };
      case 'showLabel':
        return { showLabel: parameters.showLabel ? 'toggle' : '' };
      default:
        return {};
    }
  }

  private normalizeSetValues = (values: types.updateData): types.updateCurrentValues => {
    const snapValues = { ...values };
    Object.keys(values).forEach((key) => {
      snapValues[key] = parseFloat(String(values[key]));
    });

    return snapValues;
  }

  private init = (parameters: types.Parameters, entry: JQuery<Methods>):void => {
    this.observers.addObserver(this.view.observeControllerFromView);
    this.observers.addObserver(this.model.observeControllerFromModel);
    this.observers.notifyObservers('AppendingToNode', { entry: entry.get(0) });
    if (parameters.initMaxValue || parameters.initMinValue) {
      this.setValues({
        currentMinValue: parameters.initMinValue ? parameters.initMinValue : parameters.minValue,
        currentMaxValue: parameters.initMaxValue ? parameters.initMaxValue : parameters.maxValue
      });
    }
  }

  private handleViewChangingValue = <T>(eventName: string, data: T): void => {
    if (eventName === 'ChangingCurrentValueFromView') {
      this.observers.notifyObservers('ChangingCurrentValueFromView', data);
    } if (eventName === 'SendingConfig') {
      this.observers.notifyObservers('SendingConfig', data);
    }
  }

  private handleModelSendingValues = <T>(eventName: string, data: T | types.CurrentValues)
  : void => {
    if (eventName === 'SendingCurrentValues') {
      this.observers.notifyObservers('SendingCurrentValues', data);
    } if (eventName === 'SendingCurrentValuesForTracking') {
      this.observers.notifyObservers('SendingCurrentValuesForTracking', data);
    } if (eventName === 'UpdatingConfigAfterModelChecking') {
      this.observers.notifyObservers('UpdatingConfigAfterModelChecking', data);
    }
  }
}

export default Controller;
