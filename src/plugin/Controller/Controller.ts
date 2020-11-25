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

interface Parameters {
  minValue: number,
  maxValue: number,
  step: number,
  isRange: boolean,
  isVertical: boolean,
  showLabel: boolean,
  isFloat: boolean
}

const defaultParameters = {
  minValue: 0,
  maxValue: 1000,
  step: 1,
  isRange: false,
  isVertical: false,
  showLabel: false,
  isFloat: false
}

class Controller {
  view: View;

  model: Model;

  observers: MakeObservableObject;

  constructor(parameters = defaultParameters) {
    this.view = new View(parameters);
    this.model = new Model(parameters.minValue, parameters.maxValue);
    this.observers = new MakeObservableObject();

    this.view.observers.addObserver(() => {
      this.model.curMinValue = this.view.curMinValue;
      this.model.curMaxValue = this.view.curMaxValue;
      this.observers.notifyObservers();
    });

    this.model.observers.addObserver(() => {
      const curMinValue = this.model.curMinValue;
      const curMaxValue = this.model.curMaxValue;
      //this.view.butt1Move(this.view.offsetValueConv(curMinValue), curMinValue);
      //this.view.butt2Move(this.view.offsetValueConv(curMaxValue), curMaxValue);
      this.observers.notifyObservers();
    });    
  }

  append = (entry: JQuery): void => {
    this.view.append(entry.get(0));    
    this.view.init();
  }

  checkStep = (step: string): number => {
    let stepMod = Math.abs(ParsingDigits.parsing(step));

    if (stepMod === null || stepMod === 0 || stepMod > (this.view.parameters.maxValue - this.view.parameters.minValue)/2) {
      console.log('Wrong value of the step');
      return this.view.parameters.step;
    }

    if (stepMod % 1 !== 0) {
      this.view.parameters.isFloat = true;
    } else {
      if (this.view.parameters.maxValue % 1 === 0 && this.view.parameters.minValue % 1 === 0) {
        this.view.parameters.isFloat = false;
      }
    }

    return stepMod;
  }

  checkMaxValue = (maxValue: string): number => {
    let maxValueMod = ParsingDigits.parsing(maxValue);

    if (maxValueMod === null || maxValueMod <= this.view.parameters.minValue) {
      console.log('Wrong value of the maxValue');
      return this.view.parameters.maxValue;
    }

    if (maxValueMod % 1 !== 0) {
      this.view.parameters.isFloat = true;
    } else {
      if (this.view.parameters.step % 1 === 0 && this.view.parameters.minValue % 1 === 0) {
        this.view.parameters.isFloat = false;
      }
    }

    return maxValueMod;
  }

  checkMinValue = (minValue: string): number => {
    let minValueMod = ParsingDigits.parsing(minValue);

    if (minValueMod === null || minValueMod >= this.view.parameters.maxValue) {
      console.log('Wrong value of the minValue');
      return this.view.parameters.minValue;
    }

    if (minValueMod % 1 !== 0) {
      this.view.parameters.isFloat = true;
    } else {
      if (this.view.parameters.maxValue % 1 === 0 && this.view.parameters.step % 1 === 0) {
        this.view.parameters.isFloat = false;
      }
    }

    return minValueMod;
  }

  update = (args: any): void => {
    Object.keys(args).map((key) => {
      if (key === 'step') {
        args.step = this.checkStep(args.step);
      } else if (key === 'maxValue') {
        args.maxValue = this.checkMaxValue(args.maxValue);
      } else if (key === 'minValue') {
        args.minValue = this.checkMaxValue(args.minValue);
      }      
    })

    this.view.parameters = Object.assign(this.view.parameters, args);

    this.view.init();
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
    return this.view.parameters;
  }

  addObserver = (fn: Function): void => {
    this.observers.addObserver(fn);
  }
}

export default Controller;