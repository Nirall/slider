import { createElem } from "../src/view";
describe("createElem", () => {
    it("should return HTMLElem", () => {
        expect(createElem("classCustom")).toBeInstanceOf(HTMLElement);
    })
});