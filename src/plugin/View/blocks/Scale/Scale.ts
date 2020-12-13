import * as types from '../../../types';
import Mark from './Mark/Mark';
import MakeObservableObject from '../../../makeObservableObject/MakeObservableObject';

class Scale {
  parameters: types.Parameters;

  marks: Array<Mark>;

  observers: MakeObservableObject;

  constructor(parameters: types.Parameters, observer: Function) {
    this.marks = [];
    this.parameters = parameters;
    this.createMarks();
    this.init(parameters);
    this.observers = new MakeObservableObject();
    this.observers.addObserver(observer);
  }

  init = (options: any): void => {
    this.parameters = options;
    this.moveMarks();
  }

  moveMarks = (): void => {
    this.marks.map((mark, index) => {
      mark.init(this.parameters.isVertical);
      if (index === 0) {
        mark.setPosition(0, this.parameters.minValue);
      } else if (index === this.marks.length - 1) {
        mark.setPosition(100, this.parameters.maxValue);
      } else {
        let roundValue = this.round(this.parameters.minValue + (this.parameters.maxValue - this.parameters.minValue)/(this.marks.length - 1)*index);

        if (this.parameters.isFloat) {
          roundValue = parseFloat(roundValue.toFixed(2));
        }

        const offset = (roundValue - this.parameters.minValue)/(this.parameters.maxValue - this.parameters.minValue);
        mark.setPosition(offset*100, roundValue);
      }
    })
  }

  private handleScaleClick = (value: number): void => {
    this.observers.notifyObserversData(value);
  }

  private createMarks = (): void => {
    for (let i = 0; i < 5; i++) {
      const mark = new Mark(this.parameters.isVertical, this.handleScaleClick);
      this.marks.push(mark);
    }
  }

  private round = (value: number): number => {
    const whole = Math.trunc(value/this.parameters.step);

    const reminder = +(value - whole*this.parameters.step).toFixed(2);
    if (value < 0) {
      return Math.abs(reminder) < this.parameters.step/2 ? whole*this.parameters.step : (whole - 1)*this.parameters.step;
    }

    return reminder < this.parameters.step/2 ? whole*this.parameters.step : (whole + 1)*this.parameters.step;
  }
}

export default Scale;
