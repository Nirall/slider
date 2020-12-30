import Model from '../src/plugin/Model/Model';
import * as types from '../src/plugin/types';
import MakeObservableObject from '../src/plugin/makeObservableObject/MakeObservableObject';

describe('Model class', () => {
  let newItem: Model;
  let observerResult: types.ObserverTestResult;
  let observer: types.ObserverFunction;
  let testObject: MakeObservableObject;
  let currentValues: types.CurrentValues;

  beforeEach(() => {
    observer = (eventName: string, data: any): void => {
      observerResult = ({ eventName: eventName, data: data });
    };

    currentValues = {
      currentMinValue: 10,
      currentMaxValue: 999
    };

    newItem = new Model(currentValues, observer);
    testObject = new MakeObservableObject();
    testObject.addObserver(newItem.observeControllerFromModel);
  });

  it('setCurrentValues() should set currentValues', () => {
    currentValues.currentMinValue = 23;
    currentValues.currentMaxValue = 2323;
    newItem.setCurrentValues(currentValues);
    expect(newItem.currentValues).toEqual(currentValues);
  });

  it('setCurrentValues() should notify observers with event "SendingCurrentValues" if there is an argument "fromPanel"', () => {
    currentValues.currentMinValue = 12;
    currentValues.currentMaxValue = 555;
    newItem.setCurrentValues(currentValues, 'fromPanel');
    expect(observerResult.eventName).toEqual('SendingCurrentValues');
  });

  it('setCurrentValues() should notify observers with data if there is an argument "fromPanel"', () => {
    currentValues.currentMinValue = 12;
    currentValues.currentMaxValue = 555;
    newItem.setCurrentValues(currentValues, 'fromPanel');
    expect(observerResult.data).toEqual(currentValues);
  });

  it('observeControllerFromModel() should notify observers with event "SendingCurrentValues" if there is an event "UpdatingConfig"', () => {
    testObject.notifyObservers('UpdatingConfig');
    expect(observerResult.eventName).toEqual('SendingCurrentValues');
  });

  it('observeControllerFromModel() should send current values if there is an event "UpdatingConfig"', () => {
    testObject.notifyObservers('UpdatingConfig');
    expect(observerResult.data).toEqual(newItem.currentValues);
  });

  it('observeControllerFromModel() should set current values if there is an event "ChangingCurrentValueFromView"', () => {
    currentValues.currentMinValue = -223;
    currentValues.currentMaxValue = 0;
    testObject.notifyObservers('ChangingCurrentValueFromView', currentValues);
    expect(newItem.currentValues).toEqual(currentValues);
  });

  it('observeControllerFromModel() should notify observers with event "SendingCurrentValuesForTracking" if there is an event "ChangingCurrentValueFromView"', () => {
    currentValues.currentMinValue = -223;
    currentValues.currentMaxValue = 0;
    testObject.notifyObservers('ChangingCurrentValueFromView', currentValues);
    expect(observerResult.eventName).toEqual('SendingCurrentValuesForTracking');
  });

  it('observeControllerFromModel() should send current values with the event "SendingCurrentValuesForTracking"', () => {
    currentValues.currentMinValue = -223;
    currentValues.currentMaxValue = 0;
    testObject.notifyObservers('ChangingCurrentValueFromView', currentValues);
    expect(observerResult.data).toEqual(newItem.currentValues);
  });

  it('observeControllerFromModel() should set current values if there is an event "ChangingCurrentValueFromPanel"', () => {
    currentValues.currentMinValue = 1;
    currentValues.currentMaxValue = 555;
    testObject.notifyObservers('ChangingCurrentValueFromPanel', currentValues);
    expect(newItem.currentValues).toEqual(currentValues);
  });

  it('observeControllerFromModel() should notify observers with event "SendingCurrentValuesForTracking" if there is an event "GettingValues"', () => {
    currentValues.currentMinValue = 999;
    currentValues.currentMaxValue = 9999;
    testObject.notifyObservers('GettingValues', currentValues);
    expect(observerResult.eventName).toEqual('SendingCurrentValuesForTracking');
  });

  it('observeControllerFromModel() should send current values with the event "SendingCurrentValuesForTracking"', () => {
    currentValues.currentMinValue = 3232;
    currentValues.currentMaxValue = 323232;
    testObject.notifyObservers('GettingValues', currentValues);
    expect(observerResult.data).toEqual(newItem.currentValues);
  });
});
