import Mark from "../mark/Mark";
import MakeObservableObject from '../../../makeObservableObject/MakeObservableObject';

class Graduation {
  params: {
    minValue: number;
    maxValue: number;
    step: number;
    isRange: boolean;
    isVertical: boolean;
    showLabel: boolean;
    isFloat: boolean;
  };

  marks: Array<Mark>;

  observers: MakeObservableObject;

  constructor(options: any) {
    this.marks = [];
    this.params = options;
    this.createMarks();
    this.init(options);
    this.observers = new MakeObservableObject();
  }

  init = (options: any): void => {
    this.params = options;
    this.moveMarks();
  }

  createMarks = (): void => {
    for (let i = 0; i < 5; i++) {
      const mark = new Mark(this.params.isVertical);
      this.marks.push(mark);
      mark.observers.addObserver(() => this.markObserver(mark));
    }
  }

  markObserver = (mark: Mark): void => {
    this.observers.notifyObserversData(mark.value);
  }

  moveMarks = (): void => {
    this.marks.map((mark, index) => {
      mark.init(this.params.isVertical);
      if (index === this.marks.length - 1) {
        mark.setPosition(100, this.params.maxValue);
      } else {
        let roundValue = this.round((this.params.maxValue - this.params.minValue)/(this.marks.length - 1)*index)
        const value = this.params.minValue + roundValue;
        const offset = roundValue/(this.params.maxValue - this.params.minValue);
        mark.setPosition(offset*100, value);
      }
    })
  }

  round = (val: number): number => {
    const whole = Math.trunc(val/this.params.step);

    const reminder = +(val - whole*this.params.step).toFixed(2);
    if (val < 0) {
      return Math.abs(reminder) < this.params.step/2 ? whole*this.params.step : (whole - 1)*this.params.step;
    }

    return reminder < this.params.step/2 ? whole*this.params.step : (whole + 1)*this.params.step;
  }
}

export default Graduation;