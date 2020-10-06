import '../src/style.scss';
import Scale from '../src/assets/Scale';

describe('Scale class', () => {
  it('elem should has elem with class "slider__scale"', () => {
    expect((new Scale(false)).elem.classList.contains('slider__scale')).toEqual(true);
  });

  it('getPosition() should return left offset of the elem if isVertical = false', () => {
    const newItem = new Scale(false);
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().left);
  });

  it('getPosition() should return top offset of the elem if isVertical = true', () => {
    const newItem = new Scale(true);
    expect(newItem.getPosition()).toEqual(newItem.elem.getBoundingClientRect().top);
  });

  it('getDimension() should return width of the elem if isVertical = false', () => {
    const newItem = new Scale(false);
    expect(newItem.getDimension()).toEqual(newItem.elem.getBoundingClientRect().width);
  });

  it('getDimension() should return height of the elem if isVertical = true', () => {
    const newItem = new Scale(true);
    expect(newItem.getDimension()).toEqual(newItem.elem.getBoundingClientRect().height);
  });
});
