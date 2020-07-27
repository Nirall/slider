import {MakeObservableObject} from "./MOO";

// Elements factory
function createElem(className: string) :HTMLElement {
    const elem = document.createElement("div");
    elem.classList.add(className);
    return elem;
}

class Scale {
    elem: HTMLElement;
    constructor() {
        this.elem = createElem("slider__scale");
        this.elem.ondragstart = () => false;
    }
    getLeft() {
        return this.elem.getBoundingClientRect().left;
    }
    getWidth() {
        return this.elem.getBoundingClientRect().width;
    }
    getHeight() {
        return this.elem.getBoundingClientRect().height;
    }
    getTop() {
        return this.elem.getBoundingClientRect().top;
    }
}

class Graduation {
    gradElem: HTMLElement;
    mark1: HTMLElement;
    mark2: HTMLElement;
    mark3: HTMLElement;
    mark4: HTMLElement;
    constructor() {
        this.gradElem = createElem("slider__graduation");
        this.mark1 = createElem("slider__graduation__mark");
        this.mark2 = createElem("slider__graduation__mark");
        this.mark3 = createElem("slider__graduation__mark");
        this.mark4 = createElem("slider__graduation__mark");
        
        this.gradElem.appendChild(this.mark1);
        this.gradElem.appendChild(this.mark2);
        this.gradElem.appendChild(this.mark3);
        this.gradElem.appendChild(this.mark4);

        this.init = this.init.bind(this);
    }
    init(minValue: number, maxValue: number, vertical: boolean) {
        this.mark1.innerHTML = minValue + "";
        this.mark2.innerHTML = minValue + Math.round((maxValue - minValue)/3) + "";
        this.mark3.innerHTML = minValue + Math.round((maxValue - minValue)*2/3) + "";
        this.mark4.innerHTML = maxValue + "";

        if (!vertical) {
            this.mark1.style.marginLeft = -15 + "px";
            this.mark1.style.marginTop = "0";
            this.mark4.style.marginRight = -15 + "px";
            this.mark4.style.marginTop = "0";
        } else {
            this.mark1.style.marginTop = -9  + "px";
            this.mark1.style.marginLeft = "0";
            this.mark4.style.marginBottom = -9 + "px";
            this.mark4.style.marginLeft = "0";
        }
    }
}

class Button {
    elem: HTMLElement;
    constructor() {
        this.elem = createElem("slider__button");
        this.elem.ondragstart = () => false;
    }
    getLeft() {
        return this.elem.getBoundingClientRect().left;
    }
    getWidth() {
        return this.elem.getBoundingClientRect().width;
    }
    getTop() {
        return this.elem.getBoundingClientRect().top;
    }
}

class Label {
    elem: HTMLElement;
    constructor() {
        this.elem = createElem("slider__button__label");
        this.elem.ondragstart = () => false;
    }
    getWidth() {
        return this.elem.getBoundingClientRect().width;
    }
    getHeight() {
        return this.elem.getBoundingClientRect().height;
    }
}

class ScaleFilling {
    elem: HTMLElement;
    constructor() {
        this.elem = createElem("slider__scale__filling");
        this.elem.ondragstart = () => false;
    }
    
}

class View {
    [index: string]: number|boolean|Scale|Graduation|ScaleFilling|Button|Label|MakeObservableObject|Function;
    scale: Scale;
    graduation: Graduation;
    scaleFilling: ScaleFilling;
    button1: Button;
    button2: Button;
    label1: Label;
    label2: Label;
    range: boolean;
    vertical: boolean;
    showLabel: boolean;
    minValue: number;
    maxValue: number;
    curMinValue: number;
    curMaxValue: number;
    step: number;
    observers: MakeObservableObject;

