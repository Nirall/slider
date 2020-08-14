import createElem from "./createElem";

class Button {
  elem: HTMLElement;

  constructor() {
    this.elem = createElem("slider__button");
  }

  getLeft(): number {
    return this.elem.getBoundingClientRect().left;
  }

  getWidth(): number {
    return this.elem.getBoundingClientRect().width;
  }

  getTop(): number {
    return this.elem.getBoundingClientRect().top;
  }
}

export default Button;