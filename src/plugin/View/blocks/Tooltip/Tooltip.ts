import createElem from '../createElem';

class Tooltip {
  elem: HTMLElement;

  isVertical: boolean;

  constructor(isVertical: boolean) {
    this.elem = createElem('slider__tooltip');
    this.isVertical = isVertical;
  }

  getPosition = (): number => {
    const { elem, isVertical } = this;
    if (isVertical) {
      return elem.getBoundingClientRect().top;
    }

    return elem.getBoundingClientRect().left;
  }

  setPosition = (offset: number, value: number): void => {
    this.elem.innerHTML = String(value);
    const edgeOffset = offset - this.getDimension() / 2;
    const { style } = this.elem;

    if (this.isVertical) {
      style.left = '50%';
      style.top = `${edgeOffset}px`;
    } else {
      style.top = '50%';
      style.left = `${edgeOffset}px`;
    }
  }

  getDimension = (): number => {
    const { elem, isVertical } = this;
    if (isVertical) {
      return elem.getBoundingClientRect().height;
    }

    return elem.getBoundingClientRect().width;
  }

  update = (isVertical: boolean): void => {
    this.isVertical = isVertical;
    const { elem } = this;
    if (this.isVertical) {
      elem.classList.add('slider__tooltip_position_vertical');
    } else {
      elem.classList.remove('slider__tooltip_position_vertical');
    }
  }
}

export default Tooltip;
