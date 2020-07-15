import {createElem, Scale, Label, Button, ScaleFilling, View, Graduation} from "../src/view";
import "../src/style.scss";

describe("function createElem", () => {
    it("should have the certain class", () => {
        const newItem = createElem("classCustom");
        expect(newItem.classList.contains("classCustom")).toEqual(true);
    });
});

describe("Scale class", () => {
    it("elem should has elem with class 'slider__scale'", () => {
        expect((new Scale()).elem.classList.contains("slider__scale")).toEqual(true);
    });
    it("getLeft() should return left offset of the elem", () => {
        const newItem = new Scale();
        expect(newItem.getLeft()).toEqual(newItem.elem.getBoundingClientRect().left);
    });
    it("getWidth() should return width of the elem", () => {
        const newItem = new Scale();
        expect(newItem.getWidth()).toEqual(newItem.elem.getBoundingClientRect().width);
    });
    it("getHeight() should return height of the elem", () => {
        const newItem = new Scale();
        expect(newItem.getHeight()).toEqual(newItem.elem.getBoundingClientRect().height);
    });
    it("getTop() should return top offset of the elem", () => {
        const newItem = new Scale();
        expect(newItem.getTop()).toEqual(newItem.elem.getBoundingClientRect().top);
    });
});

describe("Graduation class", () => {
    it("should has gradElem with class 'slider__graduation'", () => {
        const newItem = new Graduation();
        expect(newItem.gradElem.classList.contains('slider__graduation')).toEqual(true);
    });
    it("should has mark1 elem with class 'slider__graduation__mark'", () => {
        const newItem = new Graduation();
        expect(newItem.mark1.classList.contains('slider__graduation__mark')).toEqual(true);
    });
    it("should has mark2 elem with class 'slider__graduation__mark'", () => {
        const newItem = new Graduation();
        expect(newItem.mark2.classList.contains('slider__graduation__mark')).toEqual(true);
    });
    it("should has mark3 elem with class 'slider__graduation__mark'", () => {
        const newItem = new Graduation();
        expect(newItem.mark3.classList.contains('slider__graduation__mark')).toEqual(true);
    });
    it("should has mark4 elem with class 'slider__graduation__mark'", () => {
        const newItem = new Graduation();
        expect(newItem.mark4.classList.contains('slider__graduation__mark')).toEqual(true);
    });
    it("init() method should set innerHTML of mark1 to the minvalue", () => {
        const newItem = new Graduation();
        newItem.init(0, 10000, false);
        expect(newItem.mark1.innerHTML).toEqual('0');
    });
    it("init() method should set innerHTML of mark4 to the maxvalue", () => {
        const newItem = new Graduation();
        newItem.init(1000, 5000, false);
        expect(newItem.mark4.innerHTML).toEqual('5000');
    });
    it("init() method should set innerHTML of mark2 to the minValue + 1/3(maxVal - minval)", () => {
        const newItem = new Graduation();
        newItem.init(1000, 10000, false);
        expect(newItem.mark2.innerHTML).toEqual('4000');
    });
    it("init() method should set innerHTML of mark3 to the minValue + 1/3(maxVal - minval)", () => {
        const newItem = new Graduation();
        newItem.init(1000, 10000, false);
        expect(newItem.mark3.innerHTML).toEqual('7000');
    });
})

describe("Scale class", () => {
    it("elem should has elem with class 'slider__scale'", () => {
        expect((new Scale()).elem.classList.contains("slider__scale")).toEqual(true);
    });
    it("getLeft() should return left offset of the elem", () => {
        const newItem = new Scale();
        expect(newItem.getLeft()).toEqual(newItem.elem.getBoundingClientRect().left);
    });
    it("getWidth() should return width of the elem", () => {
        const newItem = new Scale();
        expect(newItem.getWidth()).toEqual(newItem.elem.getBoundingClientRect().width);
    });
    it("getHeight() should return height of the elem", () => {
        const newItem = new Scale();
        expect(newItem.getHeight()).toEqual(newItem.elem.getBoundingClientRect().height);
    });
    it("getTop() should return top offset of the elem", () => {
        const newItem = new Scale();
        expect(newItem.getTop()).toEqual(newItem.elem.getBoundingClientRect().top);
    });
});

