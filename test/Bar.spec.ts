import Bar from '../src/plugin/View/blocks/Bar/Bar';
import * as types from '../src/plugin/types';

describe('Bar class(horizontal)', () => {
  let newItem: Bar;
  let observerResult: types.ObserverTestResult;

  const observer = (eventName: string, data: any): void => {
    observerResult = ({ eventName: eventName, data: data });
  };

  beforeEach(() => {
    newItem = new Bar(false, observer);
    const entry = document.createElement('div');
    entry.appendChild(newItem.elem);
    document.body.appendChild(entry);
  });

  it('should has an elem with class "slider__bar"', () => {
    expect(newItem.elem.classList.contains('slider__bar')).toEqual(true);
  });

  it('getPosition() should return left offset of the elem if isVertical = false', () => {
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().left);
  });

  it('getDimension() should return width of the elem if isVertical = false', () => {
    newItem.elem.style.width = '100px';
    expect(newItem.getDimension()).toEqual(100);
  });

  it('update() should set isVertical property', () => {
    newItem.update(true);
    expect(newItem.isVertical).toEqual(true);
  });

  it('handleBarClick() should notify observers with event "ClickOnBar", on click event ', () => {
    const mouseClick = new MouseEvent('click');
    newItem.elem.dispatchEvent(mouseClick);
    expect(observerResult.eventName).toEqual('ClickOnBar');
  });

  it('handleBarClick() should send observers event data, on click event ', () => {
    const mouseClick = new MouseEvent('click');
    newItem.elem.dispatchEvent(mouseClick);
    expect(observerResult.data.type).toEqual('click');
  });
});

describe('Bar class(vertical)', () => {
  let newItem: Bar;

  const observer = (): void => {
    return null;
  };

  beforeEach(() => {
    newItem = new Bar(true, observer);
    const entry = document.createElement('div');
    newItem.elem.style.height = '100px';
    entry.appendChild(newItem.elem);
    document.body.appendChild(entry);
  });

  it('getPosition() should return top offset of the elem if isVertical = true', () => {
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().top);
  });

  it('getDimension() should return height of the elem if isVertical = true', () => {
    expect(newItem.getDimension()).toEqual(100);
  });

  it('update() should set isVertical property', () => {
    newItem.update(false);
    expect(newItem.isVertical).toEqual(false);
  });
});
