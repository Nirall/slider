import Button from "../../blocks/button/Button";
import Label from "../../blocks/label/Label";
import MakeObservableObject from '../../../makeObservableObject/MakeObservableObject';

class Runner {
  button: Button;
  label: Label;
  isVertical: boolean;
  observers: MakeObservableObject;

  constructor(isVertical: boolean, moveObserver: Function) {
    this.isVertical = isVertical;
    this.button = new Button(isVertical);
    this.label = new Label(isVertical);
    this.observers = new MakeObservableObject();
    this.observers.addObserver(moveObserver);
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

  hideRunner = (): void => {
    this.button.elem.style.display = "none";
    this.label.elem.style.display = "none";
  }

  hideLabel = (): void => {
    this.label.elem.style.display = "none";
  }

  showLabel = (): void => {
    this.label.elem.style.display = "block";
  }

  showRunner = (): void => {
    this.button.elem.style.display = "block";
  }

  onMouseDown = (event: MouseEvent): void => {
    event.preventDefault();
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
  }

  onMouseMove = (event: MouseEvent): void => {
    this.observers.notifyObserversData({ event: event, runner: this });
  }

  onMouseUp = (event: MouseEvent): void => {
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mousemove", this.onMouseMove);
  }

  appendToNode = (entry: HTMLElement): void => {
    [this.button.elem, this.label.elem].map((elem) => {
      entry.appendChild(elem);
      elem.onmousedown = this.onMouseDown;
    })
  }
}

export default Runner;