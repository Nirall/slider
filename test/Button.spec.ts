import '../src/style.scss';
import Button from '../src/assets/Button';

describe('Button class', () => {
  it('should has elem with class "slider__button"', () => {
    const newItem = new Button(false);
    expect(newItem.elem.classList.contains('slider__button')).toEqual(true);
  });

  it('getWidth() should return width of the elem', () => {
    const newItem = new Button(true);
    expect(newItem.getWidth()).toEqual(newItem.elem.getBoundingClientRect().width);
  });

  it('getPosition() should return left offset of the elem if isVertical = false', () => {
    const newItem = new Button(false);
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().left);
  });

  it('getPosition() should return top offset of the elem if isVertical = true', () => {
    const newItem = new Button(true);
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().top);
  });
})
