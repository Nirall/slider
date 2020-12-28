/* global jQuery */
import Controller from '../src/plugin/Controller/Controller';
import * as types from '../src/plugin/types';

describe('Model Controller', () => {
  let newItem: Controller;
  let observerResult: types.ObserverTestResult;
  let observer: types.ObserverFunction;
  let rawParameters: types.RawParameters;
  let currentValues: types.CurrentValues;

  const parameters = {
    minValue: 0,
    maxValue: 1000,
    step: 1,
    isRange: false,
    isVertical: false,
    showLabel: true,
    isFloat: false
  };

  beforeEach(() => {
    observer = (eventName: string, data: any): void => {
      observerResult = ({ eventName: eventName, data: data });
    };

    currentValues = {
      currentMinValue: 10,
      currentMaxValue: 999
    };

    const entry = jQuery(document.createElement('div'));
    newItem = new Controller(parameters, entry);
    newItem.observers.addObserver(observer);
  });

  it('update() should notify observers with an event "UpdatingConfig"', () => {
    rawParameters = { maxValue: 888 };
    let observerResultLocal: types.ObserverTestResult;
    const observerSpecific = (eventName: string, data: any): void => {
      if (eventName === 'UpdatingConfig') {
        observerResultLocal = ({ eventName: eventName, data: data });
      }
    };

    newItem.observers.addObserver(observerSpecific);
    newItem.update(rawParameters);
    expect(observerResultLocal.eventName).toEqual('UpdatingConfig');
  });

  it('update() should send parameters to observers', () => {
    rawParameters = { maxValue: 888 };
    let observerResultLocal: types.ObserverTestResult;
    const observerSpecific = (eventName: string, data: any): void => {
      if (eventName === 'UpdatingConfig') {
        observerResultLocal = ({ eventName: eventName, data: data });
      }
    };

    newItem.observers.addObserver(observerSpecific);
    newItem.update(rawParameters);
    expect(observerResultLocal.data).toEqual(rawParameters);
  });

  it('update() should notify observers with an event "GettingConfig"', () => {
    rawParameters = { isRange: 'toggle' };
    newItem.update(rawParameters);
    expect(observerResult.eventName).toEqual('GettingConfig');
  });

  it('setValues() should notify observers with an event "ChangingCurrentValueFromPanel"', () => {
    newItem.setValues(currentValues);
    expect(observerResult.eventName).toEqual('ChangingCurrentValueFromPanel');
  });

  it('setValues() should send data', () => {
    newItem.setValues(currentValues);
    expect(observerResult.data).toEqual(currentValues);
  });

  it('renew() should notify observers with an event "GettingConfig"', () => {
    newItem.setValues(currentValues);
    let observerResultLocal: types.ObserverTestResult;
    const observerSpecific = (eventName: string, data: any): void => {
      if (eventName === 'GettingConfig') {
        observerResultLocal = ({ eventName: eventName, data: data });
      }
    };

    newItem.observers.addObserver(observerSpecific);
    newItem.renew();
    expect(observerResultLocal.eventName).toEqual('GettingConfig');
  });

  it('renew() should notify observers with an event "GettingValues"', () => {
    newItem.renew();
    expect(observerResult.eventName).toEqual('GettingValues');
  });
});