    constructor(minValue: number = 0, maxValue: number = 1000, step: number = 1,
        range: boolean = false, vertical: boolean = false, showLabel: boolean = false) {

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
        this.range = range;
        this.vertical = vertical;
        this.showLabel = showLabel;
        this.observers = new MakeObservableObject()
        this.checkValues();
        
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
        this.scale.elem.onclick = this.scaleOnclick;
        this.graduation.mark1.onclick = this.mark1Onclick;
        this.graduation.mark2.onclick = this.mark2Onclick;
        this.graduation.mark3.onclick = this.mark3Onclick;
        this.graduation.mark4.onclick = this.mark4Onclick;
        
        this.getStart = this.getStart.bind(this);
        this.getEnd = this.getEnd.bind(this);
        this.updateElems = this.updateElems.bind(this);
        this.round = this.round.bind(this);
        this.roundOffsetButt = this.roundOffsetButt.bind(this);
        this.checkValues = this.checkValues.bind(this);
        this.offsetValueConv = this.offsetValueConv.bind(this);

        this.butt1Move = this.butt1Move.bind(this);
        this.onMouseMove1 = this.onMouseMove1.bind(this);
        this.onMouseUp1 = this.onMouseUp1.bind(this);

        this.butt2Move = this.butt2Move.bind(this);
        this.onMouseMove2 = this.onMouseMove2.bind(this);
        this.onMouseUp2 = this.onMouseUp2.bind(this);

        this.scaleOnclick = this.scaleOnclick.bind(this);

        this.interMarkHandler = this.interMarkHandler.bind(this);
        this.mark1Onclick = this.mark1Onclick.bind(this);
        this.mark2Onclick = this.mark2Onclick.bind(this);
        this.mark3Onclick = this.mark3Onclick.bind(this);
        this.mark4Onclick = this.mark4Onclick.bind(this);
    }

    getStart() {
        if(!this.vertical) {
            return this.button1.getLeft() - this.scale.getLeft() + this.button1.getWidth()/2;
        } else {
            return this.button1.getTop() - this.scale.getTop() + this.button1.getWidth()/2;
        }
    }

    getEnd() {
        if(!this.vertical) {
            return this.button2.getLeft() - this.scale.getLeft() + this.button2.getWidth()/2;
        } else {
            return this.button2.getTop() - this.scale.getTop() + this.button2.getWidth()/2;
        } 
    }

