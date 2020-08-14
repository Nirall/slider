import "../src/style.scss";
import createElem from "../src/assets/createElem";

describe("function createElem", () => {
  it("should have the certain class", () => {
    const newItem = createElem("classCustom");
    expect(newItem.classList.contains("classCustom")).toEqual(true);
  });
});
