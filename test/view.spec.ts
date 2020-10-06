import "../src/style.scss";
import {createElem, Scale, Label, Button, ScaleFilling, View, Graduation} from "../src/view";

describe("View class(constructor)", () => {
  const newItem = new View(1, 1000, 10, true, true, true);

  it("should has .scale with class Scale", () => {
    expect(newItem.scale).toBeInstanceOf(Scale);
  });

  it("should has .button1 with class Button", () => {
    expect(newItem.button1).toBeInstanceOf(Button);
  });

  it("should has .button2 with class Button", () => {
    expect(newItem.button2).toBeInstanceOf(Button);
  });

  it("should has .label1 with class Label", () => {
    expect(newItem.label1).toBeInstanceOf(Label);
  });

  it("should has .label2 with class Label", () => {
    expect(newItem.label2).toBeInstanceOf(Label);
  });

  it("should has .scaleFilling with class ScaleFilling", () => {
    expect(newItem.scaleFilling).toBeInstanceOf(ScaleFilling);
  });

  it("should has .graduation with class Graduation", () => {
    expect(newItem.graduation).toBeInstanceOf(Graduation);
  });

  it("should has .minvalue with the certain value", () => {
    expect(newItem.minValue).toEqual(1);
  });

  it("should has .maxvalue with the certain value", () => {
    expect(newItem.maxValue).toEqual(1000);
  });

  it("should has .step with the certain value", () => {
    expect(newItem.step).toEqual(10);
  });

  it("should has .range with the certain value", () => {
    expect(newItem.isRange).toEqual(true);
  });

  it("should has .vertical with the certain value", () => {
    expect(newItem.isVertical).toEqual(true);
  });

  it("should has .showlabel with the certain value", () => {
    expect(newItem.showLabel).toEqual(true);
  });
});

describe("View class", () => {
  let newItem: View;

  beforeEach(() => {
    newItem = new View(0, 1000, 100, true);
    newItem.init();
    const entry = createElem("slider");
    entry.style.width = "400px";
    entry.style.height = "400px";
    document.body.appendChild(entry);
    newItem.append(entry);
  });

  it("getStart() should return offset the middle of button1(horizontal) if .range = true", () => {
    newItem.button1.elem.style.left = "200px";
    expect(newItem.getStart()).toEqual(206);
  });

  it("getStart() should return offset the middle of button1(vertical) if .range = true", () => {
    newItem.isVertical = true;
    newItem.init();
    newItem.button1.elem.style.top = "200px";
    expect(newItem.getStart()).toEqual(206);
  });

  it("getStart() should return 0 if .range = false", () => {
    newItem.isRange = false;
    newItem.init();
    newItem.button1.elem.style.left = "200px";
    expect(newItem.getStart()).toEqual(0);
  });

  it("getEnd() should return offset the middle of button2(horizontal)", () => {
    newItem.button2.elem.style.left = "300px";
    expect(newItem.getEnd()).toEqual(306);
  });

  it("getEnd() should return offset the middle of button2(vertical)", () => {
    newItem.isVertical = true;
    newItem.init();
    newItem.button2.elem.style.top = "300px";
    expect(newItem.getEnd()).toEqual(306);
  });

  it("updateElems() should set scaleFilling options according buttons(vertical)", () => {
    newItem.isVertical = true;
    newItem.init();
    newItem.button1.elem.style.top = "100px";
    newItem.button2.elem.style.top = "300px";
    newItem.updateElems();
    expect(newItem.scaleFilling.elem.style.height).toEqual("200px");
  });

  it("updateElems() should set scaleFilling options according buttons (horizontal)", () => {
    newItem.button1.elem.style.left = "50px";
    newItem.button2.elem.style.left = "450px";
    newItem.updateElems();
    expect(newItem.scaleFilling.elem.style.width).toEqual("400px");
  });

  it("round() should round number to the step", () => {
    expect(newItem.round(130, 100)).toEqual(100);
  });

  it("round() should be correct for the negative numbers (round to down)", () => {
    expect(newItem.round(-390, 100)).toEqual(-400);
  });

  it("round() should be correct for the negative numbers (round to up)", () => {
    const newItem = new View(-1000, 0, 100);
    expect(newItem.round(-340, 100)).toEqual(-300);
  });

  it("roundOffsetButt() should round offset according the step", () => {
    newItem.step = 250;
    const offset = newItem.roundOffsetButt(272)[0];
    //expect(offset).toEqual(294);
    expect(offset < 297 && offset > 291).toBeTrue();
  });

  it("roundOffsetButt() should return roundvalue with float type", () => {
    newItem = new View(0, 2, 0.1, false, false, false, true);
    const entry = createElem("slider");
    entry.style.width = "400px";
    entry.style.height = "400px";
    document.body.appendChild(entry);
    newItem.append(entry);
    newItem.init();
    const roundValue = newItem.roundOffsetButt(94)[1];
    expect(roundValue).toEqual(0.5);
  });

  it("roundOffsetButt() should return value (horizontal)", () => {
    newItem.step = 250;
    const value = newItem.roundOffsetButt(272)[1];
    expect(value).toEqual(750);
  });

  it("roundOffsetButt(), returning value shouldn't be more then maxvalue", () => {
    newItem.maxValue = 400;
    const value = newItem.roundOffsetButt(509)[1];
    expect(value).toEqual(400);
  });

  it("roundOffsetButt(), returning value shouldn't be less then minvalue", () => {
    newItem.minValue = 100;
    const value = newItem.roundOffsetButt(-100)[1];
    expect(value).toEqual(100);
  });

  it("offsetValueConv(), should return offset for the value (horizontal)", () => {
    newItem = new View(100, 500, 100, true, false);
    const value = newItem.offsetValueConv(200);
    expect(value > 97 && value < 103).toBeTrue;
  });
});

