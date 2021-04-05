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
    if (this.isVertical) {
      return this.elem.getBoundingClientRect().top;
    }

    return this.elem.getBoundingClientRect().left;
  }

  setPosition = (offset: number): void => {
    if (this.isVertical) {
      this.elem.style.left = '50%';
      this.elem.style.top = offset + 'px';
    } else {
      this.elem.style.top = '50%';
      this.elem.style.left = offset + 'px';
    }
  }

  update = (isVertical: boolean): void => {
    this.isVertical = isVertical;

    if (this.isVertical) {
      this.elem.classList.add('slider__knob_position_vertical');
    } else {
      this.elem.classList.remove('slider__knob_position_vertical');
    }
  }
}

export default Knob;
