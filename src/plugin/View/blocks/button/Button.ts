import createElem from '../createElem/createElem';

class Button {
  elem: HTMLElement;

  isVertical: boolean;

  constructor(isVertical: boolean) {
    this.elem = createElem('slider__button');
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

  init = (isVertical: boolean): void => {
    this.isVertical = isVertical;

    if (this.isVertical) {
      this.elem.classList.add('slider__button_position_vertical');
    } else {
      this.elem.classList.remove('slider__button_position_vertical');
    }
  }
}

export default Button;
