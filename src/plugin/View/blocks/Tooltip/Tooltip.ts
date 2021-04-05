import createElem from '../createElem';

class Tooltip {
  elem: HTMLElement;

  isVertical: boolean;

  constructor(isVertical: boolean) {
    this.elem = createElem('slider__tooltip');
    this.isVertical = isVertical;
  }

  getPosition = (): number => {
    if (this.isVertical) {
      return this.elem.getBoundingClientRect().top;
    }

    return this.elem.getBoundingClientRect().left;
  }

  setPosition = (offset: number, value: number): void => {
    this.elem.innerHTML = value + '';
    const edgeOffset = offset - this.getDimension() / 2;

    if (this.isVertical) {
      this.elem.style.left = '50%';
      this.elem.style.top = `${edgeOffset}px`;
    } else {
      this.elem.style.top = '50%';
      this.elem.style.left = `${edgeOffset}px`;
    }
  }

  getDimension = (): number => {
    if (this.isVertical) {
      return this.elem.getBoundingClientRect().height;
    }

    return this.elem.getBoundingClientRect().width;
  }

  update = (isVertical: boolean): void => {
    this.isVertical = isVertical;

    if (this.isVertical) {
      this.elem.classList.add('slider__tooltip_position_vertical');
    } else {
      this.elem.classList.remove('slider__tooltip_position_vertical');
    }
  }
}

export default Tooltip;
