import * as types from '../../../types';
import createElem from '../createElem';
import MakeObservableObject from '../../../makeObservableObject/MakeObservableObject';

class Bar {
  elem: HTMLElement;

  isVertical: boolean;

  observers: MakeObservableObject;

  constructor(isVertical: boolean, observer: types.ObserverFunction) {
    this.elem = createElem('slider__bar');
    this.isVertical = isVertical;
    this.observers = new MakeObservableObject();
    this.init(observer);
  }

  getPosition = (): number => {
    if (this.isVertical) {
      return this.elem.getBoundingClientRect().top;
    }

    return this.elem.getBoundingClientRect().left;
  }

  getDimension = (): number => {
    if (this.isVertical) {
      return this.elem.getBoundingClientRect().height;
    }

    return this.elem.getBoundingClientRect().width;
  }

  update = (isVertical: boolean): void => {
    this.isVertical = isVertical;

    if (this.isVertical) {
      this.elem.classList.add('slider__bar_position_vertical');
    } else {
      this.elem.classList.remove('slider__bar_position_vertical');
    }
  }

  private init = (observer: types.ObserverFunction): void => {
    this.elem.addEventListener('click', this.handleBarClick);
    this.observers.addObserver(observer);
  }

  private handleBarClick = (event: MouseEvent): void => {
    this.observers.notifyObservers('ClickOnBar', { event });
  }
}

export default Bar;
