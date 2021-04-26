import * as types from '../../../../types';
import createElem from '../../createElem';
import ObservableObject from '../../../../observableObject/ObservableObject';

class Mark {
  elem: HTMLElement;

  isVertical: boolean;

  value: number | undefined;

  observers: ObservableObject;

  constructor(isVertical: boolean, observer: types.ObserverFunction) {
    this.elem = createElem('slider__mark');
    this.isVertical = isVertical;
    this.observers = new ObservableObject();
    this.init(observer);
  }

  getPosition = (): number => {
    if (this.isVertical) {
      return this.elem.getBoundingClientRect().top;
    }

    return this.elem.getBoundingClientRect().left;
  }

  setPosition = (offset: number, value: number): void => {
    this.elem.innerHTML = String(value);
    this.value = value;
    const { style } = this.elem;

    if (this.isVertical) {
      style.left = '50%';
      style.top = offset + '%';
      style.marginTop = '0';
      style.transform = `translate(-45px, ${-this.getDimension() / 2}px)`;
    } else {
      style.top = '50%';
      style.left = offset + '%';
      style.transform = `translateX(${-this.getDimension() / 2}px)`;
      style.marginTop = '15px';
    }
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
  }

  private init = (observer: types.ObserverFunction): void => {
    this.elem.addEventListener('click', this.handleMarkClick);
    this.observers.addObserver(observer);
  }

  private handleMarkClick = (): void => {
    this.observers.notifyObservers('ClickOnMark', { value: this.value });
  }
}

export default Mark;
