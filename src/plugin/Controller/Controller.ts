import * as types from '../types';
import View from '../View/View';
import Model from '../Model/Model';
import MakeObservableObject from '../makeObservableObject/MakeObservableObject';

class Controller {
  view: View;

  model: Model;

  observers: MakeObservableObject;

  constructor(parameters = types.defaultParameters, entry: JQuery) {
    this.view = new View(parameters, this.handleViewChangingValue);
    this.model = new Model({
      currentMinValue: parameters.minValue,
      currentMaxValue: parameters.maxValue
    }, this.handleModelSendingValues);
    this.observers = new MakeObservableObject();
    this.init(entry, parameters);
  }

  update = (parameters: types.RawParameters): void => {
    this.observers.notifyObservers('UpdatingConfig', parameters);
  }

  getValues = (): void => {
    this.observers.notifyObservers('GettingValues');
  }

  setValues = (currentValues: types.CurrentValues): void => {
    this.observers.notifyObservers('ChangingCurrentValueFromPanel', currentValues);
  }

  getConfig = (): types.Parameters => {
    return this.view.parameters;
  }

  addObserver = (fn: types.FunctionCallbackData): void => {
    this.observers.addObserver(fn);
  }

  private init = (entry: JQuery, parameters: types.Parameters):void => {
    this.observers.addObserver(this.view.observeControllerFromView);
    this.observers.addObserver(this.model.observeControllerFromModel);
    this.view.appendToNode(entry.get(0));
    this.observers.notifyObservers('UpdatingConfig', parameters);
  }

  private handleViewChangingValue = (eventName: string,
    data: any): void => {
    if (eventName === 'ChangingCurrentValueFromView') {
      this.observers.notifyObservers('ChangingCurrentValueFromView', data);
      this.getValues();
    } if (eventName === 'SendingConfig') {
      this.observers.notifyObservers('SendingConfig', data);
    }
  }

  private handleModelSendingValues = (eventName: string, data: types.CurrentValues): void => {
    if (eventName === 'SendingCurrentValues') {
      this.observers.notifyObservers('SendingCurrentValues', data);
      this.getValues();
    } if (eventName === 'SendingCurrentValuesForTracking') {
      this.observers.notifyObservers('SendingCurrentValuesForTracking', data);
    }
  }
}

export default Controller;