describe("View class(buttons moving)", () => {
  let newItem: View;

  beforeEach(() => {
    newItem = new View(0, 400, 1, true, false, true);
    newItem.init();
    const entry = createElem("slider");
    entry.style.width = "400px";
    entry.style.height = "400px";
    document.body.appendChild(entry);
    newItem.append(entry);
  })

  it("butt1Move() should move butt1 on the certain offset (horizontal)", () => {
    newItem.butt1Move(300, 300);
    expect(newItem.getStart()).toEqual(306);
  });

  it("butt1Move() should move butt1 on the certain offset (vertical)", () => {
    newItem.isVertical = true;
    newItem.butt1Move(300, 300);
    expect(newItem.getStart()).toEqual(306);
  });

  it("butt1Move() should move label1 on the certain offset (horizontal)", () => {
    newItem.butt1Move(300, 300);
    const label1Offset = newItem.label1.elem.getBoundingClientRect().left - newItem.scale.elem.getBoundingClientRect().left;
    const label1Width = newItem.label1.elem.getBoundingClientRect().width;
    expect(label1Offset).toEqual(300 - label1Width/2 + 6);
  });

  it("butt1Move() should move label1 on the certain offset (vertical)", () => {
    newItem.isVertical = true;
    newItem.init();
    newItem.butt1Move(300, 300);
    const label1Offset = newItem.label1.elem.getBoundingClientRect().top - newItem.scale.elem.getBoundingClientRect().top;
    const label1Height = newItem.label1.elem.getBoundingClientRect().height;
    expect(label1Offset).toEqual(300 - label1Height/2 + 6);
  });

  it("butt1Move() should set label1 value", () => {
    newItem.butt1Move(300, 300);
    expect(newItem.label1.elem.innerHTML).toEqual("300");
  });

  it("butt2Move() should move butt2 on the certain offset (horizontal)", () => {
    newItem.butt2Move(300, 300);
    expect(newItem.getEnd()).toEqual(306);
  });

  it("butt2Move() should move butt2 on the certain offset (vertical)", () => {
    newItem.isVertical = true;
    newItem.init();
    newItem.butt2Move(300, 300);
    expect(newItem.getEnd()).toEqual(306);
  });

  it("butt2Move() should move label2 on the certain offset (horizontal)", () => {
    newItem.butt2Move(300, 300);
    const label2Offset = newItem.label2.elem.getBoundingClientRect().left - newItem.scale.elem.getBoundingClientRect().left;
    const label2Width = newItem.label2.elem.getBoundingClientRect().width;
    expect(label2Offset).toEqual(300 - label2Width/2 + 6);
  });

  it("butt2Move() should move label2 on the certain offset (vertical)", () => {
    newItem.isVertical = true;
    newItem.init();
    newItem.butt2Move(300, 300);
    const label2Offset = newItem.label2.elem.getBoundingClientRect().top - newItem.scale.elem.getBoundingClientRect().top;
    const label2Height = newItem.label2.elem.getBoundingClientRect().height;
    expect(label2Offset).toEqual(300 - label2Height/2 + 6);
  });

  it("butt2Move() should set label2 value", () => {
    newItem.butt2Move(300, 300);
    expect(newItem.label2.elem.innerHTML).toEqual("300");
  });
});

