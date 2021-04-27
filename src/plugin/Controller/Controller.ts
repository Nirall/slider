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

  update = (parameters: types.RawParameters): void => {
    this.observers.notifyObservers('UpdatingConfig', parameters);
  }

  setValues = (currentValues: types.CurrentValues): void => {
    this.observers.notifyObservers('ChangingCurrentValue', currentValues);
  }

  renew = (): void => {
    this.observers.notifyObservers('GettingConfig');
    this.observers.notifyObservers('GettingValues');
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

  private observeSourceFromController = (eventName: string, data: unknown): void => {
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
