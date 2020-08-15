import "../src/style.scss";
import ScaleFilling from "../src/assets/ScaleFilling";

describe("ScaleFilling class", () => {
  it("should has elem with class 'slider__scale-filling'", () => {
    const newItem = new ScaleFilling();
    expect(newItem.elem.classList.contains('slider__scale-filling')).toEqual(true);
  });
})
