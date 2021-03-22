import * as types from '../types';
import View from '../View/View';
import Model from '../Model/Model';
import MakeObservableObject from '../makeObservableObject/MakeObservableObject';

const defaultParameters = {
  minValue: 0,
  maxValue: 1000,
  step: 1,
  isRange: false,
  isVertical: false,
  showLabel: true,
  isFloat: false
};

class Controller {
  private view: View;

  private model: Model;

  observers: MakeObservableObject;

  constructor(parameters = defaultParameters, entry: JQuery<Methods>) {
    this.view = new View(parameters, this.handleViewChangingValue);
    this.model = new Model({
      currentMinValue: parameters.minValue,
      currentMaxValue: parameters.maxValue
    }, this.handleModelSendingValues);
    this.observers = new MakeObservableObject();
    this.init(entry);
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
    : types.RawParameters | undefined => {
    const key = Object.keys(parameters)[0];
    let value: string;
    switch (key) {
      case 'minValue':
        return { minValue: parseFloat(parameters.minValue + '') };
      case 'maxValue':
        return { maxValue: parseFloat(parameters.maxValue + '') };
      case 'step':
        return { step: parseFloat(parameters.step + '') };
      case 'isRange':
        value = parameters.isRange ? 'toggle' : '';
        return { isRange: value };
      case 'isVertical':
        value = parameters.isVertical ? 'toggle' : '';
        return { isVertical: value };
      case 'showLabel':
        value = parameters.showLabel ? 'toggle' : '';
        return { showLabel: value };
      default:
        return {};
    }
  }

  private normalizeSetValues = (parameters: types.updateData): types.updateCurrentValues | null => {
    const key = Object.keys(parameters)[0];
    switch (key) {
      case 'currentMinValue':
        return { currentMinValue: parseFloat(parameters.currentMinValue + '') };
      case 'currentMaxValue':
        return { currentMaxValue: parseFloat(parameters.currentMaxValue + '') };
      default:
        return null;
    }
  }

  private init = (entry: JQuery<Methods>):void => {
    this.observers.addObserver(this.view.observeControllerFromView);
    this.observers.addObserver(this.model.observeControllerFromModel);
    this.observers.notifyObservers('AppendingToNode', entry.get(0));
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
    } if (eventName === 'SendingCurrentValuesForTracking') {
      this.observers.notifyObservers('SendingCurrentValuesForTracking', data);
    } if (eventName === 'UpdatingConfigAfterModelChecking') {
      this.observers.notifyObservers('UpdatingConfigAfterModelChecking', data);
    }
  }
}

export default Controller;
