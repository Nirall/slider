import * as types from '../../../types';
import Knob from '../Knob/Knob';
import Tooltip from '../Tooltip/Tooltip';
import MakeObservableObject from '../../../makeObservableObject/MakeObservableObject';

class Runner {
  knob: Knob;

  tooltip: Tooltip;

  isVertical: boolean;

  observers: MakeObservableObject;

  constructor(isVertical: boolean, moveObserver: types.FunctionCallbackData) {
    this.isVertical = isVertical;
    this.knob = new Knob(isVertical);
    this.tooltip = new Tooltip(isVertical);
    this.observers = new MakeObservableObject();
    this.observers.addObserver(moveObserver);
  }

  getPosition = (): number => {
    return this.knob.getPosition();
  }

  setPosition = (offset: number, value: number): void => {
    this.tooltip.setPosition(offset + this.knob.getWidth() / 2, value);
    this.knob.setPosition(offset);
  }

  init = (isVertical: boolean): void => {
    this.knob.init(isVertical);
    this.tooltip.init(isVertical);
  }

  getWidth = (): number => {
    return this.knob.getWidth();
  }

  hideRunner = (): void => {
    this.knob.elem.style.display = 'none';
    this.tooltip.elem.style.display = 'none';
  }

  hideLabel = (): void => {
    this.tooltip.elem.style.display = 'none';
  }

  showLabel = (): void => {
    this.tooltip.elem.style.display = 'block';
  }

  showRunner = (): void => {
    this.knob.elem.style.display = 'block';
  }

  appendToNode = (entry: HTMLElement): void => {
    [this.knob.elem, this.tooltip.elem].forEach((elem) => {
      entry.appendChild(elem);
      elem.onmousedown = this.handleRunnerMouseDown; // eslint-disable-line no-param-reassign
    });
  }

  private handleRunnerMouseDown = (event: MouseEvent): void => {
    event.preventDefault();
    document.addEventListener('mousemove', this.handleRunnerMouseMove);
    document.addEventListener('mouseup', this.handleRunnerMouseUp);
  }

  private handleRunnerMouseMove = (event: MouseEvent): void => {
    this.observers.notifyObserversData({ event: event, runner: this });
  }

  private handleRunnerMouseUp = (): void => {
    document.removeEventListener('mouseup', this.handleRunnerMouseUp);
    document.removeEventListener('mousemove', this.handleRunnerMouseMove);
  }
}

export default Runner;
