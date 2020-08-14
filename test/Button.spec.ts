import "../src/style.scss";
import Button from "../src/assets/Button";

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
