import { View } from "./view";
import { Model } from "./model";

interface configType {
    [index: string]: number | boolean;
}

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
            let curMinValue = this.model.curMinValue;
            let curMaxValue = this.model.curMaxValue;
            this.view.butt1Move(this.view.offsetValueConv(curMinValue), curMinValue);
            this.view.butt2Move(this.view.offsetValueConv(curMaxValue), curMaxValue);
        });
        this.update = this.update.bind(this);
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
        this.view.butt1Move(this.view.offsetValueConv(this.model.curMinValue), this.model.curMinValue);
        this.view.butt2Move(this.view.offsetValueConv(this.model.curMaxValue), this.model.curMaxValue);
    }
}
export {Controller};