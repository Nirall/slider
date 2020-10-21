import Scale from '../src/slider/blocks/scale/Scale';

describe('Scale class(horizontal)', () => {
  let newItem: Scale;

  beforeEach(() => {
    newItem = new Scale(false);
    const entry = document.createElement('div');
    entry.style.width = '300px';
    entry.style.height = '300px';
    entry.appendChild(newItem.elem);
    document.body.appendChild(entry);
  });

  it('elem should has elem with class "slider__scale"', () => {
    expect((new Scale(false)).elem.classList.contains('slider__scale')).toEqual(true);
  });

  it('getPosition() should return left offset of the elem if isVertical = false', () => {
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().left);
  });

  it('getDimension() should return width of the elem if isVertical = false', () => {
    expect(newItem.getDimension()).toEqual(newItem.elem.getBoundingClientRect().width);
  });

  it('init() should add class "slider__scale_position_vertical" if isVertical = true', () => {
    newItem.init(true);
    expect(newItem.elem.classList.contains('slider__scale_position_vertical')).toEqual(true);
  });
});

describe('Scale class(vertical)', () => {
  let newItem: Scale;

  beforeEach(() => {
    newItem = new Scale(true);
    const entry = document.createElement('div');
    entry.style.width = '300px';
    entry.style.height = '300px';
    entry.appendChild(newItem.elem);
    document.body.appendChild(entry);
  });

  it('getPosition() should return top offset of the elem if isVertical = true', () => {
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().top);
  });

  it('getDimension() should return height of the elem if isVertical = true', () => {
    expect(newItem.getDimension()).toEqual(newItem.elem.getBoundingClientRect().height);
  });

  it('init(), elem should not has class "slider__scale_position_vertical" if isVertical = false', () => {
    newItem.init(false);
    expect(newItem.elem.classList.contains('slider__scale_position_vertical')).toEqual(false);
  });
});
