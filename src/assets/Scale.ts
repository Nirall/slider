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

  getPosition(isVertical: boolean): number {
    if (isVertical) {
      return this.elem.getBoundingClientRect().top;
    }

    return this.elem.getBoundingClientRect().left;
  }

  getDimension(isVertical: boolean): number {
    if (isVertical) {
      return this.elem.getBoundingClientRect().height;
    }

    return this.elem.getBoundingClientRect().width;
  }

  init(isVertical: boolean): void {
    if (isVertical) {
      this.elem.classList.add("slider__scale_vertical");
    } else {
      this.elem.classList.remove("slider__scale_vertical");
    }
  }
}

export default Scale;
