import Controller from "../src/controller";

describe("Class Controller", () => {
    it("constructor() should create .view prop with the certain values", () => {
        const item = new Controller(100, 800, 10, true, true, true, true);
        const props = [item.view.minValue, item.view.maxValue, item.view.step,
            item.view.isRange, item.view.isVertical, item.view.showLabel, item.view.isFloat]
        expect(props).toEqual([100, 800, 10, true, true, true, true]);
    });
    it("constructor() should create .view prop with the certain default values", () => {
        const item = new Controller();
        const props = [item.view.minValue, item.view.maxValue, item.view.step,
            item.view.isRange, item.view.isVertical, item.view.showLabel, item.view.isFloat]
        expect(props).toEqual([0, 1000, 1, false, false, false, false]);
    });
    it("constructor() should create .model prop with the certain values", () => {
        const item = new Controller(100, 800, 10, true, true, true);
        const props = [item.model.curMinValue, item.model.curMaxValue];
        expect(props).toEqual([100, 800]);
    });
    it("constructor() should create .model prop with the certain default values", () => {
        const item = new Controller();
        const props = [item.model.curMinValue, item.model.curMaxValue];
        expect(props).toEqual([0, 1000]);
    });
    it("constructor() should create .view observer on the current minValue", () => {
        const item = new Controller(100, 800, 100, true, true, true);
        item.view.butt1Move(item.view.offsetValueConv(200), 200);
        expect(item.model.curMinValue).toEqual(200);
    });
    it("constructor() should create .view observer on the current maxValue", () => {
        const item = new Controller(100, 800, 100, true, true, true);
        item.view.butt2Move(item.view.offsetValueConv(700), 700);
        expect(item.model.curMaxValue).toEqual(700);
    });
    it("constructor() should create .model observer on the current minValue", () => {
        const item = new Controller();
        item.view.isRange = true;
        item.model.setCurMinValue(300);
        expect(item.view.curMinValue).toEqual(300);
    });
    it("constructor() should create .model observer on the current maxValue", () => {
        const item = new Controller(10, 990, 20, true, false, false);
        const entry = document.createElement("div");
        entry.classList.add("slider");
        document.body.appendChild(entry);
        item.view.append(entry);
        item.view.init();        
        item.model.setCurMaxValue(900);        
        expect(item.view.curMaxValue).toEqual(900);
    });
    it("update() should change slider settings and reinit it", () => {
        const item = new Controller();
        const entry = document.createElement("div");
        entry.classList.add("slider");
        document.body.appendChild(entry);
        item.view.append(entry);
        item.view.init();        
        item.update({minValue: 1000, maxValue: 10000, step: 100, isRange: true, isVertical: true, showLabel: true});

        expect([item.view.minValue, item.view.maxValue, item.view.step, item.view.isRange,
            item.view.isVertical, item.view.showLabel]).toEqual([1000, 10000, 100, true, true, true]);
    });
    it("update(), if data to update isn't correct there is shouldn't be new property", () => {
        const item = new Controller();
        const entry = document.createElement("div");
        entry.classList.add("slider");
        document.body.appendChild(entry);
        item.view.append(entry);
        item.view.init();        
        item.update({munValue: 100});

        expect(item.view.munValue).toEqual(undefined);
    });
    it("getValues() should return curMinValue and curMaxValue values", () => {
        const item = new Controller(50, 500, 1, true);
        const entry = document.createElement("div");
        entry.classList.add("slider");
        document.body.appendChild(entry);
        item.view.append(entry);
        item.view.init();
        item.model.setCurMinValue(100);
        item.model.setCurMaxValue(400); 
        expect(item.getValues()).toEqual([100, 400]);
    });
    it("setValues() should set curMinValue and curMaxValue values", () => {
        const item = new Controller(0, 1000, 1, true);
        const entry = document.createElement("div");
        entry.classList.add("slider");
        document.body.appendChild(entry);
        item.view.append(entry);
        item.view.init();
        item.setValues(23, 879);
        expect(item.getValues()).toEqual([23, 879]);
    });
    it("getConfig() should return current config", () => {
        const item = new Controller(0, 1000, 1, true);
        const entry = document.createElement("div");
        entry.classList.add("slider");
        document.body.appendChild(entry);
        item.view.append(entry);
        item.view.init();
        item.update({isVertical: true, isFloat: true})
        expect(item.getConfig()).toEqual({minValue: 0, maxValue: 1000, step: 1, isRange: true, isVertical: true, showLabel: false, isFloat:true});
    });
    it("addObserver() should add observer to the Controller", () => {
        const item = new Controller(-1000, 0, 10, false);
        const entry = document.createElement("div");
        entry.classList.add("slider");
        document.body.appendChild(entry);
        item.view.append(entry);
        item.view.init();
        function obs() {
            console.log();
        }
        item.addObserver(obs);
        expect(item.observers.observers).toEqual([obs]);
    });
});
    