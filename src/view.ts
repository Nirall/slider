import MakeObservableObject from "./assets/MakeObservableObject";
import createElem from "./assets/createElem";
import Scale from "./assets/Scale";
import Graduation from "./assets/Graduation";
import Button from "./assets/Button";
import Label from "./assets/Label";
import ScaleFilling from "./assets/ScaleFilling";

class View {
  [index: string]: number|boolean|Scale|Graduation|ScaleFilling|Button|Label|MakeObservableObject|Function;
  scale: Scale;
  graduation: Graduation;
  scaleFilling: ScaleFilling;
  button1: Button;
  button2: Button;
  label1: Label;
  label2: Label;
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

  constructor(minValue = 0, maxValue = 1000, step = 1, isRange = false, isVertical = false, showLabel = false, isFloat = false) {
    this.scale = new Scale(isVertical);
    this.button1 = new Button(isVertical);
    this.button2 = new Button(isVertical);
    this.label1 = new Label(isVertical);
    this.label2 = new Label(isVertical);
    this.scaleFilling = new ScaleFilling(isVertical);
    this.graduation = new Graduation();
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
    this.checkValues();
  }

  getStart = (): number => {
    if (this.isRange) {
      return this.button1.getPosition() - this.scale.getPosition() + this.button1.getWidth()/2;
    }

    return 0;
  }

  getEnd = (): number => {
    return this.button2.getPosition() - this.scale.getPosition() + this.button2.getWidth()/2;
  }

  updateElems = (): void => {
    this.scaleFilling.init(this.isVertical);
    this.scaleFilling.setPosition(this.getStart());
    this.scaleFilling.setDimension(this.getEnd() - this.getStart());

    if (!this.isRange) {
      this.curMinValue = this.minValue;
    }

    this.observers.notifyObservers();
  }

  round = (val: number, step: number): number => {
    const whole = Math.floor(val/step);
    const reminder = val % step;
    if (val < 0) {
      return Math.abs(reminder) > step/2 ? whole*step : (whole + 1)*step;
    }

    return reminder < step/2 ? whole*step : (whole + 1)*step;
  }

  roundOffsetButt = (currOffset: number): Array<number> => {
    const currValue = this.minValue + (currOffset + this.button2.getWidth()/2)*(this.maxValue - this.minValue)/this.scale.getDimension();
    let roundValue = this.round(currValue, this.step);

    if (this.isFloat) {
      roundValue = parseFloat(roundValue.toFixed(2));
    }

    if (roundValue < this.minValue) {
      roundValue = this.minValue;
    } else if (roundValue > this.maxValue) {
      roundValue = this.maxValue;
    }

    const roundOffset = this.offsetValueConv(roundValue);
    return [roundOffset, roundValue];
  }

  offsetValueConv = (value: number): number => {
    return ((value - this.minValue)/(this.maxValue - this.minValue)*this.scale.getDimension() - this.button2.getWidth()/2);
  }

  //Button1  Handlers-------------------------------------------------------------------------------
  butt1Move = (roundOffset: number, roundValue: number): void => {
    this.button1.setPosition(roundOffset);
    this.label1.setPosition(roundOffset + this.button1.getWidth()/2, roundValue);

    if (roundValue < this.minValue) {
      roundValue = this.minValue;
    }

    this.curMinValue = roundValue;
    this.updateElems();
  }

  butt1OffsetCheck = (newOffset: number): Array<number> => {
    let roundValue;

    if (newOffset < -this.button1.getWidth()/2) {
      newOffset = -this.button1.getWidth()/2;
      roundValue = this.minValue;
    }

    const stepWidth = this.step*this.scale.getDimension()/(this.maxValue - this.minValue);
    const minOffset = stepWidth/1.5 > this.button1.getWidth() ? stepWidth/1.5 : this.button1.getWidth();

    if (newOffset > this.button2.getPosition() - this.scale.getPosition() - minOffset) {
      newOffset = this.button2.getPosition() - this.scale.getPosition() - minOffset;
    }

    return [newOffset, roundValue];
  }

