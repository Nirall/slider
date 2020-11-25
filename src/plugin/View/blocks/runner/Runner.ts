import Button from "../../blocks/button/Button";
import Label from "../../blocks/label/Label";

class Runner {
  button: Button;
  label: Label;

  isVertical: boolean;

  constructor(isVertical: boolean) {
    this.isVertical = isVertical;
    this.button = new Button(isVertical);
    this.label = new Label(isVertical);
  }

  getPosition = (): number => {
    return this.button.getPosition();
  }

  setPosition = (offset: number, value: number): void => {
    this.label.setPosition(offset + this.button.getWidth()/2, value);
    this.button.setPosition(offset);
  }

  init = (isVertical: boolean): void => {
    this.button.init(isVertical);
    this.label.init(isVertical);
  }

  getWidth = (): number => {
    return this.button.getWidth();
  }

  hide = (): void => {
    this.button.elem.style.display = "none";
    this.label.elem.style.display = "none";
  }

  hideLabel = (): void => {
    this.label.elem.style.display = "none";
  }

  showLabel = (): void => {
    this.label.elem.style.display = "block";
  }

  show = (): void => {
    this.button.elem.style.display = "block";
  }
}

export default Runner;