describe("Button class", () => {
    it("should has elem with class 'slider__button'", () => {
        const newItem = new Button();
        expect(newItem.elem.classList.contains('slider__button')).toEqual(true);
    });
    it("getLeft() should return left offset of the elem", () => {
        const newItem = new Button();
        expect(newItem.getLeft()).toEqual(newItem.elem.getBoundingClientRect().left);
    });
    it("getWidth() should return width of the elem", () => {
        const newItem = new Button();
        expect(newItem.getWidth()).toEqual(newItem.elem.getBoundingClientRect().width);
    });
    it("getTop() should return top offset of the elem", () => {
        const newItem = new Button();
        expect(newItem.getTop()).toEqual(newItem.elem.getBoundingClientRect().top);
    });
})

describe("Label class", () => {
    it("should has elem with class 'slider__button__label'", () => {
        const newItem = new Label();
        expect(newItem.elem.classList.contains('slider__button__label')).toEqual(true);
    });
    it("getWidth() should return width of the elem", () => {
        const newItem = new Label();
        expect(newItem.getWidth()).toEqual(newItem.elem.getBoundingClientRect().width);
    });
    it("getHeight() should return top offset of the elem", () => {
        const newItem = new Label();
        expect(newItem.getHeight()).toEqual(newItem.elem.getBoundingClientRect().top);
    });
})

describe("ScaleFilling class", () => {
    it("should has elem with class 'slider__scale__filling'", () => {
        const newItem = new ScaleFilling();
        expect(newItem.elem.classList.contains('slider__scale__filling')).toEqual(true);
    });
})

