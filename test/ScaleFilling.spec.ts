import ScaleFilling from '../src/slider/blocks/scaleFilling/ScaleFilling';

describe('ScaleFilling class(horizontal)', () => {
  let newItem: ScaleFilling;

  beforeEach(() => {
    newItem = new ScaleFilling(false);
    const entry = document.createElement('div');
    entry.style.width = '300px';
    entry.style.height = '300px';
    entry.appendChild(newItem.elem);
    document.body.appendChild(entry);
  });

  it('should has elem with class "slider__scale-filling"', () => {
    expect(newItem.elem.classList.contains('slider__scale-filling')).toEqual(true);
  });

  it('property isVertical should be "false" if isVertical = false', () => {
    expect(newItem.isVertical).toEqual(false);
  });

  it('setPosition() should set style property "top" = "0" if isVertical = false', () => {
    newItem.setPosition(100);
    expect(newItem.elem.style.top).toEqual('0px');
  });

  it('setPosition() should set style property "left" according to the offset if isVertical = false', () => {
    newItem.setPosition(100);
    expect(newItem.elem.style.left).toEqual('100px');
  });

  it('setPosition() should set style property "height" to the "100%" if isVertical = false', () => {
    newItem.setPosition(100);
    expect(newItem.elem.style.height).toEqual('100%');
  });

  it('setDimension() should set style property "width" according to the certain value if isVertical = false', () => {
    newItem.setDimension(200);
    expect(newItem.elem.style.width).toEqual('200px');
  });
})

describe('ScaleFilling class(vertical)', () => {
  let newItem: ScaleFilling;

  beforeEach(() => {
    newItem = new ScaleFilling(true);
    const entry = document.createElement('div');
    entry.style.width = '300px';
    entry.style.height = '300px';
    entry.appendChild(newItem.elem);
    document.body.appendChild(entry);
  });

  it('property isVertical should be "true" if isVertical = true', () => {
    expect(newItem.isVertical).toEqual(true);
  });

  it('setPosition() should set style property "top" according to the offset if isVertical = true', () => {
    newItem.setPosition(200);
    expect(newItem.elem.style.top).toEqual('200px');
  });

  it('setPosition() should set style property "left" = "0" if isVertical = true', () => {
    newItem.setPosition(100);
    expect(newItem.elem.style.left).toEqual('0px');
  });

  it('setPosition() should set style property "top" according to the offset if isVertical = true', () => {
    newItem.setPosition(100);
    expect(newItem.elem.style.top).toEqual('100px');
  });

  it('setPosition() should set style property "width" to the "100%" if isVertical = true', () => {
    newItem.setPosition(100);
    expect(newItem.elem.style.width).toEqual('100%');
  });

  it('setDimension() should set style property "height" according to the certain value if isVertical = true', () => {
    newItem.setDimension(200);
    expect(newItem.elem.style.height).toEqual('200px');
  });
});
