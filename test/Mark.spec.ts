import Mark from '../src/plugin/View/blocks/Scale/Mark/Mark';
import * as types from '../src/plugin/types';

describe('Mark class(horizontal)', () => {
  let newItem: Mark;
  let observerResult: types.ObserverTestResult;

  const observer = (eventName: string, data: any): void => {
    observerResult = ({ eventName: eventName, data: data });
  };

  beforeEach(() => {
    newItem = new Mark(false, observer);
    const entry = document.createElement('div');
    document.body.appendChild(entry);
    entry.appendChild(newItem.elem);
  });

  it('should has an elem with class "slider__mark"', () => {
    expect(newItem.elem.classList.contains('slider__mark')).toEqual(true);
  });

  it('getPosition() should return left offset of the elem if isVertical = false', () => {
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().left);
  });

  it('getDimension() should return width of the elem if isVertical = false', () => {
    expect(newItem.getDimension()).toEqual(newItem.elem.getBoundingClientRect().width);
  });

  it('setPosition() should set content of the elem', () => {
    newItem.setPosition(222, 233);
    expect(newItem.elem.innerHTML).toEqual('233');
  });

  it('setPosition() should set property "value"', () => {
    newItem.setPosition(111, 133);
    expect(newItem.value).toEqual(133);
  });

  it('setPosition() should set left offset of the element in % if isVertical = false', () => {
    newItem.setPosition(22, 112);
    expect(newItem.elem.style.left).toEqual('22%');
  });

  it('setPosition() should set top offset of the element to 50% if isVertical = false', () => {
    newItem.setPosition(23, 112);
    expect(newItem.elem.style.top).toEqual('50%');
  });

  it('setPosition() should set left margin of the element to "-dimension/2" if isVertical = false', () => {
    newItem.setPosition(111, 22);
    expect(newItem.elem.style.marginLeft).toEqual(-newItem.getDimension() / 2 + 'px');
  });

  it('setPosition() should set top margin of the element to 15px if isVertical = false', () => {
    newItem.setPosition(111, 22);
    expect(newItem.elem.style.marginTop).toEqual('15px');
  });

  it('update() should set isVertical property', () => {
    newItem.update(true);
    expect(newItem.isVertical).toEqual(true);
  });

  it('should notify observers with event "ClickOnMark" on click', () => {
    const mouseClick = new MouseEvent('click');
    newItem.elem.dispatchEvent(mouseClick);
    expect(observerResult.eventName).toEqual('ClickOnMark');
  });

  it('should notify observers with value on click', () => {
    newItem.value = 433;
    const mouseClick = new MouseEvent('click');
    newItem.elem.dispatchEvent(mouseClick);
    expect(observerResult.data).toEqual(433);
  });
});

describe('Mark class(vertical)', () => {
  let newItem: Mark;
  let observerResult: types.ObserverTestResult;

  const observer = (eventName: string, data: any): void => {
    observerResult = ({ eventName: eventName, data: data });
  };

  beforeEach(() => {
    newItem = new Mark(true, observer);
    const entry = document.createElement('div');
    entry.appendChild(newItem.elem);
    document.body.appendChild(entry);
  });

  it('getPosition() should return top offset of the elem if isVertical = true', () => {
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().top);
  });

  it('getDimension() should return height of the elem if isVertical = true', () => {
    expect(newItem.getDimension()).toEqual(newItem.elem.getBoundingClientRect().height);
  });

  it('setPosition() should set top offset of the element in % if isVertical = true', () => {
    newItem.setPosition(17, 112);
    expect(newItem.elem.style.top).toEqual('17%');
  });

  it('setPosition() should set top left of the element to 50% if isVertical = true', () => {
    newItem.setPosition(13, 112);
    expect(newItem.elem.style.left).toEqual('50%');
  });

  it('setPosition() should set top margin of the element to "-dimension/2" of the dimension if isVertical = true', () => {
    newItem.setPosition(111, 22);
    expect(newItem.elem.style.marginTop).toEqual(-newItem.getDimension() / 2 + 'px');
  });

  it('setPosition() should set left margin of the element to -45px if isVertical = true', () => {
    newItem.setPosition(111, 22);
    expect(newItem.elem.style.marginLeft).toEqual('-45px');
  });

  it('update() should set isVertical property', () => {
    newItem.update(false);
    expect(newItem.isVertical).toEqual(false);
  });
});
