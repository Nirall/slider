import { View } from '../View/View';
import Model from '../Model/Model';
import MakeObservableObject from '../makeObservableObject/MakeObservableObject';
import ParsingDigits from "./blocks/parsingDigits/ParsingDigits";

interface configType {
  //[index: string]:
    [index: string]: any,
    /*
    step: string,
    minValue: number,
    maxValue: number,
    step: string,
    isRange: boolean,
    isVertical: boolean,
    showLabel: boolean,
    isFloat: boolean,
    */
}

class Controller {
  view: View;

  model: Model;

  observers: MakeObservableObject;

  constructor(minValue = 0, maxValue = 1000, step = 1, isRange = false,
    isVertical = false, showLabel = false, isFloat = false) {
    this.view = new View(minValue, maxValue, step, isRange, isVertical, showLabel, isFloat);
    this.model = new Model(minValue, maxValue);
    this.observers = new MakeObservableObject();

    this.view.observers.addObserver(() => {
      this.model.curMinValue = this.view.curMinValue;
      this.model.curMaxValue = this.view.curMaxValue;
      this.observers.notifyObservers();
    });

    this.model.observers.addObserver(() => {
      const curMinValue = this.model.curMinValue;
      const curMaxValue = this.model.curMaxValue;
      this.view.butt1Move(this.view.offsetValueConv(curMinValue), curMinValue);
      this.view.butt2Move(this.view.offsetValueConv(curMaxValue), curMaxValue);
      this.observers.notifyObservers();
    });
  }

  append = (entry: JQuery): void => {
    this.view.append(entry.get(0));
    this.view.init();
  }

  checkStep = (step: string): number => {
    let stepMod = Math.abs(ParsingDigits.parsing(step));

    if (stepMod === null || stepMod === 0 || stepMod > (this.view.maxValue - this.view.minValue)/2) {
      console.log('Wrong value of the step');
      return this.view.step;
    }

    if (stepMod % 1 !== 0) {
      this.view.isFloat = true;
    } else {
      if (this.view.maxValue % 1 === 0 && this.view.minValue % 1 === 0) {
        this.view.isFloat = false;
      }
    }

    return stepMod;
  }

  checkMaxValue = (maxValue: string): number => {
    let maxValueMod = ParsingDigits.parsing(maxValue);

    if (maxValueMod === null || maxValueMod <= this.view.minValue) {
      console.log('Wrong value of the maxValue');
      return this.view.maxValue;
    }

    if (maxValueMod % 1 !== 0) {
      this.view.isFloat = true;
    } else {
      if (this.view.step % 1 === 0 && this.view.minValue % 1 === 0) {
        this.view.isFloat = false;
      }
    }

    return maxValueMod;
  }

  checkMinValue = (minValue: string): number => {
    let minValueMod = ParsingDigits.parsing(minValue);

    if (minValueMod === null || minValueMod >= this.view.maxValue) {
      console.log('Wrong value of the minValue');
      return this.view.minValue;
    }

    if (minValueMod % 1 !== 0) {
      this.view.isFloat = true;
    } else {
      if (this.view.maxValue % 1 === 0 && this.view.step % 1 === 0) {
        this.view.isFloat = false;
      }
    }

    return minValueMod;
  }

  update = (args: configType): void => {
    Object.keys(args).map((item) => {
      if (this.view[item] !== undefined) {
        if (item === 'step') {
          this.view.step = this.checkStep(args[item]);
        } else if (item === 'maxValue') {
          this.view.maxValue = this.checkMaxValue(args[item]);
        } else if (item === 'minValue') {
          this.view.minValue = this.checkMinValue(args[item]);
        } else {
          this.view[item] = args[item];
        }
      }
    });

    this.view.init();
    //this.view.butt1Move(this.view.butt1OffsetCheck(this.view.offsetValueConv(this.model.curMinValue))[0], this.model.curMinValue);
    //this.view.butt2Move(this.view.butt2OffsetCheck(this.view.offsetValueConv(this.model.curMaxValue))[0], this.model.curMaxValue);
  }

  getValues = (): Array<number> => {
    return [this.model.curMinValue, this.model.curMaxValue];
  }

  setValues = (curMinValue: number, curMaxValue: number): void => {
    if (curMinValue) {
      this.model.setCurMinValue(curMinValue);
    }

    if (curMaxValue) {
      this.model.setCurMaxValue(curMaxValue);
    }
  }

  getConfig = (): configType => {
    return {minValue: this.view.minValue, maxValue: this.view.maxValue, step: this.view.step,
      isRange: this.view.isRange, isVertical: this.view.isVertical, showLabel: this.view.showLabel, isFloat: this.view.isFloat}
  }

  addObserver = (fn: Function): void => {
    this.observers.addObserver(fn);
  }
}

export default Controller;