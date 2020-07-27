import {MakeObservableObject} from "./MOO";

class Model {
    curMinValue: number;
    curMaxValue: number;
    observers: MakeObservableObject;

    constructor(curMinValue: number = 0, curMaxValue: number = 1000) {
        this.curMinValue = curMinValue;
        this.curMaxValue = curMaxValue;
        this.observers = new MakeObservableObject();
    }
    
    setCurMinValue(data: number) {
        if (this.curMinValue != data) {
            this.curMinValue = data;
            this.observers.notifyObservers();
        }
    }
    setCurMaxValue(data: number) {
        if (this.curMaxValue != data) {
            this.curMaxValue = data;
            this.observers.notifyObservers();
        }
    }
}

export {Model};