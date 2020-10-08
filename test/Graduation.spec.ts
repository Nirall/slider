import Graduation from '../src/assets/Graduation';

describe('Graduation class(horizontal)', () => {
  let newItem: Graduation;

  beforeEach(() => {
    newItem = new Graduation();
    newItem.init(0, 9000, false);
  });

  it('should has gradElem with class "slider__graduation"', () => {
    expect(newItem.gradElem.classList.contains('slider__graduation')).toEqual(true);
  });

  it('should has mark1 elem with class "slider__graduation-mark"', () => {
    expect(newItem.mark1.classList.contains('slider__graduation-mark')).toEqual(true);
  });

  it('should has mark2 elem with class "slider__graduation-mark"', () => {
    expect(newItem.mark2.classList.contains('slider__graduation-mark')).toEqual(true);
  });

  it('should has mark2 elem with class "slider__graduation-mark"', () => {
    expect(newItem.mark2.classList.contains('slider__graduation-mark')).toEqual(true);
  });

  it('should has mark3 elem with class "slider__graduation-mark"', () => {
    expect(newItem.mark3.classList.contains('slider__graduation-mark')).toEqual(true);
  });

  it('should has mark4 elem with class "slider__graduation-mark"', () => {
    expect(newItem.mark4.classList.contains('slider__graduation-mark')).toEqual(true);
  });

  it('init() method should set innerHTML of mark1 to the minvalue', () => {
    expect(newItem.mark1.innerHTML).toEqual('0');
  });

  it('init() method should set innerHTML of mark4 to the maxvalue', () => {
    expect(newItem.mark4.innerHTML).toEqual('9000');
  });

  it('init() method should set innerHTML of mark2 to the minValue + 1/3(maxVal - minval)', () => {
    expect(newItem.mark2.innerHTML).toEqual('3000');
  });

  it('init() method should set innerHTML of mark3 to the minValue + 1/3(maxVal - minval)', () => {
    expect(newItem.mark3.innerHTML).toEqual('6000');
  });

  it('init(), if .float = true innerHTML of mark should be float', () => {
    newItem.init(1, 3, false, true);
    expect(newItem.mark2.innerHTML).toEqual('1.67');
  });

  it('init(), gradElem should not has class "slider__graduation_position_vertical" if isVertical = false', () => {
    expect(newItem.gradElem.classList.contains('slider__graduation_position_vertical')).toEqual(false);
  });

  it('init(), mark1 should has class "slider__graduation-mark_offset_left" if isVertical = false', () => {
    expect(newItem.mark1.classList.contains('slider__graduation-mark_offset_left')).toEqual(true);
  });

  it('init(), mark1 should not has class "slider__graduation-mark_offset_top" if isVertical = false', () => {
    expect(newItem.mark1.classList.contains('slider__graduation-mark_offset_top')).toEqual(false);
  });

  it('init(), mark4 should has class "slider__graduation-mark_offset_right" if isVertical = false', () => {
    expect(newItem.mark4.classList.contains('slider__graduation-mark_offset_right')).toEqual(true);
  });

  it('init(), mark4 should not has class "slider__graduation-mark_offset_bottom" if isVertical = false', () => {
    expect(newItem.mark4.classList.contains('slider__graduation-mark_offset_bottom')).toEqual(false);
  });
});

describe('Graduation class(vertical)', () => {
  let newItem: Graduation;

  beforeEach(() => {
    newItem = new Graduation();
    newItem.init(-4000, -1000, true);
  });

  it('init(), gradElem should has class "slider__graduation_position_vertical" if isVertical = true', () => {
    expect(newItem.gradElem.classList.contains('slider__graduation_position_vertical')).toEqual(true);
  });

  it('init(), mark1 should not has class "slider__graduation-mark_offset_left" if isVertical = true', () => {
    expect(newItem.mark1.classList.contains('slider__graduation-mark_offset_left')).toEqual(false);
  });

  it('init(), mark1 should has class "slider__graduation-mark_offset_top" if isVertical = true', () => {
    expect(newItem.mark1.classList.contains('slider__graduation-mark_offset_top')).toEqual(true);
  });

  it('init(), mark4 should not has class "slider__graduation-mark_offset_right" if isVertical = true', () => {
    expect(newItem.mark4.classList.contains('slider__graduation-mark_offset_right')).toEqual(false);
  });

  it('init(), mark4 should has class "slider__graduation-mark_offset_bottom" if isVertical = true', () => {
    expect(newItem.mark4.classList.contains('slider__graduation-mark_offset_bottom')).toEqual(true);
  });
});
