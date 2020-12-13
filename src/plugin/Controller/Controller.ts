import * as types from '../types';
import View from '../View/View';
import Model from '../Model/Model';
import MakeObservableObject from '../makeObservableObject/MakeObservableObject';
import ParsingDigits from './blocks/parsingDigits/ParsingDigits';

class Controller {
  view: View;

  model: Model;

  observers: MakeObservableObject;

  constructor(parameters = types.defaultParameters) {
    this.view = new View(parameters);
    this.model = new Model({ currentMinValue: parameters.minValue, currentMaxValue: parameters.maxValue });
    this.observers = new MakeObservableObject();
    this.addViewObserver();
    this.addModelObserver();
  }

  appendToNode = (entry: JQuery): void => {
    this.view.appendToNode(entry.get(0));
    this.view.init();
  }

  updateConfig = (parameters: types.RawParameters): void => {
    Object.keys(parameters).forEach((key) => {
      if (key === 'step') {
        parameters.step = this.checkStep(parameters.step as string);
      } else if (key === 'maxValue') {
        parameters.maxValue = this.checkMaxValue(parameters.maxValue as string);
      } else if (key === 'minValue') {
        parameters.minValue = this.checkMinValue(parameters.minValue as string);
      }
    });

    this.view.parameters = Object.assign(this.view.parameters, parameters);
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
    const stepChecked = Math.abs(ParsingDigits.parsing(step));

    if (this.isStepValueWrong(stepChecked)) {
      return this.view.parameters.step;
    }

    if (stepChecked % 1 !== 0) {
      this.view.parameters.isFloat = true;
    } else if (!this.isOthersValuesFloat('step')) {
      this.view.parameters.isFloat = false;
    }

    return stepChecked;
  }

  private isStepValueWrong = (stepChecked: number): boolean => {
    const isStepMoreThanHalf = stepChecked
      > (this.view.parameters.maxValue - this.view.parameters.minValue) / 2;
    return (stepChecked === null || stepChecked === 0 || isStepMoreThanHalf);
  }

  private isOthersValuesFloat = (parameter: string): boolean => {
    switch (parameter) {
      case 'step':
        return (this.view.parameters.maxValue % 1 !== 0 || this.view.parameters.minValue % 1 !== 0);
      case 'maxValue':
        return (this.view.parameters.step % 1 !== 0 || this.view.parameters.minValue % 1 !== 0);
      case 'minValue':
        return (this.view.parameters.step % 1 !== 0 || this.view.parameters.maxValue % 1 !== 0);
      default:
        return false;
    }
  }

  private checkMaxValue = (maxValue: string): number => {
    const maxValueChecked = ParsingDigits.parsing(maxValue);

    if (this.isMaxValueWrong(maxValueChecked)) {
      return this.view.parameters.maxValue;
    }

    if (maxValueChecked % 1 !== 0) {
      this.view.parameters.isFloat = true;
    } else if (!this.isOthersValuesFloat('maxValue')) {
      this.view.parameters.isFloat = false;
    }

    return maxValueChecked;
  }

  private isMaxValueWrong = (maxValueChecked: number): boolean => {
    return (maxValueChecked === null || maxValueChecked <= this.view.parameters.minValue);
  }

  private checkMinValue = (minValue: string): number => {
    const minValueChecked = ParsingDigits.parsing(minValue);

    if (this.isMinValueWrong(minValueChecked)) {
      return this.view.parameters.minValue;
    }

    if (minValueChecked % 1 !== 0) {
      this.view.parameters.isFloat = true;
    } else if (!this.isOthersValuesFloat('minValue')) {
      this.view.parameters.isFloat = false;
    }

    return minValueChecked;
  }

  private isMinValueWrong = (minValueChecked: number): boolean => {
    return (minValueChecked === null || minValueChecked >= this.view.parameters.maxValue);
  }

  private addViewObserver = (): void => {
    this.view.observers.addObserver(() => {
      this.model.currentValues = this.view.currentValues;
      this.observers.notifyObservers();
    });
  }

  private addModelObserver = (): void => {
    this.model.observers.addObserver(() => {
      this.view.currentValues = this.model.currentValues;
      this.view.init();
    });
  }
}

export default Controller;
