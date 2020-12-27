import Track from '../src/plugin/View/blocks/Track/Track';
import MakeObservableObject from '../src/plugin/makeObservableObject/MakeObservableObject';
import * as types from '../src/plugin/types';
import '../src/plugin/style.scss';

describe('Track class(horizontal)', () => {
  let newItem: Track;
  let observerResult: types.ObserverTestResult;

  const observer = (eventName: string, data: any): void => {
    observerResult = ({ eventName: eventName, data: data });
  };

  let parameters: types.Parameters;

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

    newItem = new Track(parameters, observer);
    const entry = document.createElement('div');
    entry.style.width = '400px';
    entry.style.height = '400px';
    document.body.appendChild(entry);
    newItem.appendToNode(entry);
  });

  it('update() should set parameters of the Track', () => {
    parameters.showLabel = false;
    newItem.update(parameters);
    expect(newItem.parameters.showLabel).toEqual(false);
  });

  it('update() should set parameters of the Bar', () => {
    parameters.isVertical = true;
    newItem.update(parameters);
    expect(newItem.bar.isVertical).toEqual(true);
  });

  it('update() should set parameters of the progressBar', () => {
    parameters.isVertical = true;
    newItem.update(parameters);
    expect(newItem.progressBar.isVertical).toEqual(true);
  });

  it('update() should set parameters of the runnerAdditional', () => {
    parameters.isVertical = true;
    newItem.update(parameters);
    expect(newItem.runnerAdditional.isVertical).toEqual(true);
  });

  it('update() should set parameters of the runnerMain', () => {
    parameters.isVertical = true;
    newItem.update(parameters);
    expect(newItem.runnerMain.isVertical).toEqual(true);
  });

  it('update() should set parameters of the scale', () => {
    parameters.isRange = true;
    newItem.update(parameters);
    expect(newItem.scale.parameters.isRange).toEqual(true);
  });

  it('update() should set value of the tooltip of the runnerMain to maximum', () => {
    parameters.maxValue = 777;
    newItem.update(parameters);
    expect(newItem.runnerMain.tooltip.elem.innerHTML).toEqual('777');
  });

  it('update() should set value of the tooltip of the runnerAdditional to minimum', () => {
    parameters.minValue = 100;
    newItem.update(parameters);
    expect(newItem.runnerAdditional.tooltip.elem.innerHTML).toEqual('100');
  });

  it('observeViewFromTrack() should update parameters if there is an event "UpdatingConfig"', () => {
    const testObject = new MakeObservableObject();
    testObject.addObserver(newItem.observeViewFromTrack);
    parameters.maxValue = 999;
    testObject.notifyObservers('UpdatingConfig', parameters)
    expect(newItem.parameters.maxValue).toEqual(999);
  });

  it('observeViewFromTrack() should renew main runner if there is an event "SendingCurrentValues"', () => {
    const testObject = new MakeObservableObject();
    testObject.addObserver(newItem.observeViewFromTrack);
    testObject.notifyObservers('SendingCurrentValues', { currentMaxValue: 322 })
    expect(newItem.runnerMain.tooltip.elem.innerHTML).toEqual('322');
  });

  it('observeViewFromTrack() should renew additional runner if there is an event "SendingCurrentValues"', () => {
    const testObject = new MakeObservableObject();
    testObject.addObserver(newItem.observeViewFromTrack);
    parameters.isRange = true;
    parameters.isVertical = true;
    parameters.isFloat = true;
    parameters.step = 0.1;
    newItem.update(parameters);
    testObject.notifyObservers('SendingCurrentValues', { currentMinValue: 20.2 })
    expect(newItem.runnerAdditional.tooltip.elem.innerHTML).toEqual('20.2');
  });

  it('observeViewFromTrack() should append to node if there is an event "AppendingToNode"', () => {
    const testObject = new MakeObservableObject();
    testObject.addObserver(newItem.observeViewFromTrack);
    const node = document.createElement('div');
    document.body.appendChild(node);
    testObject.notifyObservers('AppendingToNode', node);
    expect(Array.from(node.children).indexOf(newItem.bar.elem)).not.toEqual(-1);
  });

  it('should move Runner on the certain distance if there is a MouseEvent ', () => {
    const mDownEvent = new MouseEvent('mousedown');
    const mMoveEvent = new MouseEvent('mousemove', {clientX: 200});
    const mUpEvent = new MouseEvent('mouseup');
    newItem.bar.elem.style.width = '1000px';
    newItem.runnerMain.tooltip.elem.dispatchEvent(mDownEvent);
    document.dispatchEvent(mMoveEvent);
    document.dispatchEvent(mUpEvent);
    const offset = newItem.runnerMain.knob.getPosition();
    expect(offset <= 194 && offset >= 192).toEqual(true);
  });
});
