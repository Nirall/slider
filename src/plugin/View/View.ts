import MakeObservableObject from "../makeObservableObject/MakeObservableObject";
import createElem from "./blocks/createElem/createElem";
import Scale from "./blocks/scale/Scale";
import Graduation from "./blocks/graduation/Graduation";
import Runner from "./blocks/runner/Runner";
import ScaleFilling from "./blocks/scaleFilling/ScaleFilling";

interface runnerMoveData {
  runner: Runner,
  offset: number,
  value: number,
}

class View {
  [index: string]: any;
  scale: Scale;
  scaleFilling: ScaleFilling;
  runner1: Runner;
  runner2: Runner;
  isRange: boolean;
  isVertical: boolean;
  showLabel: boolean;
  minValue: number;
  maxValue: number;
  curMinValue: number;
  curMaxValue: number;
  step: number;
  isFloat: boolean;
  observers: MakeObservableObject;
  graduation: Graduation;

  constructor(minValue = 0, maxValue = 1000, step = 1, isRange = false, isVertical = false, showLabel = false, isFloat = false) {
    this.scale = new Scale(isVertical);
    this.runner1 = new Runner(isVertical);
    this.runner2 = new Runner(isVertical);
    this.scaleFilling = new ScaleFilling(isVertical);
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.curMinValue = minValue;
    this.curMaxValue = maxValue;
    this.step = step;
    this.isRange = isRange;
    this.isVertical = isVertical;
    this.showLabel = showLabel;
    this.isFloat = isFloat;
    this.observers = new MakeObservableObject()
    //this.checkValues();

    const parameters = {
      minValue: this.minValue,
      maxValue: this.maxValue,
      step: this.step,
      isRange: this.isRange,
      isVertical: this.isVertical,
      showLabel: this.showLabel,
      isFloat: this.isFloat
    }

    this.graduation = new Graduation(parameters);
    this.graduation.observers.addObserver(this.graduationObserver);
  }

  graduationObserver = (value: number) => {
    
    let offset = this.offsetValueConv(value);
    let roundOffset, roundValue;
    [roundOffset, roundValue] = this.roundOffsetButt(offset);

    if (this.isRange) {
      this.runnerMove({
        runner: this.runnerCheck(offset),
        offset: roundOffset,
        value: roundValue
      });
    } else {
      this.runnerMove({
        runner: this.runner2,
        offset: roundOffset,
        value: roundValue
      });
    }
  }

  getStart = (): number => {
    if (this.isRange) {
      return this.runner1.getPosition() - this.scale.getPosition() + this.runner1.getWidth()/2;
    }

    return 0;
  }

  getEnd = (): number => {
    return this.runner2.getPosition() - this.scale.getPosition() + this.runner2.getWidth()/2;
  }

  updateElems = (): void => {
    this.scaleFilling.init(this.isVertical);
    this.scaleFilling.setPosition(this.getStart());
    this.scaleFilling.setDimension(this.getEnd() - this.getStart());
    this.observers.notifyObservers();
  }

  round = (val: number, step: number): number => {
    const whole = Math.trunc(val/step);
    const reminder = +(val - whole*step).toFixed(2);

    if (val < 0) {
      return Math.abs(reminder) < step/2 ? whole*step : (whole - 1)*step;
    }

    if (val <= this.minValue) {
      return this.minValue;
    } else if (val >= this.maxValue) {
      return this.maxValue;
    }

    return reminder < step/2 ? whole*step : (whole + 1)*step;
  }

  roundOffsetButt = (currOffset: number): Array<number> => {
    const currValue = this.minValue + (currOffset + this.runner2.getWidth()/2)*(this.maxValue - this.minValue)/this.scale.getDimension();
    let roundValue = this.round(currValue, this.step);

    if (this.isFloat) {
      roundValue = parseFloat(roundValue.toFixed(2));
    }

    const roundOffset = this.offsetValueConv(roundValue);
    return [roundOffset, roundValue];
  }

  offsetValueConv = (value: number): number => {
    return ((value - this.minValue)/(this.maxValue - this.minValue)*this.scale.getDimension() - this.runner2.getWidth()/2);
  }

  runnerMove = (obj: runnerMoveData): void => {
    obj.runner.setPosition(obj.offset, obj.value);

    if (obj.runner === this.runner1) {
      this.curMinValue = obj.value;
    }

    if (obj.runner === this.runner2) {
      this.curMaxValue = obj.value;
    }

    this.updateElems();
  }

