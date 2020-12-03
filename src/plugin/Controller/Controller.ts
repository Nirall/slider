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
      this.view.renewRunners();
    });
  }

  appendToNode = (entry: JQuery): void => {
    this.view.appendToNode(entry.get(0));
    this.view.init();
  }

  updateConfig = (parameters: types.RawParameters): void => {
    const parametersSnapShot = this.view.parameters;
    Object.keys(parameters).map((key) => {
      if (key === 'step') {
        parametersSnapShot.step = this.checkStep(parameters.step);
      } else if (key === 'maxValue') {
        parametersSnapShot.maxValue = this.checkMaxValue(parameters.maxValue);
      } else if (key === 'minValue') {
        parametersSnapShot.minValue = this.checkMinValue(parameters.minValue);
      } else {
        parametersSnapShot[key] = parameters[key];
      }
    })

    this.view.parameters = Object.assign(this.view.parameters, parametersSnapShot);

    this.view.init();
  }

  getValues = (): types.CurrentValues => {
    return this.model.currentValues;
  }

  setValues = (currentMinValue: number, currentMaxValue: number): void => {
    if (currentMinValue || currentMinValue === 0) {
      this.model.setCurrentMinValue(currentMinValue);
    }

    if (currentMaxValue || currentMaxValue === 0) {
      this.model.setCurrentMaxValue(currentMaxValue);
    }
  }

  getConfig = (): types.Parameters => {
    return this.view.parameters;
  }

  addObserver = (fn: Function): void => {
    this.observers.addObserver(fn);
  }

  private checkStep = (step: string): number => {
    let stepChecked = Math.abs(ParsingDigits.parsing(step));

    if (stepChecked === null || stepChecked === 0 || stepChecked > (this.view.parameters.maxValue - this.view.parameters.minValue)/2) {
      return this.view.parameters.step;
    }

    if (stepChecked % 1 !== 0) {
      this.view.parameters.isFloat = true;
    } else {
      if (this.view.parameters.maxValue % 1 === 0 && this.view.parameters.minValue % 1 === 0) {
        this.view.parameters.isFloat = false;
      }
    }

    return stepChecked;
  }

  private checkMaxValue = (maxValue: string): number => {
    let maxValueChecked = ParsingDigits.parsing(maxValue);

    if (maxValueChecked === null || maxValueChecked <= this.view.parameters.minValue) {
      return this.view.parameters.maxValue;
    }

    if (maxValueChecked % 1 !== 0) {
      this.view.parameters.isFloat = true;
    } else {
      if (this.view.parameters.step % 1 === 0 && this.view.parameters.minValue % 1 === 0) {
        this.view.parameters.isFloat = false;
      }
    }

    return maxValueChecked;
  }

  private checkMinValue = (minValue: string): number => {
    let minValueChecked = ParsingDigits.parsing(minValue);

    if (minValueChecked === null || minValueChecked >= this.view.parameters.maxValue) {
      return this.view.parameters.minValue;
    }

    if (minValueChecked % 1 !== 0) {
      this.view.parameters.isFloat = true;
    } else {
      if (this.view.parameters.maxValue % 1 === 0 && this.view.parameters.step % 1 === 0) {
        this.view.parameters.isFloat = false;
      }
    }

    return minValueChecked;
  }
}

export default Controller;