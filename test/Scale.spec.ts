import "../src/style.scss";
import Scale from "../src/assets/Scale";

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
