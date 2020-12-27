import Runner from '../src/plugin/View/blocks/Runner/Runner';
import * as types from '../src/plugin/types';

describe('Runner class(horizontal)', () => {
  let newItem: Runner;
  let observerResult: types.ObserverTestResult;

  const observer = (eventName: string, data: any): void => {
    observerResult = ({ eventName: eventName, data: data });
  };

  beforeEach(() => {
    newItem = new Runner(false, observer);
    const entry = document.createElement('div');
    newItem.appendToNode(entry);
    document.body.appendChild(entry);
  });

  it('getPosition() should call method getPosition() of the knob-element of the runner', () => {
    expect(newItem.getPosition()).toEqual(newItem.knob.getPosition());
  });

  it('setPosition() should set offset of the tooltip of the runner', () => {
    newItem.setPosition(123, 3333);
    const offset = 123 + newItem.getWidth() / 2 - newItem.tooltip.getDimension() / 2 + 'px';
    expect(newItem.tooltip.elem.style.left).toEqual(offset);
  });

  it('update() should set isVertical property of the knob', () => {
    newItem.update(true);
    expect(newItem.knob.isVertical).toEqual(true);
  });

  it('update() should set isVertical property of the tooltip', () => {
    newItem.update(true);
    expect(newItem.tooltip.isVertical).toEqual(true);
  });

  it('getWidth() should call getWidth() of the knob of the runner', () => {
    expect(newItem.getWidth()).toEqual(newItem.knob.getWidth());
  });

  it('hideRunner() should set display = "none" of the knob of the runner', () => {
    newItem.hideRunner();
    expect(newItem.knob.elem.style.display).toEqual('none');
  });

  it('hideRunner() should set display = "none" of the tooltip of the runner', () => {
    newItem.hideRunner();
    expect(newItem.tooltip.elem.style.display).toEqual('none');
  });

  it('hideLabel() should set display = "none" of the tooltip of the runner', () => {
    newItem.hideLabel();
    expect(newItem.tooltip.elem.style.display).toEqual('none');
  });

  it('showLabel() should set display = "block" of the tooltip of the runner', () => {
    newItem.showLabel();
    expect(newItem.tooltip.elem.style.display).toEqual('block');
  });

  it('showRunner() should set display = "block" of the knob of the runner', () => {
    newItem.showRunner();
    expect(newItem.knob.elem.style.display).toEqual('block');
  });

  it('appendToNode() should append the knob-element to the entry', () => {
    const entry = document.createElement('div');
    newItem.appendToNode(entry);
    const isContent = Array.from(entry.children).indexOf(newItem.knob.elem) !== -1;
    expect(isContent).toEqual(true);
  });

  it('appendToNode() should append the tooltip-element to the entry', () => {
    const entry = document.createElement('div');
    newItem.appendToNode(entry);
    const isContent = Array.from(entry.children).indexOf(newItem.tooltip.elem) !== -1;
    expect(isContent).toEqual(true);
  });

  it('should notify observers with event "MovingRunner" on moving', () => {
    const mDownEvent = new MouseEvent('mousedown');
    const mMoveEvent = new MouseEvent('mousemove');
    const mUpEvent = new MouseEvent('mouseup');
    newItem.knob.elem.dispatchEvent(mDownEvent);
    document.dispatchEvent(mMoveEvent);
    document.dispatchEvent(mUpEvent);
    expect(observerResult.eventName).toEqual('MovingRunner');
  });

  it('should notify observers with event "mousemove" on moving', () => {
    const mDownEvent = new MouseEvent('mousedown');
    const mMoveEvent = new MouseEvent('mousemove');
    const mUpEvent = new MouseEvent('mouseup');
    newItem.knob.elem.dispatchEvent(mDownEvent);
    document.dispatchEvent(mMoveEvent);
    document.dispatchEvent(mUpEvent);
    expect(observerResult.data.event.type).toEqual('mousemove');
  });
});

describe('Runner class(vertical)', () => {
  let newItem: Runner;
  let observerResult: types.ObserverTestResult;

  const observer = (eventName: string, data: any): void => {
    observerResult = ({ eventName: eventName, data: data });
  };

  beforeEach(() => {
    newItem = new Runner(true, observer);
    const entry = document.createElement('div');
    newItem.appendToNode(entry);
    document.body.appendChild(entry);
  });

  it('setPosition() should set offset of the tooltip of the runner', () => {
    newItem.setPosition(123, 123);
    const offset = 123 + newItem.getWidth() / 2 - newItem.tooltip.getDimension() / 2 + 'px';
    expect(newItem.tooltip.elem.style.top).toEqual(offset);
  });

  it('update() should set isVertical property of the knob', () => {
    newItem.update(false);
    expect(newItem.knob.isVertical).toEqual(false);
  });

  it('update() should set isVertical property of the tooltip', () => {
    newItem.update(false);
    expect(newItem.tooltip.isVertical).toEqual(false);
  });
});
