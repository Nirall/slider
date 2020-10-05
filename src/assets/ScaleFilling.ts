import createElem from "./createElem";

class ScaleFilling {
  elem: HTMLElement;
  constructor() {
      this.elem = createElem("slider__scale-filling");
  }

  init(isVertical: boolean): void {
    if (isVertical) {
      this.elem.classList.add("slider__scale-filling_vertical");
    } else {
      this.elem.classList.remove("slider__scale-filling_vertical");
    }
  }
}

export default ScaleFilling;
