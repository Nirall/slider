import Mark from "../mark/Mark";
import MakeObservableObject from '../../../makeObservableObject/MakeObservableObject';

class Graduation {
  parameters: {
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
    this.parameters = options;
    this.createMarks();
    this.init(options);
    this.observers = new MakeObservableObject();
  }

  init = (options: any): void => {
    this.parameters = options;
    this.moveMarks();
  }

  createMarks = (): void => {
    for (let i = 0; i < 5; i++) {
      const mark = new Mark(this.parameters.isVertical);
      this.marks.push(mark);
      mark.observers.addObserver(() => this.markObserver(mark));
    }
  }

  markObserver = (mark: Mark): void => {
    this.observers.notifyObserversData(mark.value);
  }

  moveMarks = (): void => {
    this.marks.map((mark, index) => {
      mark.init(this.parameters.isVertical);
      if (index === this.marks.length - 1) {
        mark.setPosition(100, this.parameters.maxValue);
      } else {
        const roundValue = this.round((this.parameters.maxValue - this.parameters.minValue)/(this.marks.length - 1)*index);
        let value = this.parameters.minValue + roundValue;

        if (this.parameters.isFloat) {
          value = parseFloat(value.toFixed(2));
        }
        
        const offset = roundValue/(this.parameters.maxValue - this.parameters.minValue);
        mark.setPosition(offset*100, value);
      }
    })
  }

  round = (val: number): number => {
    const whole = Math.trunc(val/this.parameters.step);

    const reminder = +(val - whole*this.parameters.step).toFixed(2);
    if (val < 0) {
      return Math.abs(reminder) < this.parameters.step/2 ? whole*this.parameters.step : (whole - 1)*this.parameters.step;
    }

    return reminder < this.parameters.step/2 ? whole*this.parameters.step : (whole + 1)*this.parameters.step;
  }
}

export default Graduation;