import "../src/style.scss";
import Graduation from "../src/assets/Graduation";

describe("Graduation class", () => {
  it("should has gradElem with class 'slider__graduation'", () => {
    const newItem = new Graduation();
    expect(newItem.gradElem.classList.contains('slider__graduation')).toEqual(true);
  });

  it("should has mark1 elem with class 'slider__graduation-mark'", () => {
    const newItem = new Graduation();
    expect(newItem.mark1.classList.contains('slider__graduation-mark')).toEqual(true);
  });

  it("should has mark2 elem with class 'slider__graduation-mark'", () => {
    const newItem = new Graduation();
    expect(newItem.mark2.classList.contains('slider__graduation-mark')).toEqual(true);
  });

  it("should has mark2 elem with class 'slider__graduation-mark'", () => {
    const newItem = new Graduation();
    expect(newItem.mark2.classList.contains('slider__graduation-mark')).toEqual(true);
  });

  it("should has mark3 elem with class 'slider__graduation-mark'", () => {
    const newItem = new Graduation();
    expect(newItem.mark3.classList.contains('slider__graduation-mark')).toEqual(true);
  });

  it("should has mark4 elem with class 'slider__graduation-mark'", () => {
    const newItem = new Graduation();
    expect(newItem.mark4.classList.contains('slider__graduation-mark')).toEqual(true);
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
