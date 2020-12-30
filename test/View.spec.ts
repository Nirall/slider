import View from '../src/plugin/View/View';
import * as types from '../src/plugin/types';
import MakeObservableObject from '../src/plugin/makeObservableObject/MakeObservableObject';

describe('View class', () => {
  let newItem: View;
  let observerResult: types.ObserverTestResult;
  let observer: types.ObserverFunction;
  let parameters: types.Parameters;
  let rawParameters: types.RawParameters;
  let testObject: MakeObservableObject;

  beforeEach(() => {
    parameters = {
      minValue: 0,
      maxValue: 1000,
      step: 1,
      isRange: false,
      isVertical: false,
      showLabel: true,
      isFloat: false
    };

    observer = (eventName: string, data: any): void => {
      observerResult = ({ eventName: eventName, data: data });
    };

    newItem = new View(parameters, observer);
    testObject = new MakeObservableObject();
    testObject.addObserver(newItem.observeControllerFromView);
  });

  it('update() should set parameters of the View', () => {
    rawParameters = { minValue: 10 };
    newItem.update(rawParameters);
    expect(newItem.parameters.minValue).toEqual(10);
  });

  it('update() should notify observers with an event "UpdatingConfig"', () => {
    rawParameters = { step: 2 };
    newItem.update(rawParameters);
    expect(observerResult.eventName).toEqual('UpdatingConfig');
  });

  it('update() should notify observers with parameters', () => {
    rawParameters = { maxValue: 777 };
    newItem.update(rawParameters);
    expect(observerResult.data.maxValue).toEqual(777);
  });

  it('update() should not update step if step === 0', () => {
    rawParameters = { step: 0 };
    newItem.update(rawParameters);
    expect(newItem.parameters.step).toEqual(1);
  });

  it('update() should not update if step more than half maxvalue - minvalue', () => {
    rawParameters = { step: 600 };
    newItem.update(rawParameters);
    expect(newItem.parameters.step).toEqual(1);
  });

  it('update() should set .isFloat to true if typeof step is float', () => {
    rawParameters = { step: 10.2 };
    newItem.update(rawParameters);
    expect(newItem.parameters.isFloat).toEqual(true);
  });

  it('update() should not set .isFloat to false if type of the step is int, when type of maxvalue is float', () => {
    newItem.parameters.maxValue = 100.2;
    rawParameters = { step: 10 };
    newItem.update(rawParameters);
    expect(newItem.parameters.isFloat).toEqual(false);
  });

  it('update() should not set .isFloat to false if type of the step is int, when type of minvalue is float', () => {
    newItem.parameters.minValue = 2.2;
    rawParameters = { step: 3 };
    newItem.update(rawParameters);
    expect(newItem.parameters.isFloat).toEqual(false);
  });

  it('update() should set .isFloat to false if type of the step is int, and type of minvalue and maxvalue is int', () => {
    newItem.parameters.isFloat = true;
    rawParameters = { step: 3 };
    newItem.update(rawParameters);
    expect(newItem.parameters.isFloat).toEqual(false);
  });

  it('update() should not update if maxvalue < = minvalue', () => {
    rawParameters = { maxValue: 0 };
    newItem.update(rawParameters);
    expect(newItem.parameters.maxValue).toEqual(1000);
  });

  it('update() should not update if minvalue > = maxvalue', () => {
    rawParameters = { minValue: 1000 };
    newItem.update(rawParameters);
    expect(newItem.parameters.minValue).toEqual(0);
  });

  it('update() should change .isRange if .isRange of raw parameters = "toggle"', () => {
    rawParameters = { isRange: 'toggle' };
    newItem.update(rawParameters);
    expect(newItem.parameters.isRange).toEqual(true);
  });

  it('update() should change .isVertical if .isVertical of raw parameters = "toggle"', () => {
    rawParameters = { isVertical: 'toggle' };
    newItem.update(rawParameters);
    expect(newItem.parameters.isVertical).toEqual(true);
  });

  it('update() should change .showLabel if .showLabel of raw parameters = "toggle"', () => {
    rawParameters = { showLabel: 'toggle' };
    newItem.update(rawParameters);
    expect(newItem.parameters.showLabel).toEqual(false);
  });

  it('handleTrackValueChanging() should notify observers with event "ChangingCurrentValueFromView" if there is an event "ChangingCurrentValueFromTrack"', () => {
    newItem.handleTrackValueChanging('ChangingCurrentValueFromTrack', { currentMinValue: 15, currentMaxValue: 99 });
    expect(observerResult.eventName).toEqual('ChangingCurrentValueFromView');
  });

  it('handleTrackValueChanging() should notify observers with data of current values if there is an event "ChangingCurrentValueFromTrack"', () => {
    newItem.handleTrackValueChanging('ChangingCurrentValueFromTrack', { currentMinValue: 20, currentMaxValue: 29 });
    expect(observerResult.data).toEqual({ currentMinValue: 20, currentMaxValue: 29 });
  });

  it('observeControllerFromView() should notify observers with event "SendingConfig" if there is an event "GettingConfig"', () => {
    testObject.notifyObservers('GettingConfig');
    expect(observerResult.eventName).toEqual('SendingConfig');
  });

  it('observeControllerFromView() should notify observers with data if there is an event "GettingConfig"', () => {
    parameters.step = 23;
    testObject.notifyObservers('GettingConfig', parameters);
    expect(observerResult.data.step).toEqual(23);
  });

  it('observeControllerFromView() should notify observers with event "AppendingToNode" if there is an event "AppendingToNode"', () => {
    const entry = document.createElement('div');
    testObject.notifyObservers('AppendingToNode', entry);
    expect(observerResult.eventName).toEqual('AppendingToNode');
  });

  it('observeControllerFromView() should notify observers with data if there is an event "AppendingToNode"', () => {
    const entry = document.createElement('div');
    testObject.notifyObservers('AppendingToNode', entry);
    expect(observerResult.data).toEqual(entry);
  });

  it('observeControllerFromView() should update parameters if there is an event "UpdatingConfig"', () => {
    parameters.minValue = -100.1;
    testObject.notifyObservers('UpdatingConfig', parameters);
    expect(newItem.parameters.minValue).toEqual(-100.1);
  });

  it('observeControllerFromView() should notify observers with event "SendingCurrentValues" if there is an event "SendingCurrentValues"', () => {
    let observerResultLocal: types.ObserverTestResult;
    const observerSpecific = (eventName: string, data: any): void => {
      if (eventName === 'SendingCurrentValues') {
        observerResultLocal = ({ eventName: eventName, data: data });
      }
    };

    newItem.observers.addObserver(observerSpecific);
    testObject.notifyObservers('SendingCurrentValues', { currentMinValue: 20, currentMaxValue: 29 });
    expect(observerResultLocal.eventName).toEqual('SendingCurrentValues');
  });
});
