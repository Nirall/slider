import {createElem, Scale, Label, Button, ScaleFilling, View, Graduation} from "../src/view";

describe("function createElem", () => {
    it("should return HTMLElem", () => {
        expect(createElem("classCustom")).toBeInstanceOf(HTMLElement);
    });
    it("should have the certain class", () => {
        const newItem = createElem("classCustom");
        expect(newItem.classList.contains("classCustom")).toEqual(true);
    });
});

describe("Scale class", () => {
    it("should has HTMLElem", () => {
        expect((new Scale()).elem).toBeInstanceOf(HTMLElement);
    });
    it("elem should has class 'slider__scale'", () => {
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
        newItem.init(1000, 10000, false);
        expect(newItem.mark1.innerHTML).toEqual('1000');
    });
    it("init() method should set innerHTML of mark4 to the maxvalue", () => {
        const newItem = new Graduation();
        newItem.init(1000, 10000, false);
        expect(newItem.mark4.innerHTML).toEqual('10000');
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

describe("View.butt1move", () => {
    it("should use broadcast method of Observer template", () => {
        const testView = new View();
        testView.minValue = 1000;
        testView.maxValue = 10000;
        testView.step = 1200;
        testView.init();
    });
})