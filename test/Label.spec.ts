import "../src/style.scss";
import Label from "../src/assets/Label";

describe("Label class", () => {
  it("should has elem with class 'slider__button-label'", () => {
    const newItem = new Label();
    expect(newItem.elem.classList.contains('slider__button-label')).toEqual(true);
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
