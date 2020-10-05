import '../src/style.scss';
import Button from '../src/assets/Button';

describe('Button class', () => {
  let newItem: Button;
  let isVertical: false;

  beforeEach(() => {
    newItem = new Button(false);
  });

  it('should has elem with class "slider__button"', () => {
    expect(newItem.elem.classList.contains('slider__button')).toEqual(true);
  });

  it('getPosition() should return left offset of the elem if isVertical = false', () => {
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().left);
  });

  it('getPosition() should return top offset of the elem if isVertical = true', () => {
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().top);
  });

  it('getWidth() should return width of the elem', () => {
    expect(newItem.getWidth()).toEqual(newItem.elem.getBoundingClientRect().width);
  });
})
