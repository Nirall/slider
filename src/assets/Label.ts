import createElem from "./createElem";

class Label {
  elem: HTMLElement;

  constructor() {
    this.elem = createElem("slider__button-label");
  }

  getWidth(): number {
    return this.elem.getBoundingClientRect().width;
  }
  
  getHeight(): number {
    return this.elem.getBoundingClientRect().height;
  }
}

export default Label;