describe("View class", () => {
    it("should has .scale with class Scale", () => {
        const newItem = new View();
        expect(newItem.scale).toBeInstanceOf(Scale);
    });
    it("should has .button1 with class Button", () => {
        const newItem = new View();
        expect(newItem.button1).toBeInstanceOf(Button);
    });
    it("should has .button2 with class Button", () => {
        const newItem = new View();
        expect(newItem.button2).toBeInstanceOf(Button);
    });
    it("should has .label1 with class Label", () => {
        const newItem = new View();
        expect(newItem.label1).toBeInstanceOf(Label);
    });
    it("should has .label2 with class Label", () => {
        const newItem = new View();
        expect(newItem.label2).toBeInstanceOf(Label);
    });
    it("should has .scaleFilling with class ScaleFilling", () => {
        const newItem = new View();
        expect(newItem.scaleFilling).toBeInstanceOf(ScaleFilling);
    });
    it("should has .graduation with class Graduation", () => {
        const newItem = new View();
        expect(newItem.graduation).toBeInstanceOf(Graduation);
    });
    it("button1.elem should has eventlistener mousedown", () => {
        const newItem = new View();
        expect(typeof newItem.button1.elem.onmousedown).toEqual("function");
    });
    it("button2.elem should has eventlistener mousedown", () => {
        const newItem = new View();
        expect(typeof newItem.button2.elem.onmousedown).toEqual("function");
    });
    it("scale.elem should has eventlistener onclick", () => {
        const newItem = new View();
        expect(newItem.scale.elem.onclick).toBeInstanceOf(Function);
    });
    it("graduation.mark1 should has eventlistener onclick", () => {
        const newItem = new View();
        expect(newItem.graduation.mark1.onclick).toBeInstanceOf(Function);
    });
    it("graduation.mark2 should has eventlistener onclick", () => {
        const newItem = new View();
        expect(newItem.graduation.mark2.onclick).toBeInstanceOf(Function);
    });
    it("graduation.mark3 should has eventlistener onclick", () => {
        const newItem = new View();
        expect(newItem.graduation.mark3.onclick).toBeInstanceOf(Function);
    });
    it("graduation.mark4 should has eventlistener onclick", () => {
        const newItem = new View();
        expect(newItem.graduation.mark4.onclick).toBeInstanceOf(Function);
    });
    it("getStart() should return offset the middle of button1(horizontal)", () => {
        const newItem = new View();
        newItem.minValue = 1000;
        newItem.maxValue = 10000;
        newItem.step = 1200;
        newItem.init();
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.button1.elem.style.left = "200px";
        expect(newItem.getStart()).toEqual(206);
    });
    it("getStart() should return offset the middle of button1(vertical)", () => {
        const newItem = new View();
        newItem.minValue = 1000;
        newItem.maxValue = 10000;
        newItem.step = 1200;
        newItem.vertical = true;
        newItem.init();
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.button1.elem.style.top = "200px";
        expect(newItem.getStart()).toEqual(206);
    });
    it("getEnd() should return offset the middle of button2(horizontal)", () => {
        const newItem = new View();
        newItem.minValue = 1000;
        newItem.maxValue = 10000;
        newItem.step = 1200;
        newItem.range = true;
        newItem.init();
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.button2.elem.style.left = "300px";
        expect(newItem.getEnd()).toEqual(306);
    });
    it("getEnd() should return offset the middle of button2(vertical)", () => {
        const newItem = new View();
        newItem.minValue = 1000;
        newItem.maxValue = 10000;
        newItem.step = 1200;
        newItem.range = true;
        newItem.vertical = true;
        newItem.init();
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.button2.elem.style.top = "300px";
        expect(newItem.getEnd()).toEqual(306);
    });
    it("updateElems() should set scaleFilling options according buttons(vertical)", () => {
        const newItem = new View();
        newItem.minValue = 0;
        newItem.maxValue = 1000;
        newItem.step = 100;
        newItem.range = true;
        newItem.vertical = true;
        newItem.init();
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.button1.elem.style.top = "100px";
        newItem.button2.elem.style.top = "300px";
        newItem.updateElems();
        expect(newItem.scaleFilling.elem.style.height).toEqual("200px");
    });
    it("updateElems() should set scaleFilling options according buttons (horizontal)", () => {
        const newItem = new View();
        newItem.minValue = 0;
        newItem.maxValue = 1000;
        newItem.step = 100;
        newItem.range = true;
        newItem.init();
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.button1.elem.style.left = "50px";
        newItem.button2.elem.style.left = "450px";
        newItem.updateElems();
        expect(newItem.scaleFilling.elem.style.width).toEqual("400px");
    });

    /*--------------------------------------------------------------------
    it("initLabels() should set button1 to the beginning", () => {
        const newItem = new View();
        newItem.minValue = 0;
        newItem.maxValue = 1000;
        newItem.step = 100;
        newItem.range = true;
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        newItem.initLabels();
        let offset = parseInt(newItem.button1.elem.style.left.slice(0, -2));
        expect(offset < -3 && offset > -9).toBeTrue();
    });
    it("initLabels() should set button2 to the end", () => {
        const newItem = new View();
        newItem.minValue = 0;
        newItem.maxValue = 1000;
        newItem.step = 100;
        newItem.range = true;
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.scale.elem.style.width = "400px";
        newItem.append(entry);
        newItem.init();
        newItem.initLabels();
        let offset = parseInt(newItem.button2.elem.style.left.slice(0, -2));
        expect(offset < 397 && offset > 391).toBeTrue();
    });
    it("initLabels() should set label1 to the minvalue", () => {
        const newItem = new View();
        newItem.minValue = 32;
        newItem.maxValue = 1000;
        newItem.step = 100;
        newItem.range = true;
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        newItem.initLabels();
        let offset = parseInt(newItem.button2.elem.style.left.slice(0, -2));
        expect(offset < 397 && offset > 391).toBeTrue();
    });
    --------------------------------------------------------------------*/

    it("round() should round number to the step", () => {
        const newItem = new View();
        newItem.minValue = 0;
        newItem.maxValue = 1000;
        expect(newItem.round(130, 100)).toEqual(100);
    });
    it("roundOffsetButt() should round offset", () => {
        const newItem = new View();
        newItem.minValue = 1000;
        newItem.maxValue = 10000;
        newItem.step = 1;
        //newItem.scale.elem.style.width = "1000px";
        newItem.init();
        newItem.roundOffsetButt(1200);
        expect(newItem.roundOffsetButt(1200)[0]).toEqual(200);
    });
})
