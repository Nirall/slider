import * as types from '../types';
import { View } from '../View/View';
import Model from '../Model/Model';
import MakeObservableObject from '../makeObservableObject/MakeObservableObject';
import ParsingDigits from "./blocks/parsingDigits/ParsingDigits";

class Controller {
  view: View;

  model: Model;

  observers: MakeObservableObject;

  constructor(parameters = types.defaultParameters) {
    this.view = new View(parameters);
    this.model = new Model({ currentMinValue: parameters.minValue, currentMaxValue: parameters.maxValue });
    this.observers = new MakeObservableObject();

    this.view.observers.addObserver(() => {
      this.model.currentValues = this.view.currentValues;
      this.observers.notifyObservers();
    });

    this.model.observers.addObserver(() => {
      this.view.currentValues = this.model.currentValues;
      this.view.renew();
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

  getValues = (): types.CurrentValues => {
    return this.model.currentValues;
  }

  setValues = (curMinValue: number, curMaxValue: number): void => {
    if (curMinValue) {
      this.model.setCurrentMinValue(curMinValue);
    }

    if (curMaxValue) {
      this.model.setCurrentMaxValue(curMaxValue);
    }
  }

  getConfig = (): types.Parameters => {
    return this.view.parameters;
  }

  addObserver = (fn: Function): void => {
    this.observers.addObserver(fn);
  }
}

export default Controller;