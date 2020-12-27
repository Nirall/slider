import Knob from '../src/plugin/View/blocks/Knob/Knob';

describe('Knob class(horizontal)', () => {
  let newItem: Knob;

  beforeEach(() => {
    newItem = new Knob(false);
    const entry = document.createElement('div');
    entry.appendChild(newItem.elem);
    document.body.appendChild(entry);
  });

  it('should has an elem with class "slider__knob"', () => {
    expect(newItem.elem.classList.contains('slider__knob')).toEqual(true);
  });

  it('getWidth() should return width of the elem', () => {
    newItem.elem.style.width = '20px';
    newItem.elem.style.border = '0';
    expect(newItem.getWidth()).toEqual(20);
  });

  it('getPosition() should return left offset of the elem if isVertical = false', () => {
    newItem.elem.style.left = '133px';
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().left);
  });

  it('setPosition() should set left absoulte offset of the elem if isVertical = false', () => {
    newItem.setPosition(222);
    expect(newItem.elem.style.left).toEqual('222px');
  });

  it('setPosition() should set top absoulte offset of the elem to 50% if isVertical = false', () => {
    newItem.setPosition(321);
    expect(newItem.elem.style.top).toEqual('50%');
  });

  it('update() should set isVertical property', () => {
    newItem.update(true);
    expect(newItem.isVertical).toEqual(true);
  });
});

describe('Knob class(vertical)', () => {
  let newItem: Knob;

  beforeEach(() => {
    newItem = new Knob(true);
    const entry = document.createElement('div');
    entry.appendChild(newItem.elem);
    document.body.appendChild(entry);
  });

  it('getPosition() should return top offset of the elem if isVertical = true', () => {
    newItem.elem.style.top = '211px';
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().top);
  });

  it('setPosition() should set top absoulte offset of the elem if isVertical = true', () => {
    newItem.setPosition(472);
    expect(newItem.elem.style.top).toEqual('472px');
  });

  it('setPosition() should set left absoulte offset of the elem to 50% if isVertical = true', () => {
    newItem.setPosition(331);
    expect(newItem.elem.style.left).toEqual('50%');
  });

  it('update() should set isVertical property', () => {
    newItem.update(false);
    expect(newItem.isVertical).toEqual(false);
  });
});
