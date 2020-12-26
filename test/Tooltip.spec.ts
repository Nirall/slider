import Tooltip from '../src/plugin/View/blocks/Tooltip/Tooltip';

describe('Tooltip class(horizontal)', () => {
  let newItem: Tooltip;

  beforeEach(() => {
    newItem = new Tooltip(false);
    const entry = document.createElement('div');
    entry.appendChild(newItem.elem);
    document.body.appendChild(entry);
  });

  it('should has an elem with class "slider__tooltip"', () => {
    expect(newItem.elem.classList.contains('slider__tooltip')).toEqual(true);
  });

  it('getPosition() should return left offset of the elem if isVertical = false', () => {
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().left);
  });

  it('getDimension() should return width of the elem if isVertical = false', () => {
    newItem.elem.style.width = '33px';
    expect(newItem.getDimension()).toEqual(33);
  });

  it('setPosition() should set content of the elem', () => {
    newItem.setPosition(123, 345);
    expect(newItem.elem.innerHTML).toEqual('345');
  });

  it('setPosition() should set left absolute offset of the elem if isVertical = false', () => {
    newItem.setPosition(322, 145);
    const offset = 322 - newItem.getDimension() / 2;
    expect(newItem.elem.style.left).toEqual(offset + 'px');
  });

  it('setPosition() should set top absolute offset to 50% of the elem if isVertical = false', () => {
    newItem.setPosition(996, 23);
    expect(newItem.elem.style.top).toEqual('50%');
  });

  it('update() should set isVertical property', () => {
    newItem.update(true);
    expect(newItem.isVertical).toEqual(true);
  });
});

describe('Tooltip class(vertical)', () => {
  let newItem: Tooltip;

  beforeEach(() => {
    newItem = new Tooltip(true);
    const entry = document.createElement('div');
    entry.appendChild(newItem.elem);
    document.body.appendChild(entry);
  });

  it('getPosition() should return top offset of the elem if isVertical = true', () => {
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().top);
  });

  it('getDimension() should return height of the elem if isVertical = true', () => {
    newItem.elem.style.height = '55px';
    expect(newItem.getDimension()).toEqual(55);
  });

  it('setPosition() should set top absolute offset of the elem if isVertical = true', () => {
    newItem.setPosition(680, 15);
    const offset = 680 - newItem.getDimension() / 2;
    expect(newItem.elem.style.top).toEqual(offset + 'px');
  });

  it('setPosition() should set left absolute offset to 50% of the elem if isVertical = true', () => {
    newItem.setPosition(96, 323);
    expect(newItem.elem.style.left).toEqual('50%');
  });

  it('update() should set isVertical property', () => {
    newItem.update(false);
    expect(newItem.isVertical).toEqual(false);
  });
});
