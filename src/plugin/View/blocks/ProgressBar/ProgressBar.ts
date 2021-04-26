import createElem from '../createElem';

class ProgressBar {
  elem: HTMLElement;

  isVertical: boolean;

  constructor(isVertical: boolean) {
    this.elem = createElem('slider__progress-bar');
    this.isVertical = isVertical;
  }

  setPosition = (offset: number): void => {
    const { style } = this.elem;
    if (this.isVertical) {
      style.left = '0';
      style.width = '100%';
      style.top = `${offset}px`;
    } else {
      style.top = '0';
      style.height = '100%';
      style.left = `${offset}px`;
    }
  }

  setDimension = (dimension: number): void => {
    const { style } = this.elem;
    if (this.isVertical) {
      style.height = `${dimension}px`;
    } else {
      style.width = `${dimension}px`;
    }
  }

  update = (isVertical: boolean): void => {
    this.isVertical = isVertical;
  }
}

export default ProgressBar;
