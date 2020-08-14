import MakeObservableObject from "./assets/MakeObservableObject";

class Model {
  curMinValue: number;
  curMaxValue: number;
  observers: MakeObservableObject;

  constructor(curMinValue = 0, curMaxValue = 1000) {
    this.curMinValue = curMinValue;
    this.curMaxValue = curMaxValue;
    this.observers = new MakeObservableObject();
  }
  
  setCurMinValue(data: number): void {
    if (this.curMinValue != data) {
      this.curMinValue = data;
      this.observers.notifyObservers();
    }
  }

  setCurMaxValue(data: number): void {
    if (this.curMaxValue != data) {
      this.curMaxValue = data;
      this.observers.notifyObservers();
    }
  }
}

export default Model;