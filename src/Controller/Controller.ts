import { View } from '../View/View';
import Model from '../Model/Model';
import MakeObservableObject from '../View/assets/MakeObservableObject';

interface configType {
  [index: string]: number | boolean;
}

class Controller {
  view: View;
  model: Model;
  observers: MakeObservableObject;

  constructor(minValue = 0, maxValue = 1000, step = 1, isRange = false, isVertical = false, showLabel = false, isFloat = false) {
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

  update = (args: configType): void => {
    Object.keys(args).map((item)  => {
      if (this.view[item] !== undefined) {
        this.view[item] = args[item];
      }
    });

    this.view.init();
    this.view.butt1Move(this.view.butt1OffsetCheck(this.view.offsetValueConv(this.model.curMinValue))[0], this.model.curMinValue);
    this.view.butt2Move(this.view.butt2OffsetCheck(this.view.offsetValueConv(this.model.curMaxValue))[0], this.model.curMaxValue);
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