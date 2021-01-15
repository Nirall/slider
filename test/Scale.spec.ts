import Scale from '../src/plugin/View/blocks/Scale/Scale';
import * as types from '../src/plugin/types';

describe('Scale class(horizontal)', () => {
  let newItem: Scale;
  let observerResult: types.ObserverTestResult;

  const observer = (eventName: string, data: any): void => {
    observerResult = ({ eventName: eventName, data: data });
  };

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
    newItem = new Scale(parameters, observer);
    const entry = document.createElement('div');
    newItem.appendToNode(entry);
    document.body.appendChild(entry);
  });

  it('should has marks', () => {
    expect(newItem.marks.length).not.toEqual(0);
  });

  it('update() should set parameters property', () => {
    parameters.step = 2;
    newItem.update(parameters);
    expect(newItem.parameters.step).toEqual(2);
  });

  it('moveMarks() should move marks according their index', () => {
    expect(newItem.marks[2].elem.style.left).toEqual('40%');
  });

  it('marks should have value according their index', () => {
    expect(newItem.marks[2].value).toEqual(400);
  });

  it('appendToNode should append marks to the element', () => {
    const entry = document.createElement('div');
    newItem.appendToNode(entry);
    expect(Array.from(entry.children).indexOf(newItem.marks[1].elem)).not.toEqual(-1);
  });

  it('should notify observers with event "ClickOnScale" on click', () => {
    const mouseClick = new MouseEvent('click');
    newItem.marks[2].elem.dispatchEvent(mouseClick);
    expect(observerResult.eventName).toEqual('ClickOnScale');
  });

  it('should notify observers with value of the mark on click', () => {
    const mouseClick = new MouseEvent('click');
    newItem.marks[2].elem.dispatchEvent(mouseClick);
    expect(observerResult.data).toEqual(400);
  });
});

describe('Scale class(vertical)', () => {
  let newItem: Scale;

  const observer = (): void => {
    return null;
  };

  const parameters = {
    minValue: 0,
    maxValue: 900,
    step: 100,
    isRange: false,
    isVertical: true,
    showLabel: true,
    isFloat: false
  };

  beforeEach(() => {
    newItem = new Scale(parameters, observer);
    const entry = document.createElement('div');
    newItem.appendToNode(entry);
    document.body.appendChild(entry);
  });

  it('moveMarks() should move marks according their index', () => {
    expect(newItem.marks[1].elem.style.top).toEqual('22.2222%');
  });
});
