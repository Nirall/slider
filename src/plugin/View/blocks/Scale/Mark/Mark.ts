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
    this.elem.innerHTML = value + '';
    this.value = value;

    if (this.isVertical) {
      this.elem.style.left = '50%';
      this.elem.style.top = offset + '%';
      this.elem.style.marginTop = '0';
      this.elem.style.transform = `translate(-45px, ${-this.getDimension() / 2 + 'px'})`;
    } else {
      this.elem.style.top = '50%';
      this.elem.style.left = offset + '%';
      this.elem.style.transform = `translateX(${-this.getDimension() / 2 + 'px'})`;
      this.elem.style.marginTop = '15px';
    }
  }

  getDimension = (): number => {
    if (this.isVertical) {
      return this.elem.getBoundingClientRect().height;
    }

    return this.elem.getBoundingClientRect().width;
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
