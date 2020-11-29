import createElem from '../createElem/createElem';

class Bar {
  elem: HTMLElement;
  isVertical: boolean;

  constructor(isVertical: boolean) {
    this.elem = createElem('slider__scale');
    this.isVertical = isVertical;
  }

  getPosition = (): number => {
    if (this.isVertical) {
      return this.elem.getBoundingClientRect().top;
    }

    return this.elem.getBoundingClientRect().left;
  }

  getDimension = (): number => {
    if (this.isVertical) {
      return this.elem.getBoundingClientRect().height;
    }

    return this.elem.getBoundingClientRect().width;
  }

  init = (isVertical: boolean): void => {
    this.isVertical = isVertical;

    if (this.isVertical) {
      this.elem.classList.add('slider__scale_position_vertical');
    } else {
      this.elem.classList.remove('slider__scale_position_vertical');
    }
  }
}

export default Bar;
