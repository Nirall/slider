import Mark from './Mark/Mark';
import createElem from '../createElem';
import * as types from '../../../types';
import ObservableObject from '../../../observableObject/ObservableObject';
import reductValue from '../../../helpers/reductValue';

class Scale {
  parameters: types.Parameters;

  marks: Array<Mark>;

  elem: HTMLElement;

  observers: ObservableObject;

  constructor(parameters: types.Parameters, observer: types.ObserverFunction) {
    this.parameters = parameters;
    this.marks = [];
    this.elem = createElem('slider__scale');
    this.observers = new ObservableObject();
    this.init(observer);
  }

  update = (options: types.Parameters): void => {
    this.parameters = options;
    this.renewMarks();
  }

  appendToNode = (entry: HTMLElement): void => {
    entry.appendChild(this.elem);
  }

  renewMarks = () : void => {
    this.removeMarks();
    this.marks.forEach((mark) => {
      this.elem.appendChild(mark.elem);
    });

    this.moveMarks();
  }

  moveMarks = (): void => {
    this.marks.forEach((mark, index) => {
      const {
        isVertical, minValue, maxValue, step
      } = this.parameters;
      mark.update(isVertical);
      if (index === 0) {
        mark.setPosition(0, minValue);
      } else if (index === this.marks.length - 1) {
        mark.setPosition(100, maxValue);
      } else {
        let roundValue = reductValue(((maxValue - minValue) * index)
          / (this.marks.length - 1), step) + minValue;

        roundValue = Number(roundValue.toFixed(2));
        if (roundValue === this.marks[index - 1].value) {
          this.removeMark(mark.elem);
        } else {
          const offset = (roundValue - minValue) / (maxValue - minValue);

          mark.setPosition(offset * 100, roundValue);
        }
      }
    });
  }

  private removeMarks = () : void => {
    const { elem } = this;
    elem.querySelectorAll('.slider__mark').forEach((child) => {
      elem.removeChild(child);
    });
  }

  private removeMark = (child: HTMLElement) : void => {
    this.elem.removeChild(child);
  }

  private init = (observer: types.ObserverFunction): void => {
    this.createMarks();
    this.observers.addObserver(observer);
  }

  private handleScaleClick = <T>(eventName: string, data: T | types.ScaleObserverData): void => {
    if (eventName === 'ClickOnMark') {
      this.observers.notifyObservers('ClickOnScale', data);
    }
  }

  private createMarks = (): void => {
    for (let i = 0; i < 6; i += 1) {
      const mark = new Mark(this.parameters.isVertical, this.handleScaleClick);
      this.marks.push(mark);
    }
  }
}

export default Scale;
