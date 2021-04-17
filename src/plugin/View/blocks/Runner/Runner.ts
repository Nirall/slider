import * as types from '../../../types';
import Knob from '../Knob/Knob';
import Tooltip from '../Tooltip/Tooltip';
import ObservableObject from '../../../observableObject/ObservableObject';

class Runner {
  knob: Knob;

  tooltip: Tooltip;

  isVertical: boolean;

  observers: ObservableObject;

  constructor(isVertical: boolean, moveObserver: types.ObserverFunction) {
    this.isVertical = isVertical;
    this.knob = new Knob(isVertical);
    this.tooltip = new Tooltip(isVertical);
    this.observers = new ObservableObject();
    this.observers.addObserver(moveObserver);
  }

  getPosition = (): number => {
    return this.knob.getPosition();
  }

  setPosition = (offset: number, value: number): void => {
    this.tooltip.setPosition(offset + this.knob.getWidth() / 2, value);
    this.knob.setPosition(offset);
  }

  raise = (): void => {
    this.knob.elem.classList.add('slider__knob_raised');
    this.tooltip.elem.classList.add('slider__tooltip_raised');
  }

  putDown = (): void => {
    this.knob.elem.classList.remove('slider__knob_raised');
    this.tooltip.elem.classList.remove('slider__tooltip_raised');
  }

  update = (isVertical: boolean): void => {
    this.isVertical = isVertical;
    this.knob.update(this.isVertical);
    this.tooltip.update(this.isVertical);
  }

  getWidth = (): number => {
    return this.knob.getWidth();
  }

  hideRunner = (): void => {
    this.knob.elem.classList.add('slider__knob_hidden');
    this.tooltip.elem.classList.remove('slider__tooltip_visible');
  }

  hideLabel = (): void => {
    this.tooltip.elem.classList.remove('slider__tooltip_visible');
  }

  showLabel = (): void => {
    this.tooltip.elem.classList.add('slider__tooltip_visible');
  }

  showRunner = (): void => {
    this.knob.elem.classList.remove('slider__knob_hidden');
  }

  appendToNode = (entry: HTMLElement): void => {
    [this.knob.elem, this.tooltip.elem].forEach((elem) => {
      entry.appendChild(elem);
      elem.addEventListener('mousedown', this.handleRunnerMouseDown);
    });
  }

  private handleRunnerMouseDown = (event: MouseEvent): void => {
    event.preventDefault();
    document.addEventListener('mousemove', this.handleRunnerMouseMove);
    document.addEventListener('mouseup', this.handleRunnerMouseUp);
  }

  private handleRunnerMouseMove = (event: MouseEvent): void => {
    this.observers.notifyObservers('MovingRunner', { event, runner: this });
  }

  private handleRunnerMouseUp = (): void => {
    document.removeEventListener('mouseup', this.handleRunnerMouseUp);
    document.removeEventListener('mousemove', this.handleRunnerMouseMove);
  }
}

export default Runner;
