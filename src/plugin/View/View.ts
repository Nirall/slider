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

interface Parameters {
  minValue: number,
  maxValue: number,
  step: number,
  isRange: boolean,
  isVertical: boolean,
  showLabel: boolean,
  isFloat: boolean
}

const defaultParameters = {
  minValue: 0,
  maxValue: 1000,
  step: 1,
  isRange: false,
  isVertical: false,
  showLabel: false,
  isFloat: false
}

class View {
  scale: Scale;
  scaleFilling: ScaleFilling;
  runner1: Runner;
  runner2: Runner;
  parameters: Parameters;
  curMinValue: number;
  curMaxValue: number;
  observers: MakeObservableObject;
  graduation: Graduation;

  constructor(parameters = defaultParameters) {
    this.scale = new Scale(parameters.isVertical);
    this.runner1 = new Runner(parameters.isVertical);
    this.runner2 = new Runner(parameters.isVertical);
    this.scaleFilling = new ScaleFilling(parameters.isVertical);
    this.curMinValue = parameters.minValue;
    this.curMaxValue = parameters.maxValue;
    this.observers = new MakeObservableObject() 

    this.graduation = new Graduation(parameters);
    this.graduation.observers.addObserver(this.graduationObserver);
    this.parameters = parameters;
  }

  graduationObserver = (value: number) => {
    
    let offset = this.offsetValueConv(value);
    let roundOffset, roundValue;
    [roundOffset, roundValue] = this.roundOffsetButt(offset);

    if (this.parameters.isRange) {
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
    if (this.parameters.isRange) {
      return this.runner1.getPosition() - this.scale.getPosition() + this.runner1.getWidth()/2;
    }

    return 0;
  }

  getEnd = (): number => {
    return this.runner2.getPosition() - this.scale.getPosition() + this.runner2.getWidth()/2;
  }

  updateElems = (): void => {
    this.scaleFilling.init(this.parameters.isVertical);
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

    if (val <= this.parameters.minValue) {
      return this.parameters.minValue;
    } else if (val >= this.parameters.maxValue) {
      return this.parameters.maxValue;
    }

    return reminder < step/2 ? whole*step : (whole + 1)*step;
  }

  roundOffsetButt = (currOffset: number): Array<number> => {
    const currValue = this.parameters.minValue + (currOffset + this.runner2.getWidth()/2)*(this.parameters.maxValue - this.parameters.minValue)/this.scale.getDimension();
    let roundValue = this.round(currValue, this.parameters.step);

    if (this.parameters.isFloat) {
      roundValue = parseFloat(roundValue.toFixed(2));
    }

    const roundOffset = this.offsetValueConv(roundValue);
    return [roundOffset, roundValue];
  }

  offsetValueConv = (value: number): number => {
    return ((value - this.parameters.minValue)/(this.parameters.maxValue - this.parameters.minValue)*this.scale.getDimension() - this.runner2.getWidth()/2);
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
      roundValue = this.parameters.minValue;
    }

    const stepWidth = this.parameters.step*this.scale.getDimension()/(this.parameters.maxValue - this.parameters.minValue);
    const minOffset = stepWidth/1.5 > this.runner1.getWidth() ? stepWidth/1.5 : this.runner1.getWidth();

    if (newOffset > this.runner2.getPosition() - this.scale.getPosition() - minOffset) {
      newOffset = this.runner2.getPosition() - this.scale.getPosition() - minOffset;
    }

    return [newOffset, roundValue];
  }

  onMouseMove1 = (eventMm: MouseEvent): void => {
    let roundValue;
    let roundOffset;
    const coordinate = this.parameters.isVertical ? eventMm.clientY : eventMm.clientX;
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

    if (!this.parameters.isRange) {
      if (newOffset < -this.runner2.getWidth()/2) {
        newOffset = -this.runner2.getWidth()/2;
        roundValue = this.parameters.minValue;
      }
    }

    const stepWidth = this.parameters.step*this.scale.getDimension()/(this.parameters.maxValue - this.parameters.minValue);
    const minOffset = stepWidth/1.5 > this.runner1.getWidth() ? stepWidth/1.5 : this.runner1.getWidth();

    if (newOffset < this.runner1.getPosition() - this.scale.getPosition() + minOffset) {
      newOffset = this.runner1.getPosition() - this.scale.getPosition() + minOffset;
    }

    if (newOffset > this.scale.getDimension() - this.runner2.getWidth()/2) {
      newOffset = this.scale.getDimension() - this.runner2.getWidth()/2;
      roundValue = this.parameters.maxValue;
    }

    return [newOffset, roundValue];
  }

  onMouseMove2 = (eventMm: MouseEvent): void => {
    let roundValue;
    let roundOffset;
    const coordinate = this.parameters.isVertical ? eventMm.clientY : eventMm.clientX;
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

  /*
  butt1CloserCheck = (coordinate: number): boolean => {
    return (Math.abs(coordinate - this.button1.getPosition() - this.button1.getWidth()/2)
      < Math.abs(coordinate - this.button2.getPosition() - this.button2.getWidth()/2));
  }
  */
  runnerCheck = (offset: number): Runner => {
    if (Math.abs(offset - this.getStart()) < Math.abs(offset - this.getEnd())) {
      return this.runner1;
    }

    return this.runner2;
  }

  // Scale EventListeners------------------------------------------------------------------
  /*
  scaleOnclick = (event: MouseEvent): void => {
    if(this.parameters.isRange) {
      const coordinate = this.parameters.isVertical ? event.clientY : event.clientX

      if (this.butt1CloserCheck(coordinate)) {
        this.onMouseMove1(event);
      } else {
        this.onMouseMove2(event);
      }
    } else {
      this.onMouseMove2(event);
    }
  }
  */

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



    if (this.parameters.isRange) {
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
    this.scale.init(this.parameters.isVertical);
    this.scaleFilling.init(this.parameters.isVertical);
    this.runner1.init(this.parameters.isVertical);
    this.runner2.init(this.parameters.isVertical);    

    this.graduation.init(this.parameters);

    this.runner1.hide();

    if (this.parameters.showLabel) {
      this.runner1.showLabel();
      this.runner2.showLabel();
    } else {
      this.runner1.hideLabel();
      this.runner2.hideLabel();
    }

    if (this.parameters.isRange) {
      this.runner1.show();
    } else {
      this.runner1.hide();
    }

    this.runner1.setPosition(-this.runner1.getWidth()/2, this.parameters.minValue);
    this.runner2.setPosition(this.scale.getDimension() - this.runner2.getWidth()/2, this.parameters.maxValue);

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

    //this.scale.elem.onclick = this.scaleOnclick;

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
