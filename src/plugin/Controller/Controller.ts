import * as types from '../types';
import View from '../View/View';
import Model from '../Model/Model';
import MakeObservableObject from '../makeObservableObject/MakeObservableObject';
import ParsingDigits from './blocks/parsingDigits/ParsingDigits';

const isOthersValuesFloat = (item: Controller, parameter: string): boolean => {
  switch (parameter) {
    case 'step':
      return (item.view.parameters.maxValue % 1 !== 0 || item.view.parameters.minValue % 1 !== 0);
    case 'maxValue':
      return (item.view.parameters.step % 1 !== 0 || item.view.parameters.minValue % 1 !== 0);
    case 'minValue':
      return (item.view.parameters.step % 1 !== 0 || item.view.parameters.maxValue % 1 !== 0);
    default:
      return false;
  }
};

class Controller {
  view: View;

  model: Model;

  observers: MakeObservableObject;

  constructor(parameters = types.defaultParameters) {
    this.view = new View(parameters);
    this.model = new Model({
      currentMinValue: parameters.minValue,
      currentMaxValue: parameters.maxValue
    });
    this.observers = new MakeObservableObject();
    this.addViewObserver();
    this.addModelObserver();
  }

  appendToNode = (entry: JQuery): void => {
    this.view.appendToNode(entry.get(0));
    this.view.update();
  }

  updateConfig = (parameters: types.RawParameters): void => {
    const parametersSnapshot = parameters;
    Object.keys(parameters).forEach((key) => {
      if (key === 'step') {
        parametersSnapshot.step = this.checkStep(parameters.step as string);
      } else if (key === 'maxValue') {
        parametersSnapshot.maxValue = this.checkMaxValue(parameters.maxValue as string);
      } else if (key === 'minValue') {
        parametersSnapshot.minValue = this.checkMinValue(parameters.minValue as string);
      }
    });

    this.view.parameters = Object.assign(this.view.parameters, parametersSnapshot);
    this.view.update();
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

  addObserver = (fn: types.FunctionCallbackData): void => {
    this.observers.addObserver(fn);
  }

  private checkStep = (step: string): number => {
    const stepChecked = Math.abs(ParsingDigits.parsing(step));
    const isStepNumber = stepChecked !== null && stepChecked !== 0;
    const isStepMoreThanHalf = stepChecked
      > (this.view.parameters.maxValue - this.view.parameters.minValue) / 2;

    if (!isStepNumber || isStepMoreThanHalf) {
      return this.view.parameters.step;
    }

    if (stepChecked % 1 !== 0) {
      this.view.parameters.isFloat = true;
    } else if (!isOthersValuesFloat(this, 'step')) {
      this.view.parameters.isFloat = false;
    }

    return stepChecked;
  }

  private checkMaxValue = (maxValue: string): number => {
    const maxValueChecked = ParsingDigits.parsing(maxValue);

    if (maxValueChecked === null || maxValueChecked <= this.view.parameters.minValue) {
      return this.view.parameters.maxValue;
    }

    if (maxValueChecked % 1 !== 0) {
      this.view.parameters.isFloat = true;
    } else if (!isOthersValuesFloat(this, 'maxValue')) {
      this.view.parameters.isFloat = false;
    }

    return maxValueChecked;
  }

  private checkMinValue = (minValue: string): number => {
    const minValueChecked = ParsingDigits.parsing(minValue);

    if (minValueChecked === null || minValueChecked >= this.view.parameters.maxValue) {
      return this.view.parameters.minValue;
    }

    if (minValueChecked % 1 !== 0) {
      this.view.parameters.isFloat = true;
    } else if (!isOthersValuesFloat(this, 'minValue')) {
      this.view.parameters.isFloat = false;
    }

    return minValueChecked;
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
      this.view.update();
    });
  }
}

export default Controller;