  onMouseMove1 = (eventMm: MouseEvent): void => {
    let roundValue;
    let roundOffset;
    const coordinate = this.isVertical ? eventMm.clientY : eventMm.clientX;
    const newOffset = coordinate - this.scale.getPosition() - this.button2.getWidth()/2;

    [roundOffset, roundValue] = this.butt1OffsetCheck(newOffset);

    if (!roundValue) {
        [roundOffset, roundValue] = this.roundOffsetButt(roundOffset);
    }

    this.butt1Move(roundOffset, roundValue);
  }

  onMouseUp1 = (eventMu: MouseEvent): void => {
    document.removeEventListener("mouseup", this.onMouseUp1);
    document.removeEventListener("mousemove", this.onMouseMove1);
  }

  //Button2  Handlers----------------------------------------------------------------
  butt2Move = (roundOffset: number, roundValue: number): void => {
    this.button2.setPosition(roundOffset);
    this.label2.setPosition(roundOffset + this.button2.getWidth()/2, roundValue);

    if (roundValue < this.minValue) {
      roundValue = this.minValue;
    } else if (roundValue > this.maxValue) {
      roundValue = this.maxValue;
    }

    this.curMaxValue = roundValue;
    this.updateElems();
  }

  butt2OffsetCheck = (newOffset: number): Array<number> => {
    let roundValue;

    if (!this.isRange) {
      if (newOffset < -this.button2.getWidth()/2) {
        newOffset = -this.button2.getWidth()/2;
        roundValue = this.minValue;
      }
    }

    if (newOffset > this.scale.getDimension() - this.button2.getWidth()/2) {
      newOffset = this.scale.getDimension() - this.button2.getWidth()/2;
      roundValue = this.maxValue;
    }

    const stepWidth = this.step*this.scale.getDimension()/(this.maxValue - this.minValue);
    const minOffset = stepWidth/1.5 > this.button1.getWidth() ? stepWidth/1.5 : this.button1.getWidth();

    if (newOffset < this.button1.getPosition() - this.scale.getPosition() + minOffset) {
      newOffset = this.button1.getPosition() - this.scale.getPosition() + minOffset;
    }

    return [newOffset, roundValue];
  }

  onMouseMove2 = (eventMm: MouseEvent): void => {
    let roundValue;
    let roundOffset;
    const coordinate = this.isVertical ? eventMm.clientY : eventMm.clientX;
    const newOffset = coordinate - this.scale.getPosition() - this.button2.getWidth()/2;

    [roundOffset, roundValue] = this.butt2OffsetCheck(newOffset);

    if (!roundValue) {
      [roundOffset, roundValue] = this.roundOffsetButt(roundOffset);
    }

    this.butt2Move(roundOffset, roundValue);
  }

  onMouseUp2 = (eventMu: MouseEvent): void => {
    document.removeEventListener('mouseup', this.onMouseUp2);
    document.removeEventListener('mousemove', this.onMouseMove2);
  }

