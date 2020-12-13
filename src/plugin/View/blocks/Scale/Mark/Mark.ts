import createElem from '../../createElem/createElem';
import MakeObservableObject from '../../../../makeObservableObject/MakeObservableObject';

class Mark {
  elem: HTMLElement;
  isVertical: boolean;
  value: number;
  observers: MakeObservableObject;

  constructor(isVertical: boolean, observer: Function) {
    this.elem = createElem('slider__mark');
    this.isVertical = isVertical;
    this.observers = new MakeObservableObject();
    this.observers.addObserver(observer);
    this.elem.onclick = this.handleMarkClick;
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
      this.elem.style.marginTop = -this.getDimension()/2 + 'px';
      this.elem.style.marginLeft = '-45px';
    } else {
      this.elem.style.top = '50%';
      this.elem.style.left = offset + '%';
      this.elem.style.marginLeft = -this.getDimension()/2 + 'px';
      this.elem.style.marginTop = '15px';
    }
  }

  getDimension = (): number => {
    if (this.isVertical) {
      return this.elem.getBoundingClientRect().height;
    }

    return this.elem.getBoundingClientRect().width;
  }

  init = (isVertical: boolean): void => {
    this.isVertical = isVertical;

    if (this.isVertical) {
      this.elem.classList.add('slider__mark_position_vertical');
    } else {
      this.elem.classList.remove('slider__mark_position_vertical');
    }
  }

  private handleMarkClick = (): void => {
    this.observers.notifyObserversData(this.value);
  }
}

export default Mark;