  runner1OffsetCheck = (newOffset: number): Array<number> => {
    let roundValue;

    if (newOffset < -this.runner1.getWidth()/2) {
      newOffset = -this.runner1.getWidth()/2;
      roundValue = this.minValue;
    }

    const stepWidth = this.step*this.scale.getDimension()/(this.maxValue - this.minValue);
    const minOffset = stepWidth/1.5 > this.runner1.getWidth() ? stepWidth/1.5 : this.runner1.getWidth();

    if (newOffset > this.runner2.getPosition() - this.scale.getPosition() - minOffset) {
      newOffset = this.runner2.getPosition() - this.scale.getPosition() - minOffset;
    }

    return [newOffset, roundValue];
  }

  onMouseMove1 = (eventMm: MouseEvent): void => {
    let roundValue;
    let roundOffset;
    const coordinate = this.isVertical ? eventMm.clientY : eventMm.clientX;
    const newOffset = coordinate - this.scale.getPosition() - this.runner1.getWidth()/2;

    [roundOffset, roundValue] = this.runner1OffsetCheck(newOffset);

    if (typeof roundValue === 'undefined') {
      [roundOffset, roundValue] = this.roundOffsetButt(roundOffset);
    }

    this.runnerMove({
      runner: this.runner1,
      offset: roundOffset,
      value: roundValue
    });
  }

  onMouseUp1 = (): void => {
    document.removeEventListener("mouseup", this.onMouseUp1);
    document.removeEventListener("mousemove", this.onMouseMove1);
  }

  runner2OffsetCheck = (newOffset: number): Array<number> => {
    let roundValue;

    if (!this.isRange) {
      if (newOffset < -this.runner2.getWidth()/2) {
        newOffset = -this.runner2.getWidth()/2;
        roundValue = this.minValue;
      }
    }

    const stepWidth = this.step*this.scale.getDimension()/(this.maxValue - this.minValue);
    const minOffset = stepWidth/1.5 > this.runner1.getWidth() ? stepWidth/1.5 : this.runner1.getWidth();

    if (newOffset < this.runner1.getPosition() - this.scale.getPosition() + minOffset) {
      newOffset = this.runner1.getPosition() - this.scale.getPosition() + minOffset;
    }

    if (newOffset > this.scale.getDimension() - this.runner2.getWidth()/2) {
      newOffset = this.scale.getDimension() - this.runner2.getWidth()/2;
      roundValue = this.maxValue;
    }

    return [newOffset, roundValue];
  }

  onMouseMove2 = (eventMm: MouseEvent): void => {
    let roundValue;
    let roundOffset;
    const coordinate = this.isVertical ? eventMm.clientY : eventMm.clientX;
    const newOffset = coordinate - this.scale.getPosition() - this.runner2.getWidth()/2;

    [roundOffset, roundValue] = this.runner2OffsetCheck(newOffset);

    if (typeof roundValue === 'undefined') {
      [roundOffset, roundValue] = this.roundOffsetButt(roundOffset);
    }

    this.runnerMove({
      runner: this.runner2,
      offset: roundOffset,
      value: roundValue
    });
  }

  onMouseUp2 = (): void => {
    document.removeEventListener('mouseup', this.onMouseUp2);
    document.removeEventListener('mousemove', this.onMouseMove2);
  }

  butt1CloserCheck = (coordinate: number): boolean => {
    return (Math.abs(coordinate - this.button1.getPosition() - this.button1.getWidth()/2)
      < Math.abs(coordinate - this.button2.getPosition() - this.button2.getWidth()/2));
  }

  runnerCheck = (offset: number): Runner => {
    if (Math.abs(offset - this.getStart()) < Math.abs(offset - this.getEnd())) {
      return this.runner1;
    }

    return this.runner2;
  }

  // Scale EventListeners------------------------------------------------------------------
  scaleOnclick = (event: MouseEvent): void => {
    if(this.isRange) {
      const coordinate = this.isVertical ? event.clientY : event.clientX

      if (this.butt1CloserCheck(coordinate)) {
        this.onMouseMove1(event);
      } else {
        this.onMouseMove2(event);
      }
    } else {
      this.onMouseMove2(event);
    }
  }

