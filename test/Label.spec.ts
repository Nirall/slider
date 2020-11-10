import Label from '../src/plugin/View/blocks/label/Label';

describe('Label class(horizontal)', () => {
  let newItem: Label;

  beforeEach(() => {
    newItem = new Label(false);
    const entry = document.createElement('div');
    entry.appendChild(newItem.elem);
    document.body.appendChild(entry);
    newItem.elem.style.width = '90px';
    newItem.elem.style.height = '40px';
    newItem.elem.style.display = 'block';
  });

  it('should has elem with class "slider__button-label"', () => {
    expect(newItem.elem.classList.contains('slider__button-label')).toEqual(true);
  });

  it('getPosition() should return left offset of the elem if isVertical = false', () => {
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().left);
  });

  it('getDimension() should return width of the elem if isVertical = false', () => {
    expect(newItem.getDimension()).toEqual(newItem.elem.getBoundingClientRect().width);
  });

  it('init(), element should not has class "slider__button-label_vertical" if isVertical = false', () => {
    newItem.init(false);
    expect(newItem.elem.classList.contains('slider__button-label_position_vertical')).toEqual(false);
  });

  it('setPosition() should set style property "top" = "50%" if isVertical = false', () => {
    newItem.setPosition(100, 100);
    expect(newItem.elem.style.top).toEqual('50%');
  });

  it('setPosition() should set style property "left" according to offset if isVertical = false', () => {
    newItem.setPosition(200, 200);
    expect(newItem.elem.style.left).toEqual('150px');
  });

  it('setPosition() should set innerHTML of the element', () => {
    newItem.setPosition(200, 777);
    expect(newItem.elem.innerHTML).toEqual('777');
  });
});

describe('Label class(vertical)', () => {
  let newItem: Label;

  beforeEach(() => {
    newItem = new Label(true);
    const entry = document.createElement('div');
    entry.appendChild(newItem.elem);
    document.body.appendChild(entry);
    newItem.elem.style.width = '90px';
    newItem.elem.style.height = '40px';
    newItem.elem.style.display = 'block';
  });

  it('getPosition() should return top offset of the elem if isVertical = true', () => {
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().top);
  });

  it('getDimension() should return height of the elem if isVertical = true', () => {
    expect(newItem.getDimension()).toEqual(newItem.elem.getBoundingClientRect().height);
  });

  it('init() should add class "slider__button-label_vertical" to the elem if isVertical = true', () => {
    newItem.init(true);
    expect(newItem.elem.classList.contains('slider__button-label_position_vertical')).toEqual(true);
  });

  it('setPosition() should set style property "left" = "50%" if isVertical = true', () => {
    newItem.setPosition(100, 100);
    expect(newItem.elem.style.left).toEqual('50%');
  });

  it('setPosition() should set style property "top" according to offset if isVertical = true', () => {
    newItem.setPosition(200, 200);
    expect(newItem.elem.style.top).toEqual('175px');
  });
});
