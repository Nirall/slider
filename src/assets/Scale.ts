import createElem from "./createElem";

class Scale {
  elem: HTMLElement;

  constructor() {this.elem = createElem("slider__scale");
  }

  getLeft(): number {
    return this.elem.getBoundingClientRect().left;
  }

  getWidth(): number {
    return this.elem.getBoundingClientRect().width;
  }

  getHeight(): number {
    return this.elem.getBoundingClientRect().height;
  }
  
  getTop(): number {
    return this.elem.getBoundingClientRect().top;
  }
}

export default Scale;
