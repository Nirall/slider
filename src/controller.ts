import { View } from "./view";
import { Model } from "./model";

class Controller {
    view: View;
    model: Model;

    constructor(minValue: number = 0, maxValue: number = 1000, step: number = 1,
        range: boolean = false, vertical: boolean = false, showLabel: boolean = false) {
        this.view = new View(minValue, maxValue, step, range, vertical, showLabel);
        this.model = new Model(minValue, maxValue);

        this.view.observers.addObserver(() => {
            this.model.curMinValue = this.view.curMinValue;
            this.model.curMaxValue = this.view.curMaxValue;
        });
        this.model.observers.addObserver(() => {
            this.view.interMarkHandler(this.model.curMinValue);
            this.view.interMarkHandler(this.model.curMaxValue);
        });
    }
    append(entry: JQuery) {
        this.view.append(entry.get(0));
        this.view.init()
    }
}

export {Controller};