    updateElems() {
        if (this.vertical) {
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
        this.observers.notifyObservers();
    }

    round(val: number, step: number): number {
        let whole = Math.floor(val/step);
        let reminder = val % step;
        return reminder < step/2 ? whole*step : (whole + 1)*step;
    }

    roundOffsetButt(currOffset: number) {
        let currValue = 0;
        let scaleMessure = 0;
        
        if(this.vertical) {
            currValue = this.minValue + (currOffset + this.button1.getWidth()/2)*(this.maxValue - this.minValue)/this.scale.getHeight();
            scaleMessure = this.scale.getHeight();
        } else {
            currValue = this.minValue + (currOffset + this.button1.getWidth()/2)*(this.maxValue - this.minValue)/this.scale.getWidth();
            scaleMessure = this.scale.getWidth();
        }
        
        let roundValue = this.round(currValue, this.step);
        if (roundValue < this.minValue) {
            roundValue = this.minValue;
        } else if (roundValue > this.maxValue) {
            roundValue = this.maxValue;
        }
        
        let roundOffset = (roundValue - this.minValue)*scaleMessure/(this.maxValue - this.minValue) - this.button1.getWidth()/2;
        return [roundOffset, roundValue];
    }
    offsetValueConv(value: number) {
        if (this.vertical) {
            return ((value - this.minValue)/(this.maxValue - this.minValue)*this.scale.getHeight());
        } else {
            return ((value - this.minValue)/(this.maxValue - this.minValue)*this.scale.getWidth());
        }
    }

    //Button1  Handlers-------------------------------------------------------------------------------
    butt1Move(roundOffset: number, roundValue: number) {
        if (this.vertical) {
            this.button1.elem.style.top = roundOffset + "px";
            this.label1.elem.style.top = roundOffset - this.label1.getHeight()/2 + this.button1.getWidth()/2 + "px";
        } else {
            this.button1.elem.style.left = roundOffset + "px";
            this.label1.elem.style.left = roundOffset - this.label1.getWidth()/2 + this.button1.getWidth()/2 + "px";
        }
        this.label1.elem.innerHTML = roundValue + "";
        this.curMinValue = roundValue;
        this.updateElems();
    }

    onMouseMove1(eventMm: MouseEvent) {
        let roundValue = 0;
        let roundOffset = 0;
        
        if (this.vertical) {
            let stepWidth = this.step*this.scale.getHeight()/(this.maxValue - this.minValue);
            let newOffset = eventMm.clientY - this.scale.getTop() - this.button1.getWidth()/2;
            
            if (newOffset < -this.button1.getWidth()/2) {
                newOffset = -this.button1.getWidth()/2;
                roundValue = this.minValue;
                roundOffset = newOffset;
            }
            if (!this.range) {
                if (newOffset > this.scale.getHeight() - this.button1.getWidth()/2) {
                    newOffset = this.scale.getHeight() - this.button1.getWidth()/2;
                    roundValue = this.maxValue;
                    roundOffset = newOffset;
                }
            } else {
                if (stepWidth/1.5 > this.button1.getWidth()) {
                    if (newOffset > this.button2.getTop() - this.scale.getTop() - stepWidth/1.5) {
                        newOffset = this.button2.getTop() - this.scale.getTop() - stepWidth/1.5;
                    }
                } else {
                    if (newOffset > this.button2.getTop() - this.scale.getTop() - this.button1.getWidth()) {
                        newOffset = this.button2.getTop() - this.scale.getTop() - this.button1.getWidth();
                    }
                }
            }
            if (!roundValue) {
                [roundOffset, roundValue] = this.roundOffsetButt(newOffset);
            }
        } else {
            let stepWidth = this.step*this.scale.getWidth()/(this.maxValue - this.minValue);
            let newOffset = eventMm.clientX - this.scale.getLeft() - this.button1.getWidth()/2;
            
            if (newOffset < -this.button1.getWidth()/2) {
                newOffset = -this.button1.getWidth()/2;
                roundValue = this.minValue;
                roundOffset = newOffset;
            }
            if (!this.range) {
                if (newOffset > this.scale.getWidth() - this.button1.getWidth()/2) {
                    newOffset = this.scale.getWidth() - this.button1.getWidth()/2;
                    roundValue = this.maxValue;
                    roundOffset = newOffset;
                }
            } else {
                if (stepWidth/1.5 > this.button1.getWidth()) {
                    if (newOffset > this.button2.getLeft() - this.scale.getLeft() - stepWidth/1.5) {
                        newOffset = this.button2.getLeft() - this.scale.getLeft() - stepWidth/1.5;
                    }
                } else {
                    if (newOffset > this.button2.getLeft() - this.scale.getLeft() - this.button1.getWidth()) {
                        newOffset = this.button2.getLeft() - this.scale.getLeft() - this.button1.getWidth();
                    }
                }
            }
            if (!roundValue) {
                [roundOffset, roundValue] = this.roundOffsetButt(newOffset);
            }
        }

        this.butt1Move(roundOffset, roundValue);
    }

    onMouseUp1(eventMu: MouseEvent) {
        document.removeEventListener("mouseup", this.onMouseUp1);
        document.removeEventListener("mousemove", this.onMouseMove1);
    }

    //Button2  Handlers----------------------------------------------------------------
    butt2Move(roundOffset: number, roundValue: number) {
        if (this.vertical) {
            this.button2.elem.style.top = roundOffset + "px";
            this.label2.elem.style.top = roundOffset - this.label2.getHeight()/2 + this.button2.getWidth()/2 + "px";
            this.label2.elem.innerHTML = roundValue + "";
        } else {
            this.button2.elem.style.left = roundOffset + "px";
            this.label2.elem.style.left = roundOffset - this.label2.getWidth()/2 + this.button2.getWidth()/2 + "px";
            this.label2.elem.innerHTML = roundValue + "";
        }
        this.curMaxValue = roundValue;
        this.updateElems(); 
    }

    onMouseMove2(eventMm: MouseEvent) {
        let roundValue = 0;
        let roundOffset = 0;

        if (this.vertical) {
            let stepWidth = this.step*this.scale.getHeight()/(this.maxValue - this.minValue);
            let newOffset = eventMm.clientY - this.scale.getTop() - this.button2.getWidth()/2;

            if (newOffset > this.scale.getHeight() - this.button2.getWidth()/2) {
                newOffset = this.scale.getHeight() - this.button2.getWidth()/2;
                roundValue = this.maxValue;
                roundOffset = newOffset;
            }
            if (stepWidth/1.5 > this.button1.getWidth()) {
                if (newOffset < this.button1.getTop() - this.scale.getTop() + stepWidth/1.5) {
                    newOffset = this.button1.getTop() - this.scale.getTop() + stepWidth/1.5;
                }
            } else {
                if (newOffset < this.button1.getTop() - this.scale.getTop() + this.button1.getWidth()) {
                    newOffset = this.button1.getTop() - this.scale.getTop() + this.button1.getWidth();
                }
            }
            
            if (!roundValue) {
                [roundOffset, roundValue] = this.roundOffsetButt(newOffset);
            }
        } else {
            let stepWidth = this.step*this.scale.getWidth()/(this.maxValue - this.minValue);
            let newOffset = eventMm.clientX - this.scale.getLeft() - this.button2.getWidth()/2;
            
            if (newOffset > this.scale.getWidth() - this.button2.getWidth()/2) {
                newOffset = this.scale.getWidth() - this.button2.getWidth()/2;
                roundValue = this.maxValue;
                roundOffset = newOffset;
            }
            if (stepWidth/1.5 > this.button1.getWidth()) {
                if (newOffset < this.button1.getLeft() - this.scale.getLeft() + stepWidth/1.5) {
                    newOffset = this.button1.getLeft() - this.scale.getLeft() + stepWidth/1.5;
                }
            } else {
                if (newOffset < this.button1.getLeft() - this.scale.getLeft() + this.button1.getWidth()) {
                    newOffset = this.button1.getLeft() - this.scale.getLeft() + this.button1.getWidth();
                }
            }
            if (!roundValue) {
                [roundOffset, roundValue] = this.roundOffsetButt(newOffset);
            }
        }

        this.butt2Move(roundOffset, roundValue);
    }

    onMouseUp2(eventMu: MouseEvent) {
        document.removeEventListener("mouseup", this.onMouseUp2);
        document.removeEventListener("mousemove", this.onMouseMove2);
    }

    //Scale EventListeners------------------------------------------------------------------
    scaleOnclick = (event: MouseEvent) => {
        if (this.vertical) {
            if(this.range) {
                if (Math.abs(event.clientY - this.button1.getTop() - this.button1.getWidth()/2) <
                    Math.abs(event.clientY - this.button2.getTop() - this.button2.getWidth()/2)) {
                        this.onMouseMove1(event);
                } else {
                    this.onMouseMove2(event);
                }
            } else {
                this.onMouseMove1(event);
            }
        } else {
            if(this.range) {
                if (Math.abs(event.clientX - this.button1.getLeft() - this.button1.getWidth()/2) <
                    Math.abs(event.clientX - this.button2.getLeft() - this.button2.getWidth()/2)) {
                        this.onMouseMove1(event);
                } else {
                    this.onMouseMove2(event);
                }
            } else {
                this.onMouseMove1(event);
            }
        }
    }

    //Graduation EventListeners-------------------------------------------------------------------
    interMarkHandler (currValue: number) {
        let roundOffset = 0;
        let roundValue = 0;

        if (this.vertical) {
            let markX = (currValue - this.minValue)/(this.maxValue - this.minValue)*this.scale.getHeight();
            [roundOffset, roundValue] = this.roundOffsetButt(markX - this.button1.getWidth()/2);
            if (this.range) {
                if (Math.abs(markX + this.scale.getTop() - this.button1.getTop() - this.button1.getWidth()/2) <
                Math.abs(markX + this.scale.getTop() - this.button2.getTop() - this.button2.getWidth()/2))
                {
                    this.butt1Move(roundOffset, roundValue);
                } else {
                    this.butt2Move(roundOffset, roundValue);
                }
            } else {
                this.butt1Move(roundOffset, roundValue);
            }
        } else {
            let markX = (currValue - this.minValue)/(this.maxValue - this.minValue)*this.scale.getWidth();
            [roundOffset, roundValue] = this.roundOffsetButt(markX - this.button1.getWidth()/2);
            if (this.range) {
                if (Math.abs(markX + this.scale.getLeft() - this.button1.getLeft() - this.button1.getWidth()/2) <
                Math.abs(markX + this.scale.getLeft() - this.button2.getLeft() - this.button2.getWidth()/2))
                {
                    this.butt1Move(roundOffset, roundValue);
                } else {
                    this.butt2Move(roundOffset, roundValue);
                }
            } else {
                this.butt1Move(roundOffset, roundValue);
            }
        }
    }

    mark1Onclick = (event: MouseEvent) => {
        let roundOffset = -this.button1.getWidth()/2;
        let roundValue = this.minValue;
        this.butt1Move(roundOffset, roundValue);
    }

    mark4Onclick = (event: MouseEvent) => {
        if (this.vertical) {
            let roundOffset = this.scale.getHeight() - this.button1.getWidth()/2;
            let roundValue = this.maxValue;
            if (this.range) {
                this.butt2Move(roundOffset, roundValue); 
            } else {
                this.butt1Move(roundOffset, roundValue);
            }   
        } else {
            let roundOffset = this.scale.getWidth() - this.button1.getWidth()/2;
            let roundValue = this.maxValue;
            if (this.range) {
                this.butt2Move(roundOffset, roundValue); 
            } else {
                this.butt1Move(roundOffset, roundValue);
            }
        }
    }

    mark2Onclick = (event: MouseEvent) => {
        this.interMarkHandler(parseInt(this.graduation.mark2.innerHTML));
    }

    mark3Onclick = (event: MouseEvent) => {
        this.interMarkHandler(parseInt(this.graduation.mark3.innerHTML));
    }

    init() {
        this.button2.elem.style.display = "none";
        this.label2.elem.style.display = "none";
        this.graduation.init(this.minValue, this.maxValue, this.vertical);
        this.checkValues();

        if (this.showLabel) {
            this.label1.elem.style.display = "block";
            this.label2.elem.style.display = "block";
        } else {
            this.label1.elem.style.display = "none";
            this.label2.elem.style.display = "none";
        }
        if (this.range) {
            this.button2.elem.style.display = "block";
            this.scaleFilling.elem.style.display = "block";
        } else {
            this.button2.elem.style.display = "none";
            this.label2.elem.style.display = "none";
            this.scaleFilling.elem.style.display = "none";
        }

        if (this.vertical) {
            this.scale.elem.classList.add("slider__scale_vertical");
            this.scaleFilling.elem.classList.add("slider__scale__filling_vertical");
            this.graduation.gradElem.classList.add("slider__graduation_vertical");
            this.graduation.gradElem.style.height = this.scale.getHeight() +"px";
            this.button1.elem.classList.add("slider__button_vertical");
            this.button2.elem.classList.add("slider__button_vertical");
            this.label1.elem.classList.add("slider__button__label_vertical");
            this.label2.elem.classList.add("slider__button__label_vertical");

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
            this.scaleFilling.elem.classList.remove("slider__scale__filling_vertical");
            this.graduation.gradElem.classList.remove("slider__graduation_vertical");
            this.graduation.gradElem.style.height = 20 +"px";
            this.button1.elem.classList.remove("slider__button_vertical");
            this.button2.elem.classList.remove("slider__button_vertical");
            this.label1.elem.classList.remove("slider__button__label_vertical");
            this.label2.elem.classList.remove("slider__button__label_vertical");

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

    checkValues() {
        if (typeof this.maxValue !== "number") {
            console.error("Maxvalue should be a number");
        }
        if (typeof this.minValue !== "number") {
            console.error("Maxvalue should be a number");
        }
        if (typeof this.step !== "number") {
            console.error("Step should be a number");
        }
        if (typeof this.range !== "boolean") {
            console.error("Range should be a boolean");
        }
        if (typeof this.vertical !== "boolean") {
            console.error("Vertical should be a boolean");
        }
        if (typeof this.showLabel !== "boolean") {
            console.error("ShowLabel should be a boolean");
        }
        if (this.step > this.maxValue - this.minValue) {
            this.step = this.maxValue - this.minValue;
            console.error("Step is setted to the max");
        }
    }

    append(entry: HTMLElement) {
        entry.appendChild(this.scale.elem).appendChild(this.scaleFilling.elem);
        entry.appendChild(this.button1.elem);
        entry.appendChild(this.label1.elem);
        entry.appendChild(this.graduation.gradElem);
        entry.appendChild(this.button2.elem);
        entry.appendChild(this.label2.elem);
    }
}

export {createElem, Scale, Label, Button, ScaleFilling, View, Graduation};




