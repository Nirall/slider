import * as types from '../../../types';
import Mark from './Mark/Mark';
import MakeObservableObject from '../../../makeObservableObject/MakeObservableObject';

class Scale {
  parameters: types.Parameters;

  marks: Array<Mark>;

  observers: MakeObservableObject;

  constructor(parameters: types.Parameters, observer: types.FunctionCallbackData) {
    this.parameters = parameters;
    this.marks = [];
    this.observers = new MakeObservableObject();
    this.init(observer);
  }

  update = (options: types.Parameters): void => {
    this.parameters = options;
    this.moveMarks();
  }

  moveMarks = (): void => {
    this.marks.forEach((mark, index) => {
      mark.update(this.parameters.isVertical);
      if (index === 0) {
        mark.setPosition(0, this.parameters.minValue);
      } else if (index === this.marks.length - 1) {
        mark.setPosition(100, this.parameters.maxValue);
      } else {
        let roundValue = this.round(this.parameters.minValue
          + ((this.parameters.maxValue - this.parameters.minValue) * index)
          / (this.marks.length - 1));

        if (this.parameters.isFloat) {
          roundValue = parseFloat(roundValue.toFixed(2));
        }

        const offset = (roundValue - this.parameters.minValue)
          / (this.parameters.maxValue - this.parameters.minValue);
        mark.setPosition(offset * 100, roundValue);
      }
    });
  }

  private init = (observer: types.FunctionCallbackData): void => {
    this.moveMarks();
    this.createMarks();
    this.observers.addObserver(observer);
  }

  private handleScaleClick = (value: number): void => {
    this.observers.notifyObservers(value);
  }

  private createMarks = (): void => {
    for (let i = 0; i < 5; i += 1) {
      const mark = new Mark(this.parameters.isVertical, this.handleScaleClick);
      this.marks.push(mark);
    }
  }

  private round = (value: number): number => {
    const whole = Math.trunc(value / this.parameters.step);

    const reminder = +(value - whole * this.parameters.step).toFixed(2);
    if (value < 0) {
      return Math.abs(reminder) < this.parameters.step / 2
        ? whole * this.parameters.step
        : (whole - 1) * this.parameters.step;
    }

    return reminder < this.parameters.step / 2
      ? whole * this.parameters.step
      : (whole + 1) * this.parameters.step;
  }
}

export default Scale;