  checkValues = (): void => {
    if (typeof this.maxValue !== "number") {
      console.error("Maxvalue should be a number");
    }
    if (typeof this.minValue !== "number") {
      console.error("Maxvalue should be a number");
    }
    if (typeof this.step !== "number") {
      console.error("Step should be a number");
    }
    if (typeof this.isRange !== "boolean") {
      console.error("isRange should be a boolean");
    }
    if (typeof this.isVertical !== "boolean") {
      console.error("isVertical should be a boolean");
    }
    if (typeof this.showLabel !== "boolean") {
      console.error("ShowLabel should be a boolean");
    }
    if (this.step > this.maxValue - this.minValue) {
      this.step = this.maxValue - this.minValue;
      console.error("Step is set to the max");
    }
  }

  renew() {
    let roundValue;
    let roundOffset;
    const newOffset = this.offsetValueConv(this.curMaxValue);
    [roundOffset, roundValue] = this.runner2OffsetCheck(newOffset);
    if (typeof roundValue === 'undefined') {
      [roundOffset, roundValue] = this.roundOffsetButt(roundOffset);
    }

    this.runnerMove({
      runner: this.runner2,
      offset: roundOffset,
      value: roundValue
    });



    if (this.isRange) {
      let roundValue;
      let roundOffset;
      const newOffset = this.offsetValueConv(this.curMinValue);
      [roundOffset, roundValue] = this.runner1OffsetCheck(newOffset);

      if (typeof roundValue === 'undefined') {
        [roundOffset, roundValue] = this.roundOffsetButt(roundOffset);
      }

      this.runnerMove({
        runner: this.runner1,
        offset: roundOffset,
        value: roundValue
      });
    }
  }

  init = (): void => {
    this.scale.init(this.isVertical);
    this.scaleFilling.init(this.isVertical);
    this.runner1.init(this.isVertical);
    this.runner2.init(this.isVertical);

    const params = {
      minValue: this.minValue,
      maxValue: this.maxValue,
      step: this.step,
      isRange: this.isRange,
      isVertical: this.isVertical,
      showLabel: this.showLabel,
      isFloat: this.isFloat
    }

    this.graduation.init(params);

    this.runner1.hide();

    if (this.showLabel) {
      this.runner1.showLabel();
      this.runner2.showLabel();
    } else {
      this.runner1.hideLabel();
      this.runner2.hideLabel();
    }

    if (this.isRange) {
      this.runner1.show();
    } else {
      this.runner1.hide();
    }

    this.runner1.setPosition(-this.runner1.getWidth()/2, this.minValue);
    this.runner2.setPosition(this.scale.getDimension() - this.runner2.getWidth()/2, this.maxValue);

    this.renew();
    this.updateElems();
  }

  append = (entry: HTMLElement): void => {
    entry.appendChild(this.scale.elem).appendChild(this.scaleFilling.elem);
    entry.appendChild(this.runner1.button.elem);
    entry.appendChild(this.runner1.label.elem);
    entry.appendChild(this.runner2.button.elem);
    entry.appendChild(this.runner2.label.elem);

    this.graduation.marks.map((mark) => {
      entry.appendChild(mark.elem);
    });

    this.graduation.moveMarks();

    this.scale.elem.onclick = this.scaleOnclick;

    this.runner1.button.elem.onmousedown = (eventMd: MouseEvent) => {
      eventMd.preventDefault();
      document.addEventListener("mousemove", this.onMouseMove1);
      document.addEventListener("mouseup", this.onMouseUp1);
    }

    this.runner1.label.elem.onmousedown = (eventMd: MouseEvent) => {
      eventMd.preventDefault();
      document.addEventListener("mousemove", this.onMouseMove1);
      document.addEventListener("mouseup", this.onMouseUp1);
    }

    this.runner2.button.elem.onmousedown = (eventMd: MouseEvent) => {
      eventMd.preventDefault();
      document.addEventListener("mousemove", this.onMouseMove2);
      document.addEventListener("mouseup", this.onMouseUp2);
    }

    this.runner2.label.elem.onmousedown = (eventMd: MouseEvent) => {
      eventMd.preventDefault();
      document.addEventListener("mousemove", this.onMouseMove2);
      document.addEventListener("mouseup", this.onMouseUp2);
    }
  }
}

export {createElem, Scale, ScaleFilling, View, Graduation};
