import * as types from '../types';
import View from '../View/View';
import Model from '../Model/Model';
import MakeObservableObject from '../makeObservableObject/MakeObservableObject';

class Controller {
  private view: View;

  private model: Model;

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
    this.observers.notifyObservers('GettingConfig');
  }

  setValues = (currentValues: types.CurrentValues): void => {
    this.observers.notifyObservers('ChangingCurrentValueFromPanel', currentValues);
  }

  renew = (): void => {
    this.observers.notifyObservers('GettingConfig');
    this.observers.notifyObservers('GettingValues');
  }

  private init = (entry: JQuery, parameters: types.Parameters):void => {
    this.observers.addObserver(this.view.observeControllerFromView);
    this.observers.addObserver(this.model.observeControllerFromModel);
    this.observers.notifyObservers('AppendingToNode', entry.get(0));
    this.observers.notifyObservers('UpdatingConfig', parameters);
  }

  private handleViewChangingValue = (eventName: string, data: any): void => {
    if (eventName === 'ChangingCurrentValueFromView') {
      this.observers.notifyObservers('ChangingCurrentValueFromView', data);
    } if (eventName === 'SendingConfig') {
      this.observers.notifyObservers('SendingConfig', data);
    }
  }

  private handleModelSendingValues = (eventName: string, data: types.CurrentValues): void => {
    if (eventName === 'SendingCurrentValues') {
      this.observers.notifyObservers('SendingCurrentValues', data);
      this.observers.notifyObservers('GettingValues');
    } if (eventName === 'SendingCurrentValuesForTracking') {
      this.observers.notifyObservers('SendingCurrentValuesForTracking', data);
    }
  }
}

export default Controller;
