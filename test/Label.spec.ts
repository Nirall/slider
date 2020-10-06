import '../src/style.scss';
import Label from '../src/assets/Label';

describe('Label class', () => {
  it('should has elem with class "slider__button-label"', () => {
    const newItem = new Label(false);
    expect(newItem.elem.classList.contains('slider__button-label')).toEqual(true);
  });

  it('getPosition() should return left offset of the elem if isVertical = false', () => {
    const newItem = new Label(false);
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().left);
  });

  it('getPosition() should return top offset of the elem if isVertical = true', () => {
    const newItem = new Label(true);
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().top);
  });

  it('getDimension() should return width of the elem if isVertical = false', () => {
    const newItem = new Label(false);
    expect(newItem.getDimension()).toEqual(newItem.elem.getBoundingClientRect().width);
  });

  it('getDimension() should return height of the elem if isVertical = true', () => {
    const newItem = new Label(true);
    expect(newItem.getDimension()).toEqual(newItem.elem.getBoundingClientRect().height);
  });

  it('init() should add class "slider__button-label_vertical" to the elem if isVertical = true', () => {
    const newItem = new Label(true);
    newItem.init(true);
    expect(newItem.elem.classList.contains('slider__button-label_position_vertical')).toEqual(true);
  });

  it('init() should remove class "slider__button-label_vertical" to the elem if isVertical = false', () => {
    const newItem = new Label(false);
    newItem.init(false);
    expect(newItem.elem.classList.contains('slider__button-label_position_vertical')).toEqual(false);
  });
})
