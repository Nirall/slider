import { View } from "./view";
import { Model } from "./model";
import {MakeObservableObject} from "./MOO";

interface configType {
    [index: string]: number | boolean;
}

class Controller {
    view: View;
    model: Model;
    observers: MakeObservableObject;

    constructor(minValue: number = 0, maxValue: number = 1000, step: number = 1,
        range: boolean = false, vertical: boolean = false, showLabel: boolean = false, float: boolean = false) {
        this.view = new View(minValue, maxValue, step, range, vertical, showLabel, float);
        this.model = new Model(minValue, maxValue);
        this.observers = new MakeObservableObject();

        this.view.observers.addObserver(() => {
            this.model.curMinValue = this.view.curMinValue;
            this.model.curMaxValue = this.view.curMaxValue;
            this.observers.notifyObservers();
        });
        this.model.observers.addObserver(() => {
            let curMinValue = this.model.curMinValue;
            let curMaxValue = this.model.curMaxValue;
            this.view.butt1Move(this.view.offsetValueConv(curMinValue), curMinValue);
            this.view.butt2Move(this.view.offsetValueConv(curMaxValue), curMaxValue);
            this.observers.notifyObservers();
        });

        this.update = this.update.bind(this);
        this.getValues = this.getValues.bind(this);
        this.getConfig = this.getConfig.bind(this);
        this.addObserver = this.addObserver.bind(this);
    }
    append(entry: JQuery) {
        this.view.append(entry.get(0));
        this.view.init();
    }
    update(args: configType) {
        Object.keys(args).map((item)  => {
            if (this.view[item] !== undefined) {
                this.view[item] = args[item];
            }
        });
        this.view.init();
        this.view.butt1Move(this.view.butt1OffsetCheck(this.view.offsetValueConv(this.model.curMinValue))[0], this.model.curMinValue);
        this.view.butt2Move(this.view.butt2OffsetCheck(this.view.offsetValueConv(this.model.curMaxValue))[0], this.model.curMaxValue);
    }
    getValues() {
        return [this.model.curMinValue, this.model.curMaxValue];
    }
    setValues(curMinValue: number, curMaxValue: number) {
        if (curMinValue) {
            this.model.setCurMinValue(curMinValue);
        }
        if (curMaxValue) {
            this.model.setCurMaxValue(curMaxValue);
        }
    }
    getConfig() {
        return {minValue: this.view.minValue, maxValue: this.view.maxValue, step: this.view.step,
            range: this.view.range, vertical: this.view.vertical, showLabel: this.view.showLabel, float: this.view.float}
    }
    addObserver(fn: Function) {
        this.observers.addObserver(fn);
    }
}
export {Controller};