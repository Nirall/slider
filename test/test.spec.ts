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

  it('should move Runner if there is a MouseEvent ', () => {
    console.log(newItem.parameters);
    const mDownEvent = new MouseEvent('mousedown');
    const mMoveEvent = new MouseEvent('mousemove', { clientX: 0 });
    const mUpEvent = new MouseEvent('mouseup');
    newItem.runnerMain.tooltip.elem.dispatchEvent(mDownEvent);
    document.dispatchEvent(mMoveEvent);
    document.dispatchEvent(mUpEvent);
    expect(newItem.runnerMain.tooltip.elem.innerHTML).toEqual('500');
  });
});
