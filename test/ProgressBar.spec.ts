import ProgressBar from '../src/plugin/View/blocks/ProgressBar/ProgressBar';

describe('ProgressBar class(horizontal)', () => {
  let newItem: ProgressBar;

  beforeEach(() => {
    newItem = new ProgressBar(false);
    const entry = document.createElement('div');
    entry.appendChild(newItem.elem);
    document.body.appendChild(entry);
  });

  it('should has an elem with class "slider__progress-bar"', () => {
    expect(newItem.elem.classList.contains('slider__progress-bar')).toEqual(true);
  });

  it('setPosition() should set left absoulte offset of the elem if isVertical = false', () => {
    newItem.setPosition(222);
    expect(newItem.elem.style.left).toEqual('222px');
  });

  it('setPosition() should set height of the elem to the 100% if isVertical = false', () => {
    newItem.setPosition(72);
    expect(newItem.elem.style.height).toEqual('100%');
  });

  it('setPosition() should set top absoulte offset of the elem to 0 if isVertical = false', () => {
    newItem.setPosition(47);
    expect(newItem.elem.style.top).toEqual('0px');
  });

  it('setDimension() should set width of the elem if isVertical = false', () => {
    newItem.setDimension(531);
    expect(newItem.elem.style.width).toEqual('531px');
  });

  it('update() should set isVertical property', () => {
    newItem.update(true);
    expect(newItem.isVertical).toEqual(true);
  });
});

describe('ProgressBar class(vertical)', () => {
  let newItem: ProgressBar;

  beforeEach(() => {
    newItem = new ProgressBar(true);
    const entry = document.createElement('div');
    entry.appendChild(newItem.elem);
    document.body.appendChild(entry);
  });

  it('setPosition() should set top absoulte offset of the elem if isVertical = true', () => {
    newItem.setPosition(777);
    expect(newItem.elem.style.top).toEqual('777px');
  });

  it('setPosition() should set width of the elem to the 100% if isVertical = true', () => {
    newItem.setPosition(413);
    expect(newItem.elem.style.width).toEqual('100%');
  });

  it('setPosition() should set left absoulte offset of the elem to 0 if isVertical = true', () => {
    newItem.setPosition(423);
    expect(newItem.elem.style.left).toEqual('0px');
  });

  it('setDimension() should set height of the elem if isVertical = false', () => {
    newItem.setDimension(399);
    expect(newItem.elem.style.height).toEqual('399px');
  });

  it('update() should set isVertical property', () => {
    newItem.update(false);
    expect(newItem.isVertical).toEqual(false);
  });
});