describe("View class(mouse moving handlers)", () => {
  let newItem: View;
  let mDown: MouseEvent;
  let mUp: MouseEvent;

  beforeEach(() => {
    newItem = new View(0, 1000, 1, true);
    const entry = createElem("slider");
    entry.style.width = "400px";
    entry.style.height = "400px";
    document.body.appendChild(entry);
    newItem.append(entry);
    mDown = new MouseEvent("mousedown");
    mUp = new MouseEvent("mouseup");
    newItem.init();
  })

  it("onMouseMove1() should move button1 according to the mouse (horizontal)", () => {
    const mMove1 = new MouseEvent("mousemove", {clientX: 100});
    newItem.button1.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    const butt1Offset = newItem.button1.elem.getBoundingClientRect().left;
    expect(butt1Offset < 97 && butt1Offset > 91).toBeTrue();
  });

  it("onMouseMove1() should move button1 according to the mouse (vertical)", () => {
    newItem.isVertical = true;
    newItem.init();
    const butt1OffsetOld = newItem.button1.elem.getBoundingClientRect().top;
    const mMove1 = new MouseEvent("mousemove", {clientY: butt1OffsetOld + 200});
    newItem.button1.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    const butt1Offset = newItem.button1.elem.getBoundingClientRect().top;
    expect(butt1Offset < butt1OffsetOld + 197 && butt1Offset > butt1OffsetOld + 191).toBeTrue();
  });

  it("onMouseMove1(), if offset < min, button1 offset should be 0 (horizontal)", () => {
    const mMove1 = new MouseEvent("mousemove", {clientX: -100});
    newItem.button1.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    const butt1Offset = newItem.button1.elem.getBoundingClientRect().left - newItem.scale.elem.getBoundingClientRect().left;
    expect(butt1Offset).toEqual(-6);
  });

  it("onMouseMove1(), if offset < min, button1 offset should be 0 (vertical)", () => {
    newItem.isVertical = true;
    newItem.init();
    const butt1OffsetOld = newItem.button1.elem.getBoundingClientRect().top;
    newItem.butt1Move(100, 100);
    const mMove1 = new MouseEvent("mousemove", {clientY: butt1OffsetOld - 200});
    newItem.button1.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    const butt1Offset = newItem.button1.elem.getBoundingClientRect().top - newItem.scale.elem.getBoundingClientRect().top;
    expect(butt1Offset).toEqual(-6);
  });

  it("onMouseMove1(), button1 offset shouldn't be more the button2 (horizontal)", () => {
    const mMove1 = new MouseEvent("mousemove", {clientX: 400});
    newItem.butt2Move(300, 300);
    newItem.button1.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    const scaleOffset = newItem.scale.elem.getBoundingClientRect().left
    const butt1Offset = newItem.button1.elem.getBoundingClientRect().left - scaleOffset;
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().left - scaleOffset;
    expect(butt1Offset < butt2Offset).toBeTrue();
  });

  it("onMouseMove1(), button1 offset shouldn't be more the button2 (vertical)", () => {
    newItem.isVertical = true;
    newItem.init();
    const butt1OffsetOld = newItem.button1.elem.getBoundingClientRect().top;
    const mMove1 = new MouseEvent("mousemove", {clientY: butt1OffsetOld + 400});
    newItem.butt2Move(300, 300);
    newItem.button1.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    const scaleOffset = newItem.scale.elem.getBoundingClientRect().top;
    const butt1Offset = newItem.button1.elem.getBoundingClientRect().top - scaleOffset;
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().top - scaleOffset;
    //expect(butt1Offset).toEqual(butt2Offset);
    expect(butt1Offset < butt2Offset).toBeTrue();
  });

  it("onMouseMove1(), with the small step butt1 shouldn't run over butt2 (horizontal)", () => {
    newItem.butt2Move(300, 300);
    const OffsetTarget = newItem.button2.elem.getBoundingClientRect().left;
    const mMove1 = new MouseEvent("mousemove", {clientX: OffsetTarget - 4});
    newItem.button1.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    const scaleOffset = newItem.scale.elem.getBoundingClientRect().left;
    const butt1Offset = newItem.button1.elem.getBoundingClientRect().left - scaleOffset;
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().left - scaleOffset;
    expect(butt2Offset - butt1Offset > newItem.button1.getWidth() - 1).toBeTrue();
  });

  it("onMouseMove1(), with the small step butt1 shouldn't run over butt2 (vertical)", () => {
    newItem.isVertical = true;
    newItem.init();
    newItem.butt2Move(300, 300);
    const OffsetTarget = newItem.button2.elem.getBoundingClientRect().top;
    const mMove1 = new MouseEvent("mousemove", {clientY: OffsetTarget - 4});
    newItem.button1.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    const scaleOffset = newItem.scale.elem.getBoundingClientRect().top;
    const butt1Offset = newItem.button1.elem.getBoundingClientRect().top - scaleOffset;
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().top - scaleOffset;
    expect(butt2Offset - butt1Offset > newItem.button1.getWidth() - 1).toBeTrue();
  });

  it("onMouseMove2() should move button2 according to the mouse (horizontal)", () => {
    const mMove1 = new MouseEvent("mousemove", {clientX: 100});
    newItem.button2.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().left;
    expect(butt2Offset < 97 && butt2Offset > 91).toBeTrue();
  });

  it("onMouseMove2() should move button2 according to the mouse (vertical)", () => {
    newItem.isVertical = true;
    newItem.init();
    const butt2OffsetOld = newItem.button2.elem.getBoundingClientRect().top;
    const mMove1 = new MouseEvent("mousemove", {clientY: butt2OffsetOld - 200});
    newItem.button2.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().top;
    expect(butt2Offset < butt2OffsetOld - 203 && butt2Offset > butt2OffsetOld - 209).toBeTrue();
  });

  it("onMouseMove2(), if offset > max, button2 offset should be max (horizontal)", () => {
    const mMove1 = new MouseEvent("mousemove", {clientX: 900});
    newItem.button2.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().left - newItem.scale.elem.getBoundingClientRect().left;
    expect(butt2Offset).toEqual(newItem.scale.elem.getBoundingClientRect().width - newItem.button2.getWidth()/2);
  });

  it("onMouseMove2(), if offset > max, button2 offset should be max (vertical)", () => {
    newItem.isVertical = true;
    newItem.init();
    const butt2OffsetOld = newItem.button2.elem.getBoundingClientRect().top;
    const mMove1 = new MouseEvent("mousemove", {clientY: butt2OffsetOld + 900});
    newItem.butt2Move(300, 300);
    newItem.button2.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().top - newItem.scale.elem.getBoundingClientRect().top;
    expect(butt2Offset).toEqual(newItem.scale.elem.getBoundingClientRect().height - newItem.button2.getWidth()/2);
  });

  it("onMouseMove2(), if offset < min, button2 offset should be min (range = false, horizontal)", () => {
    newItem.isVertical = false;
    newItem.isRange = false;
    newItem.init();
    const mMove1 = new MouseEvent("mousemove", {clientX: -900});
    newItem.button2.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    console.log(newItem.scale.elem.getBoundingClientRect().left);
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().left - newItem.scale.elem.getBoundingClientRect().left;
    expect(butt2Offset).toEqual(-newItem.button2.getWidth()/2);
  });

  it("onMouseMove2(), if offset < min, button2 offset should be 0 (range = false, vertical)", () => {
    newItem.isVertical = true;
    newItem.isRange = false;
    newItem.init();
    const mMove1 = new MouseEvent("mousemove", {clientY: -900});
    newItem.button2.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().top - newItem.scale.elem.getBoundingClientRect().top;
    expect(butt2Offset).toEqual(-newItem.button2.getWidth()/2);
  });

  it("onMouseMove2(), button2 offset shouldn't be less then button1 (horizontal)", () => {
    newItem.step = 100;
    newItem.init();
    newItem.butt1Move(150, 300);
    const mMove1 = new MouseEvent("mousemove", {clientX: newItem.button1.elem.getBoundingClientRect().left - 50});
    newItem.button2.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    const scaleOffset = newItem.scale.elem.getBoundingClientRect().left;
    const butt1Offset = newItem.button1.elem.getBoundingClientRect().left - scaleOffset;
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().left - scaleOffset;
    expect(butt1Offset < butt2Offset).toBeTrue();
  });

  it("onMouseMove2(), button2 offset shouldn't be less then button1 (vertical)", () => {
    newItem.step = 100;
    newItem.isVertical = true;
    newItem.init();
    newItem.butt1Move(250, 300);
    const mMove1 = new MouseEvent("mousemove", {clientY: newItem.button1.elem.getBoundingClientRect().top - 150});
    newItem.button2.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    const scaleOffset = newItem.scale.elem.getBoundingClientRect().top;
    const butt1Offset = newItem.button1.elem.getBoundingClientRect().top - scaleOffset;
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().top - scaleOffset;
    expect(butt1Offset < butt2Offset).toBeTrue();
  });

  it("onMouseMove2(), with the small step butt2 shouldn't run over butt1 (horizontal)", () => {
    newItem.butt1Move(300, 300);
    const OffsetTarget = newItem.button1.elem.getBoundingClientRect().left;
    const mMove1 = new MouseEvent("mousemove", {clientX: OffsetTarget + 4});
    newItem.button2.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    const scaleOffset = newItem.scale.elem.getBoundingClientRect().left;
    const butt1Offset = newItem.button1.elem.getBoundingClientRect().left - scaleOffset;
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().left - scaleOffset;
    expect(butt2Offset - butt1Offset > newItem.button1.getWidth() - 1).toBeTrue();
  });

  it("onMouseMove2(), with the small step butt2 shouldn't run over butt1 (vertical)", () => {
    newItem.isVertical = true;
    newItem.init();
    newItem.butt1Move(300, 300);
    const OffsetTarget = newItem.button1.elem.getBoundingClientRect().top;
    const mMove1 = new MouseEvent("mousemove", {clientY: OffsetTarget + 4});
    newItem.button2.elem.dispatchEvent(mDown);
    document.dispatchEvent(mMove1);
    document.dispatchEvent(mUp);
    const scaleOffset = newItem.scale.elem.getBoundingClientRect().top;
    const butt1Offset = newItem.button1.elem.getBoundingClientRect().top - scaleOffset;
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().top - scaleOffset;
    expect(butt2Offset - butt1Offset > newItem.button1.getWidth() - 1).toBeTrue();
  });

  it("scaleOnclick() should move button1 according to the mouse (horizontal)", () => {
    const mClick = new MouseEvent("mouseclick", {clientX: 150});
    newItem.scaleOnclick(mClick);
    const butt1Offset = newItem.button1.elem.getBoundingClientRect().left;
    //const butt2Offset = newItem.button2.elem.getBoundingClientRect().left;
    //expect(butt1Offset).toEqual(144);
    expect(butt1Offset < 147 && butt1Offset > 141).toBeTrue();
  });

  it("scaleOnclick() should move button2 according to the mouse (horizontal, not range)", () => {
    newItem.isRange = false;
    newItem.init();
    const mClick = new MouseEvent("mouseclick", {clientX: 150});
    newItem.scaleOnclick(mClick);
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().left;
    expect(butt2Offset < 147 && butt2Offset > 141).toBeTrue();
  });

  it("scaleOnclick() should move button1 according to the mouse (vertical)", () => {
    newItem.isVertical = true;
    newItem.init();
    const butt1OffsetOld = newItem.button1.elem.getBoundingClientRect().top;
    const mClick = new MouseEvent("mouseclick", {clientY: butt1OffsetOld + 100});
    newItem.scaleOnclick(mClick);
    const butt1Offset = newItem.button1.elem.getBoundingClientRect().top;
    expect(butt1Offset < butt1OffsetOld + 97 && butt1Offset > butt1OffsetOld + 91).toBeTrue();
  });

  it("scaleOnclick() should move button2 according to the mouse (vertical, not range)", () => {
    newItem.isVertical = true;
    newItem.isRange = false;
    newItem.init();
    const butt2OffsetOld = newItem.button2.elem.getBoundingClientRect().top;
    const mClick = new MouseEvent("mouseclick", {clientY: butt2OffsetOld - 100});
    newItem.scaleOnclick(mClick);
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().top;
    expect(butt2Offset < butt2OffsetOld - 103 && butt2Offset > butt2OffsetOld - 109).toBeTrue();
  });

  it("scaleOnclick() should move button2 according to the mouse (horizontal)", () => {
    const mClick = new MouseEvent("mouseclick", {clientX: 350});
    newItem.scaleOnclick(mClick);
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().left;
    expect(butt2Offset < 347 && butt2Offset > 341).toBeTrue();
  });

  it("scaleOnclick() should move button2 according to the mouse (vertical)", () => {
    newItem.isVertical = true;
    newItem.init();
    const butt2OffsetOld = newItem.button2.elem.getBoundingClientRect().top;
    const mClick = new MouseEvent("mouseclick", {clientY: butt2OffsetOld - 50});
    newItem.scaleOnclick(mClick);
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().top;
    expect(butt2Offset < butt2OffsetOld - 53 && butt2Offset > butt2OffsetOld - 59).toBeTrue();
  });

  it("interMarkHandler() should move button1 according to the value (horizontal)", () => {
    newItem.interMarkHandler(250);
    const butt1Offset = newItem.button1.elem.getBoundingClientRect().left - newItem.scale.elem.getBoundingClientRect().left;
    //expect(butt1Offset).toEqual(100);
    expect(butt1Offset < 97 && butt1Offset > 91).toBeTrue();
  });

  it("interMarkHandler() should move button2 according to the value (horizontal, not range)", () => {
    newItem.isRange = false;
    newItem.init();
    newItem.interMarkHandler(250);
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().left - newItem.scale.elem.getBoundingClientRect().left;
    expect(butt2Offset < 97 && butt2Offset > 91).toBeTrue();
  });

  it("interMarkHandler() should move button1 according to the value (vertical)", () => {
    newItem.isVertical = true;
    newItem.init();
    newItem.interMarkHandler(250);
    const butt1Offset = newItem.button1.elem.getBoundingClientRect().top - newItem.scale.elem.getBoundingClientRect().top;
    expect(butt1Offset < 97 && butt1Offset > 91).toBeTrue();
  });

  it("interMarkHandler() should move button2 according to the value (vertical, not range)", () => {
    newItem.isVertical = true;
    newItem.isRange = false;
    newItem.init();
    newItem.interMarkHandler(250);
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().top - newItem.scale.elem.getBoundingClientRect().top;
    expect(butt2Offset < 97 && butt2Offset > 91).toBeTrue();
  });

  it("interMarkHandler() should move button2 according to the value (horizontal)", () => {
    newItem.interMarkHandler(750);
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().left - newItem.scale.elem.getBoundingClientRect().left;
    expect(butt2Offset < 297 && butt2Offset > 291).toBeTrue();
  });

  it("interMarkHandler() should move button2 according to the value (vertical)", () => {
    newItem.isVertical = true;
    newItem.init();
    newItem.interMarkHandler(750);
    const butt2Offset = newItem.button2.elem.getBoundingClientRect().top - newItem.scale.elem.getBoundingClientRect().top;
    expect(butt2Offset < 297 && butt2Offset > 291).toBeTrue();
  });

  it("mark1Handler should move button1 to the beginning", ()=> {
    newItem.butt1Move(200, 200);
    const offsetBefore = newItem.getStart();
    const mClick = new MouseEvent("click");
    newItem.mark1Onclick(mClick);
    //expect(newItem.getStart()).toEqual(offsetBefore);
    expect(newItem.getStart() === 0 && newItem.getStart() !== offsetBefore).toBeTrue();
  });

  it("mark4Handler should move button2 to the end (horizontal)", () => {
    newItem.butt2Move(200, 200);
    const offsetBefore = newItem.getEnd();
    const mClick = new MouseEvent("click");
    newItem.mark4Onclick(mClick);
    const offset = newItem.getEnd();
    expect(offset < 403 && offset > 397 && offset != offsetBefore).toBeTrue();
  });

  it("mark4Handler should move button2 to the end (vertical)", ()=> {
    newItem.isVertical = true;
    newItem.init();
    newItem.butt2Move(200, 200);
    const offsetBefore = newItem.getEnd();
    const mClick = new MouseEvent("click");
    newItem.mark4Onclick(mClick);
    const offset = newItem.getEnd();
    expect(offset < 403 && offset > 397 && offset != offsetBefore).toBeTrue();
  });

  it("mark2Onclick() should move buttons using mark2.innerHTML", () => {
    newItem.graduation.mark2.innerHTML = "250";
    const mClick = new MouseEvent("click");
    newItem.mark2Onclick(mClick);
    expect(newItem.getStart() > 97 && newItem.getStart() < 103).toBeTrue();
  });

  it("mark3Onclick() should move buttons using mark3.innerHTML", () => {
    newItem.graduation.mark3.innerHTML = "750";
    const mClick = new MouseEvent("click");
    newItem.mark3Onclick(mClick);
    expect(newItem.getEnd() > 297 && newItem.getEnd() < 303).toBeTrue();
  });

  it("init() should set display = 'none' of the button1 if range = false showLabel = true", () => {
    newItem.showLabel = true;
    newItem.isRange = false;
    newItem.init();
    expect(newItem.button1.elem.style.display).toEqual("none");
  });

  it("init() should set display = 'block' of the button1, if range = true", () => {
    expect(newItem.button1.elem.style.display).toEqual("block");
  });

  it("init() should set display = 'block' to the label1, if range = true showLabel = true", () => {
    newItem.showLabel = true;
    newItem.init();
    expect(newItem.label1.elem.style.display).toEqual("block");
  });

  it("init() should set display = 'none' to the label1, if range is changed to false", () => {
    newItem.isRange = false;
    newItem.init();
    expect(newItem.label1.elem.style.display).toEqual("none");
  });

  it("init(), scaleElem should has class 'slider__scale_position_vertical' if vertical=true", () => {
    newItem.isVertical = true;
    newItem.init();
    expect(newItem.scale.elem.classList.contains("slider__scale_position_vertical")).toBeTrue();
  });

  it("init(), scaleElem shouldn't has class 'slider__scale_position_vertical' if vertical=false", () => {
    expect(newItem.scale.elem.classList.contains("slider__scale_position_vertical")).toBeFalse();
  });

  it("init(), scaleFillingElem should has class 'slider__scale-filling_position_vertical' if vertical=true", () => {
    newItem.isVertical = true;
    newItem.init();
    expect(newItem.scaleFilling.elem.classList.contains("slider__scale-filling_position_vertical")).toBeTrue();
  });

  it("init(), scaleFillingElem shouldn't has class 'slider__scale-filling_position_vertical' if vertical=false", () => {
    expect(newItem.scaleFilling.elem.classList.contains("slider__scale-filling_position_vertical")).toBeFalse();
  });

  it("init(), gradElem should has class 'slider__graduation_position_vertical' if vertical=true", () => {
    newItem.isVertical = true;
    newItem.init();
    expect(newItem.graduation.gradElem.classList.contains("slider__graduation_position_vertical")).toBeTrue();
  });

  it("init(), gradElem shouldn't has class 'slider__graduation_position_vertical' if vertical=false", () => {
    expect(newItem.graduation.gradElem.classList.contains("slider__graduation_position_vertical")).toBeFalse();
  });

  it("init(), button1 elem should has class 'slider__button_position_vertical' if vertical=true", () => {
    newItem.isVertical = true;
    newItem.init();
    expect(newItem.button1.elem.classList.contains("slider__button_position_vertical")).toBeTrue();
  });

  it("init(), button1 shouldn't has class 'slider__button_position_vertical' if vertical=false", () => {
    expect(newItem.button1.elem.classList.contains("slider__button_position_vertical")).toBeFalse();
  });

  it("init(), button2 elem should has class 'slider__button_position_vertical' if vertical=true", () => {
    newItem.isVertical = true;
    newItem.init();
    expect(newItem.button2.elem.classList.contains("slider__button_position_vertical")).toBeTrue();
  });

  it("init(), button2 shouldn't has class 'slider__button_position_vertical' if vertical=false", () => {
    expect(newItem.button2.elem.classList.contains("slider__button_position_vertical")).toBeFalse();
  });

  it("init(), label1 elem should has class 'slider__button-label_position_vertical' if vertical=true", () => {
    newItem.isVertical = true;
    newItem.init();
    expect(newItem.label1.elem.classList.contains("slider__button-label_position_vertical")).toBeTrue();
  });

  it("init(), label1 shouldn't has class 'slider__button-label_position_vertical' if vertical=false", () => {
    expect(newItem.label1.elem.classList.contains("slider__button-label_position_vertical")).toBeFalse();
  });

  it("init(), label2 elem should has class 'slider__button-label_position_vertical' if vertical=true", () => {
    newItem.isVertical = true;
    newItem.init();
    expect(newItem.label2.elem.classList.contains("slider__button-label_position_vertical")).toBeTrue();
  });

  it("init(), label2 shouldn't has class 'slider__button-label_position_vertical' if vertical=false", () => {
    expect(newItem.label2.elem.classList.contains("slider__button-label_position_vertical")).toBeFalse();
  });

  it("checkValues(), if step > maxvalue - minvalue, step should be setted to the maxvalue - minvalue", () => {
    //spyOn(console, "error");
    newItem.step = 1200;
    newItem.init();
    expect(newItem.step).toEqual(1000);
  });
});
