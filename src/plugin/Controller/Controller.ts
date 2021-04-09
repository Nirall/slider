import * as types from '../types';
import View from '../View/View';
import Model from '../Model/Model';
import ObservableObject from '../observableObject/ObservableObject';

class Controller {
  private view: View;

  private model: Model;

  observers: ObservableObject;

  constructor(parameters: types.Parameters, entry: JQuery<Methods>) {
    this.view = new View(parameters, this.observeSourceFromController);
    this.model = new Model({
      currentMinValue: parameters.minValue,
      currentMaxValue: parameters.maxValue,
      minValue: parameters.minValue,
      maxValue: parameters.maxValue,
      step: parameters.step,
      observer: this.observeSourceFromController
    });
    this.observers = new ObservableObject();
    this.init(parameters, entry);
  }

  update = (parameters: types.updateData): void => {
    this.observers.notifyObservers('UpdatingConfig', this.normalizeUpdateConfig(parameters));
  }

  setValues = (currentValues: types.CurrentValues): void => {
    this.observers.notifyObservers('ChangingCurrentValue', this.normalizeSetValues(currentValues));
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
    this.observers.addObserver(this.view.observeSourceFromView);
    this.observers.addObserver(this.model.observeSourceFromModel);
    this.observers.notifyObservers('AppendingToNode', { entry: entry.get(0) });
    if (parameters.initMaxValue || parameters.initMinValue) {
      this.setValues({
        currentMinValue: parameters.initMinValue ? parameters.initMinValue : parameters.minValue,
        currentMaxValue: parameters.initMaxValue ? parameters.initMaxValue : parameters.maxValue
      });
    }
  }

  private observeSourceFromController = <T>(eventName: string, data: T): void => {
    if (eventName === 'ChangingCurrentValue') {
      this.observers.notifyObservers('ChangingCurrentValue', data);
    }

    if (eventName === 'SendingConfig') {
      this.observers.notifyObservers('SendingConfig', data);
    }

    if (eventName === 'SendingCurrentValues') {
      this.observers.notifyObservers('SendingCurrentValues', data);
    }
  }
}

export default Controller;
