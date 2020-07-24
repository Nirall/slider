import {MakeObservableObject} from "./MOO";

class Model {
    curMinValue: number;
    curMaxValue: number;
    observers: MakeObservableObject;

    constructor(minValue: number = 0, maxValue: number = 1000) {
        this.curMinValue = minValue;
        this.curMaxValue = maxValue;
        this.observers = new MakeObservableObject();
    }
    
    setCurMinValue(data: number) {
        this.curMinValue = data;
        this.observers.notifyObservers();
    }
    setCurMaxValue(data: number) {
        this.curMaxValue = data;
        this.observers.notifyObservers();
    }
}

export {Model};