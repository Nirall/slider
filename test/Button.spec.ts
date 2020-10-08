import Button from '../src/assets/Button';

describe('Button class(horizontal)', () => {
  let newItem: Button;

  beforeEach(() => {
    newItem = new Button(false);
    const entry = document.createElement('div');
    entry.appendChild(newItem.elem);
    document.body.appendChild(entry);
  });

  it('should has elem with class "slider__button"', () => {
    expect(newItem.elem.classList.contains('slider__button')).toEqual(true);
  });

  it('getWidth() should return width of the elem', () => {
    expect(newItem.getWidth()).toEqual(newItem.elem.getBoundingClientRect().width);
  });

  it('getPosition() should return left offset of the elem if isVertical = false', () => {
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().left);
  });

  it('setPosition() should set style property "top" = "50%" if isVertical = false', () => {
    newItem.setPosition(100);
    expect(newItem.elem.style.top).toEqual('50%');
  });

  it('setPosition() should set style property "left" according to offset if isVertical = false', () => {
    newItem.setPosition(200);
    expect(newItem.elem.style.left).toEqual('200px');
  });

  it('init() should add class "slider__button_position_vertical" if isVertical = true', () => {
    newItem.init(true);
    expect(newItem.elem.classList.contains('slider__button_position_vertical')).toEqual(true);
  });
})

describe('Button class(vertical)', () => {
  let newItem: Button;

  beforeEach(() => {
    newItem = new Button(true);
    const entry = document.createElement('div');
    entry.appendChild(newItem.elem);
    document.body.appendChild(entry);
  });

  it('getPosition() should return top offset of the elem if isVertical = true', () => {
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().top);
  });

  it('setPosition() should set style property "left" = "50%" if isVertical = true', () => {
    newItem.setPosition(100);
    expect(newItem.elem.style.left).toEqual('50%');
  });

  it('setPosition() should set style property "top" according to offset if isVertical = true', () => {
    newItem.setPosition(200);
    expect(newItem.elem.style.top).toEqual('200px');
  });

  it('init(), elem should not has class "slider__button_position_vertical" if isVertical = false', () => {
    newItem.init(false);
    expect(newItem.elem.classList.contains('slider__button_position_vertical')).toEqual(false);
  });
});
