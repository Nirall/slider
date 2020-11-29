import createElem from '../createElem/createElem';

class ProgressBar {
  elem: HTMLElement;
  isVertical: boolean;

  constructor(isVertical: boolean) {
    this.elem = createElem('slider__scale-filling');
    this.isVertical = isVertical;
  }

  setPosition = (offset: number): void => {
    if (this.isVertical) {
      this.elem.style.left = '0';
      this.elem.style.width = '100%';
      this.elem.style.top = offset + 'px';
    } else {
      this.elem.style.top = '0';
      this.elem.style.height = '100%';
      this.elem.style.left = offset + 'px';
    }
  }

  setDimension = (dimension: number): void => {
    if (this.isVertical) {
      this.elem.style.height = dimension + 'px';
    } else {
      this.elem.style.width = dimension + 'px';
    }
  }

  init = (isVertical: boolean): void => {
    this.isVertical = isVertical;
  }
}

export default ProgressBar;
