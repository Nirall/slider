import createElem from '../createElem';

class Knob {
  elem: HTMLElement;

  isVertical: boolean;

  constructor(isVertical: boolean) {
    this.elem = createElem('slider__knob');
    this.isVertical = isVertical;
  }

  getWidth = (): number => {
    return this.elem.getBoundingClientRect().width;
  }

  getPosition = (): number => {
    const { elem, isVertical } = this;
    if (isVertical) {
      return elem.getBoundingClientRect().top;
    }

    return elem.getBoundingClientRect().left;
  }

  setPosition = (offset: number): void => {
    const { style } = this.elem;
    if (this.isVertical) {
      style.left = '50%';
      style.top = `${offset}px`;
    } else {
      style.top = '50%';
      style.left = `${offset}px`;
    }
  }

  update = (isVertical: boolean): void => {
    this.isVertical = isVertical;
    const { elem } = this;
    if (isVertical) {
      elem.classList.add('slider__knob_position_vertical');
    } else {
      elem.classList.remove('slider__knob_position_vertical');
    }
  }
}

export default Knob;
