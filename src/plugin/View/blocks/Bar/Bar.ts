import * as types from '../../../types';
import createElem from '../createElem';
import ObservableObject from '../../../observableObject/ObservableObject';

class Bar {
  elem: HTMLElement;

  isVertical: boolean;

  observers: ObservableObject;

  constructor(isVertical: boolean, observer: types.ObserverFunction) {
    this.elem = createElem('slider__bar');
    this.isVertical = isVertical;
    this.observers = new ObservableObject();
    this.init(observer);
  }

  getPosition = (): number => {
    const { elem, isVertical } = this;
    if (isVertical) {
      return elem.getBoundingClientRect().top;
    }

    return elem.getBoundingClientRect().left;
  }

  getDimension = (): number => {
    const { elem, isVertical } = this;
    if (isVertical) {
      return elem.getBoundingClientRect().height;
    }

    return elem.getBoundingClientRect().width;
  }

  update = (isVertical: boolean): void => {
    this.isVertical = isVertical;
    const { elem } = this;
    if (isVertical) {
      elem.classList.add('slider__bar_position_vertical');
    } else {
      elem.classList.remove('slider__bar_position_vertical');
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