  butt1CloserCheck = (coordinate: number): boolean => {
    return Math.abs(coordinate - this.button1.getPosition()) < Math.abs(coordinate - this.button2.getPosition());
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

  // Graduation EventListeners-------------------------------------------------------------------
  interMarkHandler = (currValue: number): void => {
    let roundOffset;
    let roundValue;

    const markOffset = (currValue - this.minValue)/(this.maxValue - this.minValue)*this.scale.getDimension();
    [roundOffset, roundValue] = this.roundOffsetButt(markOffset - this.button2.getWidth()/2);

    if(this.isRange) {
      const coordinate = markOffset + this.scale.getPosition();

      if (this.butt1CloserCheck(coordinate)) {
        this.butt1Move(roundOffset, roundValue);
      } else {
        this.butt2Move(roundOffset, roundValue);
      }
    } else {
      this.butt2Move(roundOffset, roundValue);
    }
  }

  mark1Onclick = (event: MouseEvent): void => {
    const roundOffset = -this.button2.getWidth()/2;
    const roundValue = this.minValue;

    if (!this.isRange) {
      this.butt2Move(roundOffset, roundValue);
    } else {
      this.butt1Move(roundOffset, roundValue);
    }
  }

  mark4Onclick = (event: MouseEvent): void => {
    const roundOffset = this.scale.getDimension() - this.button2.getWidth()/2;
    this.butt2Move(roundOffset, this.maxValue);
  }

  mark2Onclick = (event: MouseEvent): void => {
    const val = this.isFloat ? parseFloat(this.graduation.mark2.innerHTML) : parseInt(this.graduation.mark2.innerHTML);
    this.interMarkHandler(val);
  }

  mark3Onclick = (event: MouseEvent): void => {
    const val = this.isFloat ? parseFloat(this.graduation.mark3.innerHTML) : parseInt(this.graduation.mark3.innerHTML);
    this.interMarkHandler(val);
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
      console.error("Step is setted to the max");
    }
  }

  init = (): void => {
    this.scale.init(this.isVertical);
    this.scaleFilling.init(this.isVertical);
    this.graduation.init(this.minValue, this.maxValue, this.isVertical, this.isFloat);
    this.button1.init(this.isVertical);
    this.button2.init(this.isVertical);
    this.label1.init(this.isVertical);
    this.label2.init(this.isVertical);

    this.button1.elem.style.display = "none";
    this.label1.elem.style.display = "none";
    this.checkValues();

    if (this.showLabel) {
      this.label1.elem.style.display = "block";
      this.label2.elem.style.display = "block";
    } else {
      this.label1.elem.style.display = "none";
      this.label2.elem.style.display = "none";
    }

    if (this.isRange) {
      this.button1.elem.style.display = "block";
    } else {
      this.button1.elem.style.display = "none";
      this.label1.elem.style.display = "none";
    }

    this.button1.setPosition(-this.button1.getWidth()/2);
    this.button2.setPosition(this.scale.getDimension() - this.button2.getWidth()/2);
    this.label1.setPosition(this.getStart(), this.minValue);
    this.label2.setPosition(this.getEnd(), this.maxValue);

    if (this.isVertical) {
      this.graduation.gradElem.style.height = this.scale.getDimension() +"px";
    } else {
      this.graduation.gradElem.style.height = 20 +"px";
    }

    this.updateElems();
  }

  append = (entry: HTMLElement): void => {
    entry.appendChild(this.scale.elem).appendChild(this.scaleFilling.elem);
    entry.appendChild(this.button1.elem);
    entry.appendChild(this.label1.elem);
    entry.appendChild(this.graduation.gradElem);
    entry.appendChild(this.button2.elem);
    entry.appendChild(this.label2.elem);

    this.scale.elem.onclick = this.scaleOnclick;
    this.graduation.mark1.onclick = this.mark1Onclick;
    this.graduation.mark2.onclick = this.mark2Onclick;
    this.graduation.mark3.onclick = this.mark3Onclick;
    this.graduation.mark4.onclick = this.mark4Onclick;

    this.button1.elem.onmousedown = (eventMd: MouseEvent) => {
      eventMd.preventDefault();
      document.addEventListener("mousemove", this.onMouseMove1);
      document.addEventListener("mouseup", this.onMouseUp1);
    }

    this.button2.elem.onmousedown = (eventMd: MouseEvent) => {
      eventMd.preventDefault();
      document.addEventListener("mousemove", this.onMouseMove2);
      document.addEventListener("mouseup", this.onMouseUp2);
    }
  }
}

export {createElem, Scale, Label, Button, ScaleFilling, View, Graduation};
