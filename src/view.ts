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
  float: boolean;
  observers: MakeObservableObject;
    
  constructor(minValue = 0, maxValue = 1000, step = 1, isRange = false, isVertical = false, showLabel = false, float = false) {
    this.scale = new Scale();
    this.button1 = new Button();
    this.button2 = new Button();
    this.label1 = new Label();
    this.label2 = new Label();
    this.scaleFilling = new ScaleFilling();
    this.graduation = new Graduation();
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.curMinValue = minValue;
    this.curMaxValue = maxValue;
    this.step = step;
    this.isRange = isRange;
    this.isVertical = isVertical;
    this.showLabel = showLabel;
    this.float = float;
    this.observers = new MakeObservableObject()
    this.checkValues();
  }

  getStart = (): number => {
    if (this.isRange) {
      if (this.isVertical) {
        return this.button1.getTop() - this.scale.getTop() + this.button1.getWidth()/2;
      } 
          
      return this.button1.getLeft() - this.scale.getLeft() + this.button1.getWidth()/2;
    } 
        
    return 0;
  }

  getEnd = (): number => {
    if (this.isVertical) {
      return this.button2.getTop() - this.scale.getTop() + this.button2.getWidth()/2;
    }

    return this.button2.getLeft() - this.scale.getLeft() + this.button2.getWidth()/2;
  }

  updateElems = (): void => {
    if (this.isVertical) {
      this.scaleFilling.elem.style.top = this.getStart() + "px";
      this.scaleFilling.elem.style.left = "0";
      this.scaleFilling.elem.style.height = this.getEnd() - this.getStart() + "px";
      this.scaleFilling.elem.style.width = "100%";
    } else {
      this.scaleFilling.elem.style.left = this.getStart() + "px";
      this.scaleFilling.elem.style.top = "0";
      this.scaleFilling.elem.style.width = this.getEnd() - this.getStart() + "px";
      this.scaleFilling.elem.style.height = "100%";
    }

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
    let scaleMessure;
    if(this.isVertical) {
      scaleMessure = this.scale.getHeight();
    } else {
      scaleMessure = this.scale.getWidth();
    }

    const currValue = this.minValue + (currOffset + this.button2.getWidth()/2)*(this.maxValue - this.minValue)/scaleMessure;
    let roundValue = this.round(currValue, this.step);

    if (this.float) {
      roundValue = parseFloat(roundValue.toFixed(2));
    }
    
    if (roundValue < this.minValue) {
      roundValue = this.minValue;
    } else if (roundValue > this.maxValue) {
      roundValue = this.maxValue;
    }
    
    const roundOffset = (roundValue - this.minValue)*scaleMessure/(this.maxValue - this.minValue) - this.button2.getWidth()/2;
    return [roundOffset, roundValue];
  }

  offsetValueConv = (value: number): number => {
    if (this.isVertical) {
      return ((value - this.minValue)/(this.maxValue - this.minValue)*this.scale.getHeight() - this.button2.getWidth()/2);
    } 
        
    return ((value - this.minValue)/(this.maxValue - this.minValue)*this.scale.getWidth() - this.button2.getWidth()/2);
  }

  //Button1  Handlers-------------------------------------------------------------------------------
  butt1Move = (roundOffset: number, roundValue: number): void => {
    if (this.isVertical) {
      this.button1.elem.style.top = roundOffset + "px";
      this.label1.elem.style.top = roundOffset - this.label1.getHeight()/2 + this.button1.getWidth()/2 + "px";
    } else {
      this.button1.elem.style.left = roundOffset + "px";
      this.label1.elem.style.left = roundOffset - this.label1.getWidth()/2 + this.button1.getWidth()/2 + "px";
    }

    if (roundValue < this.minValue) {
      roundValue = this.minValue;
    }

    this.label1.elem.innerHTML = roundValue + "";
    this.curMinValue = roundValue;
    this.updateElems();
  }

  butt1OffsetCheck = (newOffset: number): Array<number> => {
    let roundValue;

    if (this.isVertical) {
      const stepWidth = this.step*this.scale.getHeight()/(this.maxValue - this.minValue);
      if (newOffset < -this.button2.getWidth()/2) {
        newOffset = -this.button2.getWidth()/2;
        roundValue = this.minValue;
      }

      if (stepWidth/1.5 > this.button2.getWidth()) {
        if (newOffset > this.button2.getTop() - this.scale.getTop() - stepWidth/1.5) {
          newOffset = this.button2.getTop() - this.scale.getTop() - stepWidth/1.5;
        }
      } else {
        if (newOffset > this.button2.getTop() - this.scale.getTop() - this.button2.getWidth()) {
          newOffset = this.button2.getTop() - this.scale.getTop() - this.button2.getWidth();
        }
      }
    } else {
      const stepWidth = this.step*this.scale.getWidth()/(this.maxValue - this.minValue);
      if (newOffset < -this.button1.getWidth()/2) {
        newOffset = -this.button1.getWidth()/2;
        roundValue = this.minValue;
      }

      if (stepWidth/1.5 > this.button1.getWidth()) {
        if (newOffset > this.button2.getLeft() - this.scale.getLeft() - stepWidth/1.5) {
          newOffset = this.button2.getLeft() - this.scale.getLeft() - stepWidth/1.5;
        }
      } else {
        if (newOffset > this.button2.getLeft() - this.scale.getLeft() - this.button2.getWidth()) {
          newOffset = this.button2.getLeft() - this.scale.getLeft() - this.button2.getWidth();
        }
      }
    }

    return [newOffset, roundValue];
  }
    
  onMouseMove1 = (eventMm: MouseEvent): void => {
    let newOffset;
    let roundValue;
    let roundOffset;
    if (this.isVertical) {
      newOffset = eventMm.clientY - this.scale.getTop() - this.button1.getWidth()/2;
    } else {
      newOffset = eventMm.clientX - this.scale.getLeft() - this.button1.getWidth()/2;
    } 

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
    if (this.isVertical) {
      this.button2.elem.style.top = roundOffset + "px";
      this.label2.elem.style.top = roundOffset - this.label2.getHeight()/2 + this.button2.getWidth()/2 + "px";
    } else {
      this.button2.elem.style.left = roundOffset + "px";
      this.label2.elem.style.left = roundOffset - this.label2.getWidth()/2 + this.button2.getWidth()/2 + "px";
    }

    if (roundValue < this.minValue) {
      roundValue = this.minValue;
    } else if (roundValue > this.maxValue) {
      roundValue = this.maxValue;
    }

    this.label2.elem.innerHTML = roundValue + "";
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

    if (this.isVertical) {
      const stepWidth = this.step*this.scale.getHeight()/(this.maxValue - this.minValue);
      if (newOffset > this.scale.getHeight() - this.button2.getWidth()/2) {
        newOffset = this.scale.getHeight() - this.button2.getWidth()/2;
        roundValue = this.maxValue;
      }
      
      if (stepWidth/1.5 > this.button2.getWidth()) {
        if (newOffset < this.button1.getTop() - this.scale.getTop() + stepWidth/1.5) {
          newOffset = this.button1.getTop() - this.scale.getTop() + stepWidth/1.5;
        }
      } else {
        if (newOffset < this.button1.getTop() - this.scale.getTop() + this.button2.getWidth()) {
          newOffset = this.button1.getTop() - this.scale.getTop() + this.button2.getWidth();
        }
      }
    } else {
      const stepWidth = this.step*this.scale.getWidth()/(this.maxValue - this.minValue);

      if (newOffset > this.scale.getWidth() - this.button2.getWidth()/2) {
        newOffset = this.scale.getWidth() - this.button2.getWidth()/2;
        roundValue = this.maxValue;
      }

      if (stepWidth/1.5 > this.button2.getWidth()) {
        if (newOffset < this.button1.getLeft() - this.scale.getLeft() + stepWidth/1.5) {
          newOffset = this.button1.getLeft() - this.scale.getLeft() + stepWidth/1.5;
        }
      } else {
        if (newOffset < this.button1.getLeft() - this.scale.getLeft() + this.button2.getWidth()) {
          newOffset = this.button1.getLeft() - this.scale.getLeft() + this.button2.getWidth();
        }
      }
    }

    return [newOffset, roundValue];
  }

  onMouseMove2 = (eventMm: MouseEvent): void => {
    let newOffset;
    let roundValue;
    let roundOffset;
    if (this.isVertical) {
      newOffset = eventMm.clientY - this.scale.getTop() - this.button2.getWidth()/2;
    } else {
      newOffset = eventMm.clientX - this.scale.getLeft() - this.button2.getWidth()/2;
    }

    [roundOffset, roundValue] = this.butt2OffsetCheck(newOffset);
    if (!roundValue) {
        [roundOffset, roundValue] = this.roundOffsetButt(roundOffset);
    }

    this.butt2Move(roundOffset, roundValue);
  }

  onMouseUp2 = (eventMu: MouseEvent): void => {
    document.removeEventListener("mouseup", this.onMouseUp2);
    document.removeEventListener("mousemove", this.onMouseMove2);
  }
    
  // Scale EventListeners------------------------------------------------------------------
  scaleOnclick = (event: MouseEvent): void => {
    if(this.isRange) {
      let butt1Closer;
      if (this.isVertical) {
        butt1Closer = Math.abs(event.clientY - this.button1.getTop() - this.button1.getWidth()/2) 
        < Math.abs(event.clientY - this.button2.getTop() - this.button2.getWidth()/2);
      } else {
        butt1Closer = Math.abs(event.clientX - this.button1.getLeft() - this.button1.getWidth()/2)
        < Math.abs(event.clientX - this.button2.getLeft() - this.button2.getWidth()/2);
      }

      if (butt1Closer) {
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
    if (this.isVertical) {
      const markX = (currValue - this.minValue)/(this.maxValue - this.minValue)*this.scale.getHeight();
      [roundOffset, roundValue] = this.roundOffsetButt(markX - this.button2.getWidth()/2);
      if (this.isRange) {
        if (Math.abs(markX + this.scale.getTop() - this.button1.getTop() - this.button2.getWidth()/2)
          < Math.abs(markX + this.scale.getTop() - this.button2.getTop() - this.button2.getWidth()/2)) {
          this.butt1Move(roundOffset, roundValue);
        } else {
          this.butt2Move(roundOffset, roundValue);
        }
      } else {
        this.butt2Move(roundOffset, roundValue);
      }
    } else {
      const markX = (currValue - this.minValue)/(this.maxValue - this.minValue)*this.scale.getWidth();
      [roundOffset, roundValue] = this.roundOffsetButt(markX - this.button2.getWidth()/2);
      if (this.isRange) {
        if (Math.abs(markX + this.scale.getLeft() - this.button1.getLeft() - this.button2.getWidth()/2)
          < Math.abs(markX + this.scale.getLeft() - this.button2.getLeft() - this.button2.getWidth()/2)) {
          this.butt1Move(roundOffset, roundValue);
        } else {
          this.butt2Move(roundOffset, roundValue);
        }
      } else {
        this.butt2Move(roundOffset, roundValue);
      }
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
    if (this.isVertical) {
      const roundOffset = this.scale.getHeight() - this.button2.getWidth()/2;
      const roundValue = this.maxValue;
      this.butt2Move(roundOffset, roundValue);
    } else {
      const roundOffset = this.scale.getWidth() - this.button2.getWidth()/2;
      const roundValue = this.maxValue;
      this.butt2Move(roundOffset, roundValue); 
    }
  }

  mark2Onclick = (event: MouseEvent): void => {
    const val = this.float ? parseFloat(this.graduation.mark2.innerHTML) : parseInt(this.graduation.mark2.innerHTML);
    this.interMarkHandler(val);
  }

  mark3Onclick = (event: MouseEvent): void => {
    const val = this.float ? parseFloat(this.graduation.mark3.innerHTML) : parseInt(this.graduation.mark3.innerHTML);
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
    this.button1.elem.style.display = "none";
    this.label1.elem.style.display = "none";
    this.graduation.init(this.minValue, this.maxValue, this.isVertical, this.float);
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

    if (this.isVertical) {
      this.scale.elem.classList.add("slider__scale_vertical");
      this.scaleFilling.elem.classList.add("slider__scale-filling_vertical");
      this.graduation.gradElem.classList.add("slider__graduation_vertical");
      this.graduation.gradElem.style.height = this.scale.getHeight() +"px";
      this.button1.elem.classList.add("slider__button_vertical");
      this.button2.elem.classList.add("slider__button_vertical");
      this.label1.elem.classList.add("slider__button-label_vertical");
      this.label2.elem.classList.add("slider__button-label_vertical");

      this.button1.elem.style.top = -this.button1.getWidth()/2 + "px";
      this.button1.elem.style.left = "50%";
      this.button2.elem.style.top = this.scale.getHeight() - this.button2.getWidth()/2 + "px";
      this.button2.elem.style.left = "50%";
      this.label1.elem.innerHTML = this.minValue + "";
      this.label2.elem.innerHTML = this.maxValue + "";
      this.label1.elem.style.top = this.getStart() - this.label1.getHeight()/2 + "px";
      this.label1.elem.style.left = "50%";
      this.label2.elem.style.top = this.getEnd() - this.label2.getHeight()/2 + "px";
      this.label2.elem.style.left = "50%";
    } else {
      this.scale.elem.classList.remove("slider__scale_vertical");
      this.scaleFilling.elem.classList.remove("slider__scale-filling_vertical");
      this.graduation.gradElem.classList.remove("slider__graduation_vertical");
      this.graduation.gradElem.style.height = 20 +"px";
      this.button1.elem.classList.remove("slider__button_vertical");
      this.button2.elem.classList.remove("slider__button_vertical");
      this.label1.elem.classList.remove("slider__button-label_vertical");
      this.label2.elem.classList.remove("slider__button-label_vertical");

      this.button1.elem.style.left = -this.button1.getWidth()/2 + "px";
      this.button1.elem.style.top = "50%";
      this.button2.elem.style.left = this.scale.getWidth() - this.button2.getWidth()/2 + "px";
      this.button2.elem.style.top = "50%"
      this.label1.elem.innerHTML = this.minValue + "";
      this.label2.elem.innerHTML = this.maxValue + "";
      this.label1.elem.style.left = this.getStart() - this.label1.getWidth()/2 + "px";
      this.label1.elem.style.top = "50%";
      this.label2.elem.style.left = this.getEnd() - this.label2.getWidth()/2 + "px";
      this.label2.elem.style.top = "50%";
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
