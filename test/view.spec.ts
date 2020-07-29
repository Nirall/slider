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
    it("init(), if .float = true innerHTML of mark2 should be float", () => {
        const newItem = new Graduation();
        newItem.init(1, 3, false, true);
        expect(newItem.mark2.innerHTML).toEqual('1.67');
    });
    it("init() method should set innerHTML of mark3 to the minValue + 1/3(maxVal - minval)", () => {
        const newItem = new Graduation();
        newItem.init(1000, 10000, false);
        expect(newItem.mark3.innerHTML).toEqual('7000');
    });
    it("init(), if .float = true innerHTML of mark3 should be float", () => {
        const newItem = new Graduation();
        newItem.init(1, 3, false, true);
        expect(newItem.mark3.innerHTML).toEqual('2.33');
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
    it("should has .minvalue with the certain value", () => {
        const newItem = new View(1, 1000, 10);
        expect(newItem.minValue).toEqual(1);
    });
    it("should has .maxvalue with the certain value", () => {
        const newItem = new View(1, 1000, 10);
        expect(newItem.maxValue).toEqual(1000);
    });
    it("should has .step with the certain value", () => {
        const newItem = new View(1, 1000, 10);
        expect(newItem.step).toEqual(10);
    });
    it("should has .range with the certain value", () => {
        const newItem = new View(1, 1000, 10, true);
        expect(newItem.range).toEqual(true);
    });
    it("should has .vertical with the certain value", () => {
        const newItem = new View(1, 1000, 10, true, true);
        expect(newItem.vertical).toEqual(true);
    });
    it("should has .showlabel with the certain value", () => {
        const newItem = new View(1, 1000, 10, true, true, true);
        expect(newItem.showLabel).toEqual(true);
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
    it("getStart() should return offset the middle of button1(horizontal) if .range = true", () => {
        const newItem = new View(1000, 10000, 1200, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.button1.elem.style.left = "200px";
        expect(newItem.getStart()).toEqual(206);
    });
    it("getStart() should return offset the middle of button1(vertical) if .range = true", () => {
        const newItem = new View(1000, 10000, 1200, true, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.button1.elem.style.top = "200px";
        expect(newItem.getStart()).toEqual(206);
    });
    it("getStart() should return 0 if .range = false", () => {
        const newItem = new View(1000, 10000, 1200);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.button1.elem.style.left = "200px";
        expect(newItem.getStart()).toEqual(0);
    });
    it("getEnd() should return offset the middle of button2(horizontal)", () => {
        const newItem = new View(1000, 10000, 1200, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.button2.elem.style.left = "300px";
        expect(newItem.getEnd()).toEqual(306);
    });
    it("getEnd() should return offset the middle of button2(vertical)", () => {
        const newItem = new View(1000, 10000, 1200, true, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.button2.elem.style.top = "300px";
        expect(newItem.getEnd()).toEqual(306);
    });
    it("updateElems() should set scaleFilling options according buttons(vertical)", () => {
        const newItem = new View(1000, 10000, 100, true, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.button1.elem.style.top = "100px";
        newItem.button2.elem.style.top = "300px";
        newItem.updateElems();
        expect(newItem.scaleFilling.elem.style.height).toEqual("200px");
    });
    it("updateElems() should set scaleFilling options according buttons (horizontal)", () => {
        const newItem = new View(0, 1000, 100, true, false);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.button1.elem.style.left = "50px";
        newItem.button2.elem.style.left = "450px";
        newItem.updateElems();
        expect(newItem.scaleFilling.elem.style.width).toEqual("400px");
    });

    it("round() should round number to the step", () => {
        const newItem = new View(0, 1000);
        expect(newItem.round(130, 100)).toEqual(100);
    });
    it("round() should be correct for the negatave numbers (round to down)", () => {
        const newItem = new View(-1000, 0, 100);
        expect(newItem.round(-390, 100)).toEqual(-400);
    });
    it("round() should be correct for the negatave numbers (round to up)", () => {
        const newItem = new View(-1000, 0, 100);
        expect(newItem.round(-340, 100)).toEqual(-300);
    });
    it("roundOffsetButt() should round offset", () => {
        const newItem = new View(0, 400, 50);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        const offset = newItem.roundOffsetButt(272)[0];
        expect(offset < 297 && offset > 291).toBeTrue();
    });
    it("roundOffsetButt() should return roundvalue with float type", () => {
        const newItem = new View(0, 2, 0.1, false, false, false, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "300px";
        entry.style.height = "300px";
        document.body.appendChild(entry);
        newItem.append(entry);
        const roundValue = newItem.roundOffsetButt(94)[1];
        expect(roundValue).toEqual(0.7);
    });
    it("roundOffsetButt() should return value (horizontal)", () => {
        const newItem = new View(0, 400, 50);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        const value = newItem.roundOffsetButt(272)[1];
        expect(value).toEqual(300);
    });
    it("roundOffsetButt(), returning value shouldn't be more then maxvalue", () => {
        const newItem = new View(0, 400, 100, false, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        const value = newItem.roundOffsetButt(509)[1];
        expect(value).toEqual(400);
    });
    it("roundOffsetButt(), returning value shouldn't be less then minvalue", () => {
        const newItem = new View(100, 500, 100, false, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        const value = newItem.roundOffsetButt(-100)[1];
        expect(value).toEqual(100);
    });
    it("offsetValueConv(), should return offset for the value (horizontal)", () => {
        const newItem = new View(100, 500, 100, true, false);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        const value = newItem.offsetValueConv(200);
        expect(value > 97 && value < 103).toBeTrue;
    });
    it("offsetValueConv(), should return offset for the value (vertical)", () => {
        const newItem = new View(100, 500, 100, false, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        const value = newItem.offsetValueConv(200);
        expect(value > 97 && value < 103).toBeTrue;
    });
    it("butt1Move() should move butt1 on the certain offset (horizontal)", () => {
        const newItem = new View(0, 400, 1, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.butt1Move(300, 300);
        expect(newItem.getStart()).toEqual(306);
    });
    it("butt1Move() should move butt1 on the certain offset (vertical)", () => {
        const newItem = new View(0, 400, 1, true, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.butt1Move(300, 300);
        expect(newItem.getStart()).toEqual(306);
    });
    it("butt1Move() should move label1 on the certain offset (horizontal)", () => {
        const newItem = new View(0, 400, 1, true, false, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.butt1Move(300, 300);
        const label1Offset = newItem.label1.elem.getBoundingClientRect().left - newItem.scale.getLeft();
        const label1Width = newItem.label1.getWidth();
        expect(label1Offset).toEqual(300 - label1Width/2 + 6);
    });
    it("butt1Move() should move label1 on the certain offset (vertical)", () => {
        const newItem = new View(0, 400, 1, true, true, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.butt1Move(300, 300);
        const label1Offset = newItem.label1.elem.getBoundingClientRect().top - newItem.scale.getTop();
        const label1Height = newItem.label1.getHeight();
        expect(label1Offset).toEqual(300 - label1Height/2 + 6);
    });
    it("butt1Move() should set label1 value", () => {
        const newItem = new View(0, 400, 1, true, false, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.butt1Move(300, 300);
        expect(newItem.label1.elem.innerHTML).toEqual("300");
    });
    it("butt2Move() should move butt2 on the certain offset (horizontal)", () => {
        const newItem = new View(0, 400, 1, true, false, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.butt2Move(300, 300);
        expect(newItem.getEnd()).toEqual(306);
    });
    it("butt2Move() should move butt2 on the certain offset (vertical)", () => {
        const newItem = new View(0, 400, 1, true, true, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.butt2Move(300, 300);
        expect(newItem.getEnd()).toEqual(306);
    });
    it("butt2Move() should move label2 on the certain offset (horizontal)", () => {
        const newItem = new View(0, 400, 1, true, false, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.butt2Move(300, 300);
        const label2Offset = newItem.label2.elem.getBoundingClientRect().left - newItem.scale.getLeft();
        const label2Width = newItem.label2.getWidth();
        expect(label2Offset).toEqual(300 - label2Width/2 + 6);
    });
    it("butt2Move() should move label2 on the certain offset (vertical)", () => {
        const newItem = new View(0, 400, 1, true, true, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.butt2Move(300, 300);
        const label2Offset = newItem.label2.elem.getBoundingClientRect().top - newItem.scale.getTop();
        const label2Height = newItem.label2.getHeight();
        expect(label2Offset).toEqual(300 - label2Height/2 + 6);
    });
    it("butt2Move() should set label2 value", () => {
        const newItem = new View(0, 400, 1, true, false, true);
        newItem.init();
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.butt2Move(300, 300);
        expect(newItem.label2.elem.innerHTML).toEqual("300");
    });
    it("onMouseMove1() should move button1 according to the mouse (horizontal)", () => {
        const newItem = new View(0, 1000, 1, true, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        const mMove1 = new MouseEvent("mousemove", {clientX: 100});
        newItem.button1.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt1Offset = newItem.button1.getLeft();
        expect(butt1Offset < 97 && butt1Offset > 91).toBeTrue();
    });
    it("onMouseMove1() should move button1 according to the mouse (vertical)", () => {
        const newItem = new View(0, 1000, 1, true, true);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        const butt1OffsetOld = newItem.button1.getTop();
        const mMove1 = new MouseEvent("mousemove", {clientY: butt1OffsetOld + 200});
        newItem.button1.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt1Offset = newItem.button1.getTop();
        expect(butt1Offset < butt1OffsetOld + 197 && butt1Offset > butt1OffsetOld + 191).toBeTrue();
    });
    it("onMouseMove1(), if offset < min, button1 offset should be 0 (horizontal)", () => {
        const newItem = new View(0, 1000, 1, true, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        const mMove1 = new MouseEvent("mousemove", {clientX: -100});
        newItem.button1.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt1Offset = newItem.button1.getLeft() - newItem.scale.getLeft();
        expect(butt1Offset).toEqual(-6);
    });
    it("onMouseMove1(), if offset < min, button1 offset should be 0 (vertical)", () => {
        const newItem = new View(0, 1000, 1, true, true);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        const butt1OffsetOld = newItem.button1.getTop();
        newItem.butt1Move(100, 100);
        const mMove1 = new MouseEvent("mousemove", {clientY: butt1OffsetOld - 200});
        newItem.button1.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt1Offset = newItem.button1.getTop() - newItem.scale.getTop();
        expect(butt1Offset).toEqual(-6);
    });
    it("onMouseMove1(), button1 offset shouldn't be more the button2 (horizontal)", () => {
        const newItem = new View(0, 1000, 100, true, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        const mMove1 = new MouseEvent("mousemove", {clientX: 400});
        newItem.butt2Move(300, 300);
        newItem.button1.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt1Offset = newItem.button1.getLeft() - newItem.scale.getLeft();
        const butt2Offset = newItem.button2.getLeft() - newItem.scale.getLeft();
        expect(butt1Offset < butt2Offset).toBeTrue();
    });
    it("onMouseMove1(), button1 offset shouldn't be more the button2 (vertical)", () => {
        const newItem = new View(0, 1000, 100, true, true);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        const butt1OffsetOld = newItem.button1.getTop();
        const mMove1 = new MouseEvent("mousemove", {clientY: butt1OffsetOld + 400});
        newItem.butt2Move(300, 300);
        newItem.button1.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt1Offset = newItem.button1.getTop() - newItem.scale.getTop();
        const butt2Offset = newItem.button2.getTop() - newItem.scale.getTop();
        expect(butt1Offset < butt2Offset).toBeTrue();
    });
    it("onMouseMove1(), with the small step butt1 shouldn't run over butt2 (horizontal)", () => {
        const newItem = new View(0, 1000, 1, true, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        newItem.butt2Move(300, 300);
        const OffsetTarget = newItem.button2.getLeft();
        const mMove1 = new MouseEvent("mousemove", {clientX: OffsetTarget - 4});
        newItem.button1.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt1Offset = newItem.button1.getLeft() - newItem.scale.getLeft();
        const butt2Offset = newItem.button2.getLeft() - newItem.scale.getLeft();
        expect(butt2Offset - butt1Offset > newItem.button1.getWidth() - 1).toBeTrue();
    });
    it("onMouseMove1(), with the small step butt1 shouldn't run over butt2 (vertical)", () => {
        const newItem = new View(0, 1000, 1, true, true);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        newItem.butt2Move(300, 300);
        const OffsetTarget = newItem.button2.getTop();
        const mMove1 = new MouseEvent("mousemove", {clientY: OffsetTarget - 4});
        newItem.button1.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt1Offset = newItem.button1.getTop() - newItem.scale.getTop();
        const butt2Offset = newItem.button2.getTop() - newItem.scale.getTop();
        expect(butt2Offset - butt1Offset > newItem.button1.getWidth() - 1).toBeTrue();
    });
    it("onMouseMove2() should move button2 according to the mouse (horizontal)", () => {
        const newItem = new View(0, 1000, 1, true, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        const mMove1 = new MouseEvent("mousemove", {clientX: 100});
        newItem.button2.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt2Offset = newItem.button2.getLeft();
        expect(butt2Offset < 97 && butt2Offset > 91).toBeTrue();
    });
    it("onMouseMove2() should move button2 according to the mouse (vertical)", () => {
        const newItem = new View(0, 1000, 1, true, true);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        entry.style.width = "400px";
        entry.style.height = "400px";
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        const butt2OffsetOld = newItem.button2.getTop();
        const mMove1 = new MouseEvent("mousemove", {clientY: butt2OffsetOld - 200});
        newItem.button2.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt2Offset = newItem.button2.getTop();
        expect(butt2Offset < butt2OffsetOld - 203 && butt2Offset > butt2OffsetOld - 209).toBeTrue();
    });
    it("onMouseMove2(), if offset > max, button2 offset should be max (horizontal)", () => {
        const newItem = new View(0, 1000, 1, true, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        const mMove1 = new MouseEvent("mousemove", {clientX: 900});
        newItem.button2.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt2Offset = newItem.button2.getLeft() - newItem.scale.getLeft();
        expect(butt2Offset).toEqual(newItem.scale.getWidth() - newItem.button2.getWidth()/2);
    });
    it("onMouseMove2(), if offset > max, button2 offset should be max (vertical)", () => {
        const newItem = new View(0, 1000, 1, true, true);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        const butt2OffsetOld = newItem.button2.getTop();
        const mMove1 = new MouseEvent("mousemove", {clientY: butt2OffsetOld + 900});
        newItem.butt2Move(300, 300);
        newItem.button2.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt2Offset = newItem.button2.getTop() - newItem.scale.getTop();
        expect(butt2Offset).toEqual(newItem.scale.getHeight() - newItem.button2.getWidth()/2);
    });
    it("onMouseMove2(), if offset < min, button2 offset should be 0 (range = false, horizontal)", () => {
        const newItem = new View(0, 1000, 1, false, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        const mMove1 = new MouseEvent("mousemove", {clientX: -900});
        newItem.button2.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt2Offset = newItem.button2.getLeft() - newItem.scale.getLeft();
        expect(butt2Offset).toEqual(-newItem.button2.getWidth()/2);
    });
    it("onMouseMove2(), if offset < min, button2 offset should be 0 (range = false, vertical)", () => {
        const newItem = new View(0, 1000, 1, false, true);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        const mMove1 = new MouseEvent("mousemove", {clientY: -900});
        newItem.button2.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt2Offset = newItem.button2.getTop() - newItem.scale.getTop();
        expect(butt2Offset).toEqual(-newItem.button2.getWidth()/2);
    });
    it("onMouseMove2(), button2 offset shouldn't be less then button1 (horizontal)", () => {
        const newItem = new View(0, 1000, 100, true, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        newItem.butt1Move(150, 300);
        const mMove1 = new MouseEvent("mousemove", {clientX: newItem.button1.getLeft() - 50});
        newItem.button2.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt1Offset = newItem.button1.getLeft() - newItem.scale.getLeft();
        const butt2Offset = newItem.button2.getLeft() - newItem.scale.getLeft();
        expect(butt1Offset < butt2Offset).toBeTrue();
    });
    it("onMouseMove2(), button2 offset shouldn't be less then button1 (vertical)", () => {
        const newItem = new View(0, 1000, 100, true, true);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        newItem.butt1Move(250, 300);
        const mMove1 = new MouseEvent("mousemove", {clientY: newItem.button1.getTop() - 150});
        newItem.button2.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt1Offset = newItem.button1.getTop() - newItem.scale.getTop();
        const butt2Offset = newItem.button2.getTop() - newItem.scale.getTop();
        expect(butt1Offset < butt2Offset).toBeTrue();
    });
    it("onMouseMove2(), with the small step butt2 shouldn't run over butt1 (horizontal)", () => {
        const newItem = new View(0, 1000, 1, true, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        newItem.butt1Move(300, 300);
        const OffsetTarget = newItem.button1.getLeft();
        const mMove1 = new MouseEvent("mousemove", {clientX: OffsetTarget + 4});
        newItem.button2.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt1Offset = newItem.button1.getLeft() - newItem.scale.getLeft();
        const butt2Offset = newItem.button2.getLeft() - newItem.scale.getLeft();
        expect(butt2Offset - butt1Offset > newItem.button1.getWidth() - 1).toBeTrue();
    });
    it("onMouseMove2(), with the small step butt2 shouldn't run over butt1 (vertical)", () => {
        const newItem = new View(0, 1000, 1, true, true);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mDown = new MouseEvent("mousedown");
        const mUp = new Event("mouseup");
        newItem.butt1Move(300, 300);
        const OffsetTarget = newItem.button1.getTop();
        const mMove1 = new MouseEvent("mousemove", {clientY: OffsetTarget + 4});
        newItem.button2.elem.dispatchEvent(mDown);
        document.dispatchEvent(mMove1);
        document.dispatchEvent(mUp);
        const butt1Offset = newItem.button1.getTop() - newItem.scale.getTop();
        const butt2Offset = newItem.button2.getTop() - newItem.scale.getTop();
        expect(butt2Offset - butt1Offset > newItem.button1.getWidth() - 1).toBeTrue();
    });
    it("scaleOnclick() should move button1 according to the mouse (horizontal)", () => {
        const newItem = new View(0, 1000, 1, true, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mClick = new MouseEvent("mouseclick", {clientX: 150});
        newItem.scaleOnclick(mClick);
        const butt1Offset = newItem.button1.getLeft();
        expect(butt1Offset < 147 && butt1Offset > 141).toBeTrue();
    });
    it("scaleOnclick() should move button2 according to the mouse (horizontal, not range)", () => {
        const newItem = new View(0, 1000, 1, false, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mClick = new MouseEvent("mouseclick", {clientX: 150});
        newItem.scaleOnclick(mClick);
        const butt2Offset = newItem.button2.getLeft();
        expect(butt2Offset < 147 && butt2Offset > 141).toBeTrue();
    });
    it("scaleOnclick() should move button1 according to the mouse (vertical)", () => {
        const newItem = new View(0, 1000, 1, true, true);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const butt1OffsetOld = newItem.button1.getTop();
        const mClick = new MouseEvent("mouseclick", {clientY: butt1OffsetOld + 100});
        newItem.scaleOnclick(mClick);
        const butt1Offset = newItem.button1.getTop();
        expect(butt1Offset < butt1OffsetOld + 97 && butt1Offset > butt1OffsetOld + 91).toBeTrue();
    });
    it("scaleOnclick() should move button2 according to the mouse (vertical, not range)", () => {
        const newItem = new View(0, 1000, 1, false, true);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const butt2OffsetOld = newItem.button2.getTop();
        const mClick = new MouseEvent("mouseclick", {clientY: butt2OffsetOld - 100});
        newItem.scaleOnclick(mClick);
        const butt2Offset = newItem.button2.getTop();
        expect(butt2Offset < butt2OffsetOld - 103 && butt2Offset > butt2OffsetOld - 109).toBeTrue();
    });
    it("scaleOnclick() should move button2 according to the mouse (horizontal)", () => {
        const newItem = new View(0, 1000, 1, true, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const mClick = new MouseEvent("mouseclick", {clientX: 350});
        newItem.scaleOnclick(mClick);
        const butt2Offset = newItem.button2.getLeft();
        expect(butt2Offset < 347 && butt2Offset > 341).toBeTrue();
    });
    
    it("scaleOnclick() should move button2 according to the mouse (vertical)", () => {
        const newItem = new View(0, 1000, 1, true, true);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        const butt2OffsetOld = newItem.button2.getTop();
        const mClick = new MouseEvent("mouseclick", {clientY: butt2OffsetOld - 50});
        newItem.scaleOnclick(mClick);
        const butt2Offset = newItem.button2.getTop();
        expect(butt2Offset < butt2OffsetOld - 53 && butt2Offset > butt2OffsetOld - 59).toBeTrue();
    });
    it("interMarkHandler() should move button1 according to the value (horizontal)", () => {
        const newItem = new View(0, 800, 1, true, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        newItem.interMarkHandler(200);
        const butt1Offset = newItem.button1.getLeft() - newItem.scale.getLeft();
        //expect(butt1Offset).toEqual(100);
        expect(butt1Offset < 97 && butt1Offset > 91).toBeTrue();
    });
    it("interMarkHandler() should move button2 according to the value (horizontal, not range)", () => {
        const newItem = new View(0, 800, 1, false, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        newItem.interMarkHandler(200);
        const butt2Offset = newItem.button2.getLeft() - newItem.scale.getLeft();
        expect(butt2Offset < 97 && butt2Offset > 91).toBeTrue();
    });
    it("interMarkHandler() should move button1 according to the value (vertical)", () => {
        const newItem = new View(0, 800, 1, true, true);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        newItem.interMarkHandler(200);
        const butt1Offset = newItem.button1.getTop() - newItem.scale.getTop();
        expect(butt1Offset < 97 && butt1Offset > 91).toBeTrue();
    });
    it("interMarkHandler() should move button2 according to the value (vertical, not range)", () => {
        const newItem = new View(0, 800, 1, false, true);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        newItem.interMarkHandler(200);
        const butt2Offset = newItem.button2.getTop() - newItem.scale.getTop();
        expect(butt2Offset < 97 && butt2Offset > 91).toBeTrue();
    });
    it("interMarkHandler() should move button2 according to the value (horizontal)", () => {
        const newItem = new View(0, 800, 1, true, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        newItem.interMarkHandler(600);
        const butt2Offset = newItem.button2.getLeft() - newItem.scale.getLeft();
        expect(butt2Offset < 297 && butt2Offset > 291).toBeTrue();
    });
    it("interMarkHandler() should move button2 according to the value (vertical)", () => {
        const newItem = new View(0, 800, 1, true, true);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        newItem.interMarkHandler(600);
        const butt2Offset = newItem.button2.getTop() - newItem.scale.getTop();
        expect(butt2Offset < 297 && butt2Offset > 291).toBeTrue();
    });
    it("mark1Handler should move button1 to the beginning", ()=> {
        const newItem = new View(0, 800, 1, true, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        newItem.butt1Move(200, 200);
        const offsetBefore = newItem.getStart();
        const mClick = new MouseEvent("click");
        newItem.mark1Onclick(mClick);
        //expect(newItem.getStart()).toEqual(offsetBefore);
        expect(newItem.getStart() == 0 && newItem.getStart() != offsetBefore).toBeTrue();
    });
    it("mark4Handler should move button2 to the end (horizontal)", ()=> {
        const newItem = new View(0, 800, 1, true, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        newItem.butt2Move(200, 200);
        const offsetBefore = newItem.getEnd();
        const mClick = new MouseEvent("click");
        newItem.mark4Onclick(mClick);
        const offset = newItem.getEnd();
        expect(offset < 403 && offset > 397 && offset != offsetBefore).toBeTrue();
    });
    it("mark4Handler should move button2 to the end if range false (horizontal)", ()=> {
        const newItem = new View(0, 800, 1, false, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        newItem.butt2Move(200, 200);
        const offsetBefore = newItem.getStart();
        const mClick = new MouseEvent("click");
        newItem.mark4Onclick(mClick);
        const offset = newItem.getEnd();
        expect(offset < 403 && offset > 397 && offset != offsetBefore).toBeTrue();
    });
    it("mark4Handler should move button2 to the end (vertical)", ()=> {
        const newItem = new View(0, 800, 1, true, true);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        newItem.butt2Move(200, 200);
        const offsetBefore = newItem.getEnd();
        const mClick = new MouseEvent("click");
        newItem.mark4Onclick(mClick);
        const offset = newItem.getEnd();
        expect(offset < 403 && offset > 397 && offset != offsetBefore).toBeTrue();
    });
    it("mark4Handler should move button2 to the end if range = false (vertical)", ()=> {
        const newItem = new View(0, 800, 1, false, true);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        newItem.butt2Move(200, 200);
        const offsetBefore = newItem.getStart();
        const mClick = new MouseEvent("click");
        newItem.mark4Onclick(mClick);
        const offset = newItem.getEnd();
        expect(offset < 403 && offset > 397 && offset != offsetBefore).toBeTrue();
    });
    it("mark2Onclick() should move buttons using mark2.innerHTML", () => {
        const newItem = new View(0, 800, 1, true, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        newItem.graduation.mark2.innerHTML = "200";
        const mClick = new MouseEvent("click");
        newItem.mark2Onclick(mClick);
        expect(newItem.getStart() > 97 && newItem.getStart() < 103).toBeTrue();
    });
    it("mark3Onclick() should move buttons using mark3.innerHTML", () => {
        const newItem = new View(0, 800, 1, true, false);
        const entry = createElem("slider");
        entry.style.width = "400px";
        entry.style.height = "400px";
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        newItem.graduation.mark3.innerHTML = "600";
        const mClick = new MouseEvent("click");
        newItem.mark3Onclick(mClick);
        expect(newItem.getEnd() > 297 && newItem.getEnd() < 303).toBeTrue();
    });
    it("init() should set display = 'none' of the button1 on default", () => {
        const newItem = new View(0, 800, 1);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.button1.elem.style.display).toEqual("none");
    });
    it("init() should set display = 'block' of the button1, if range = true", () => {
        const newItem = new View(0, 800, 1, true, false);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.button1.elem.style.display).toEqual("block");
    });
    it("init() should set display = 'none' of the button1, if range is changed to false", () => {
        const newItem = new View(0, 800, 1, true, false);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        newItem.range = false;
        newItem.init();
        expect(newItem.button1.elem.style.display).toEqual("none");
    });
    it("init() should set display = 'block' to the label1, if range = true", () => {
        const newItem = new View(0, 800, 1, true, true, true);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.label1.elem.style.display).toEqual("block");
    });
    it("init() should set display = 'none' to the label1, if range is changed to false", () => {
        const newItem = new View(0, 800, 1, true, false);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        newItem.range = false;
        newItem.init();
        expect(newItem.label1.elem.style.display).toEqual("none");
    });
    it("init(), scaleElem should has class 'slider__scale_vertical' if vertical=true", () => {
        const newItem = new View(0, 800, 1, true, true);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.scale.elem.classList.contains("slider__scale_vertical")).toBeTrue();
    });
    it("init(), scaleElem shouldn't has class 'slider__scale_vertical' if vertical=false", () => {
        const newItem = new View(0, 800, 1, true, false);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.scale.elem.classList.contains("slider__scale_vertical")).toBeFalse();
    });
    it("init(), scaleFillingElem should has class 'slider__scale__filling_vertical' if vertical=true", () => {
        const newItem = new View(0, 800, 1, true, true);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.scaleFilling.elem.classList.contains("slider__scale__filling_vertical")).toBeTrue();
    });
    it("init(), scaleFillingElem shouldn't has class 'slider__scale__filling_vertical' if vertical=false", () => {
        const newItem = new View(0, 800, 1, true, false);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.scaleFilling.elem.classList.contains("slider__scale__filling_vertical")).toBeFalse();
    });
    it("init(), gradElem should has class 'slider__graduation_vertical' if vertical=true", () => {
        const newItem = new View(0, 800, 1, true, true);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.graduation.gradElem.classList.contains("slider__graduation_vertical")).toBeTrue();
    });
    it("init(), gradElem shouldn't has class 'slider__graduation_vertical' if vertical=false", () => {
        const newItem = new View(0, 800, 1, true, false);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.graduation.gradElem.classList.contains("slider__graduation_vertical")).toBeFalse();
    });
    it("init(), button1 elem should has class 'slider__button_vertical' if vertical=true", () => {
        const newItem = new View(0, 800, 1, true, true);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.button1.elem.classList.contains("slider__button_vertical")).toBeTrue();
    });
    it("init(), button1 shouldn't has class 'slider__button_vertical' if vertical=false", () => {
        const newItem = new View(0, 800, 1, true, false);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.button1.elem.classList.contains("slider__button_vertical")).toBeFalse();
    });
    it("init(), button2 elem should has class 'slider__button_vertical' if vertical=true", () => {
        const newItem = new View(0, 800, 1, true, true);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.button2.elem.classList.contains("slider__button_vertical")).toBeTrue();
    });
    it("init(), button2 shouldn't has class 'slider__button_vertical' if vertical=false", () => {
        const newItem = new View(0, 800, 1, true, false);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.button2.elem.classList.contains("slider__button_vertical")).toBeFalse();
    });
    it("init(), label1 elem should has class 'slider__button__label_vertical' if vertical=true", () => {
        const newItem = new View(0, 800, 1, true, true);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.label1.elem.classList.contains("slider__button__label_vertical")).toBeTrue();
    });
    it("init(), label1 shouldn't has class 'slider__button__label_vertical' if vertical=false", () => {
        const newItem = new View(0, 800, 1, true, false);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.label1.elem.classList.contains("slider__button__label_vertical")).toBeFalse();
    });
    it("init(), label2 elem should has class 'slider__button__label_vertical' if vertical=true", () => {
        const newItem = new View(0, 800, 1, true, true);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.label2.elem.classList.contains("slider__button__label_vertical")).toBeTrue();
    });
    it("init(), label2 shouldn't has class 'slider__button__label_vertical' if vertical=false", () => {
        const newItem = new View(0, 800, 1, true, false);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.label2.elem.classList.contains("slider__button__label_vertical")).toBeFalse();
    });
    
    it("checkValues(), if step > maxvalue - minvalue, step should be setted to the maxvalue - minvalue", () => {
        //spyOn(console, "error");
        const newItem = new View(0, 800, 900, true, false);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(newItem.step).toEqual(800);
    });
    it("checkValues(), if step > maxvalue - minvalue, there is should be a error message", () => {
        spyOn(console, "error");
        const newItem = new View(0, 800, 900, true, false);
        const entry = createElem("slider");
        document.body.appendChild(entry);
        newItem.append(entry);
        newItem.init();
        expect(console.error).toHaveBeenCalled();
    });
})

