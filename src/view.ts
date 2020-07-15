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
            this.mark1.style.marginLeft = - this.mark1.getBoundingClientRect().width/2 + "px";
            this.mark4.style.marginRight = - this.mark4.getBoundingClientRect().width/2 + "px";
        } else {
            this.mark1.style.marginTop = - this.mark1.getBoundingClientRect().height/2 + "px";
            this.mark4.style.marginBottom = - this.mark4.getBoundingClientRect().height/2 + "px";
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
    step: number;

    constructor() {
        this.scale = new Scale();
        this.button1 = new Button();
        this.button2 = new Button();
        this.label1 = new Label();
        this.label2 = new Label();
        this.scaleFilling = new ScaleFilling();
        this.graduation = new Graduation();

        this.getStart = this.getStart.bind(this);
        this.getEnd = this.getEnd.bind(this);
        this.updateElems = this.updateElems.bind(this);
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
            this.scaleFilling.elem.style.height = this.getEnd() - this.getStart() + "px";
        } else {
            this.scaleFilling.elem.style.left = this.getStart() + "px";
            this.scaleFilling.elem.style.width = this.getEnd() - this.getStart() + "px";
        }
    }
    initLabels() {
        if (this.vertical) {
            this.button1.elem.style.top = -this.button1.getWidth()/2 + "px";
            this.button2.elem.style.top = this.scale.getHeight() - this.button2.getWidth()/2 + "px";
            this.label1.elem.innerHTML = this.minValue + "";
            this.label2.elem.innerHTML = this.maxValue + "";
            this.label2.elem.style.top = this.getEnd() - this.label2.getHeight()/2 + "px";
            this.label1.elem.style.top = this.getStart() - this.label1.getHeight()/2 + "px";
        } else {
            this.button1.elem.style.left = -this.button1.getWidth()/2 + "px";
            this.button2.elem.style.left = this.scale.getWidth() -this.button1.getWidth()/2 + "px";
            this.label1.elem.innerHTML = this.minValue + "";
            this.label2.elem.innerHTML = this.maxValue + "";
            this.label1.elem.style.left = this.getStart() - this.label1.getWidth()/2 + "px";
            this.label2.elem.style.left = this.getEnd() - this.label2.getWidth()/2 + "px";
        }
    }

    init() {
        const scale = this.scale;
        const butt1 = this.button1;
        const butt2 = this.button2;
        const label1 = this.label1;
        const label2 = this.label2;
        const minValue = this.minValue;
        const maxValue = this.maxValue;
        const step = this.step;
        let range = this.range;
        let showLabel = this.showLabel;
        let vertical = this.vertical;

        butt2.elem.style.display = "none";

        const updateElems = this.updateElems;

        if (vertical) {
            this.scale.elem.classList.add("slider__scale_vertical");
            this.scaleFilling.elem.classList.add("slider__scale__filling_vertical");
            this.graduation.gradElem.classList.add("slider__graduation_vertical");
            this.graduation.gradElem.style.height = this.scale.getHeight() +"px";
            butt1.elem.classList.add("slider__button_vertical");
            butt2.elem.classList.add("slider__button_vertical");
            label1.elem.classList.add("slider__button__label_vertical");
            label2.elem.classList.add("slider__button__label_vertical");
        } else {
            this.scale.elem.classList.remove("slider__scale_vertical");
            this.scaleFilling.elem.classList.remove("slider__scale__filling_vertical");
            this.graduation.gradElem.classList.remove("slider__graduation_vertical");
            this.graduation.gradElem.style.height = 20 +"px";
            butt1.elem.classList.remove("slider__button_vertical");
            butt2.elem.classList.remove("slider__button_vertical");
            label1.elem.classList.remove("slider__button__label_vertical");
            label2.elem.classList.remove("slider__button__label_vertical")
        }
        if (range) {
            butt2.elem.style.display = "block";
            this.scaleFilling.elem.style.display = "block";
        } else {
            butt2.elem.style.display = "none";
            this.scaleFilling.elem.style.display = "none";
        }
        if (showLabel) {
            label1.elem.style.display = "block";
            label2.elem.style.display = "block";
        } else {
            label1.elem.style.display = "none";
            label2.elem.style.display = "none";
        }

        this.graduation.init(minValue, maxValue, this.vertical);
        
        function round(val: number, step: number): number {
            let whole = Math.floor(val/step);
            let reminder = val % step;
            return reminder < step/2 ? whole*step : (whole + 1)*step;
        }

        function roundOffsetButt(currOffset: number) {
            let currValue = 0;
            let scaleMessure = 0;
            
            if(vertical) {
                currValue = minValue + (currOffset + butt1.getWidth()/2)*(maxValue - minValue)/scale.getHeight();
                scaleMessure = scale.getHeight();
            } else {
                currValue = minValue + (currOffset + butt1.getWidth()/2)*(maxValue - minValue)/scale.getWidth();
                scaleMessure = scale.getWidth();
            }
            
            let roundValue = round(currValue, step);
            if (roundValue < minValue) {
                roundValue = minValue;
            } else if (roundValue > maxValue) {
                roundValue = maxValue;
            }
            
            let roundOffset = (roundValue - minValue)*scaleMessure/(maxValue - minValue) - butt1.getWidth()/2;
            return [roundOffset, roundValue];
        }
        
        //Button1  Handlers
        function butt1Move(roundOffset: number, roundValue: number) {
            if (vertical) {
                butt1.elem.style.top = roundOffset + "px";
                label1.elem.style.top = roundOffset - label1.getHeight()/2 + butt1.getWidth()/2 + "px";
                label1.elem.innerHTML = roundValue + "";
            } else {
                butt1.elem.style.left = roundOffset + "px";
                label1.elem.style.left = roundOffset - label1.getWidth()/2 + butt1.getWidth()/2 + "px";
                label1.elem.innerHTML = roundValue + "";
            }
            updateElems();
        }
        function onMouseMove1(eventMm: MouseEvent) {
            let roundValue = 0;
            let roundOffset = 0;
            
            if (vertical) {
                let stepWidth = step*scale.getHeight()/(maxValue - minValue);
                let newOffset = eventMm.clientY - scale.getTop() - butt1.getWidth()/2;
                
                if (newOffset < -butt1.getWidth()/2) {
                    newOffset = -butt1.getWidth()/2;
                    roundValue = minValue;
                    roundOffset = newOffset;
                }
                if (!range) {
                    if (newOffset > scale.getHeight() - butt1.getWidth()/2) {
                        newOffset = scale.getHeight() - butt1.getWidth()/2;
                        roundValue = maxValue;
                        roundOffset = newOffset;
                    }
                } else {
                    if (newOffset > butt2.getTop() - scale.getTop() - stepWidth/1.5) {
                        newOffset = butt2.getTop() - scale.getLeft() - stepWidth/1.5;
                    }
                }
                if (!roundValue) {
                    [roundOffset, roundValue] = roundOffsetButt(newOffset);
                }
            } else {
                let stepWidth = step*scale.getWidth()/(maxValue - minValue);
                let newOffset = eventMm.clientX - scale.getLeft() - butt1.getWidth()/2;
                
                if (newOffset < -butt1.getWidth()/2) {
                    newOffset = -butt1.getWidth()/2;
                    roundValue = minValue;
                    roundOffset = newOffset;
                }
                if (!range) {
                    if (newOffset > scale.getWidth() - butt1.getWidth()/2) {
                        newOffset = scale.getWidth() - butt1.getWidth()/2;
                        roundValue = maxValue;
                        roundOffset = newOffset;
                    }
                } else {
                    if (newOffset > butt2.getLeft() - scale.getLeft() - stepWidth/1.5) {
                        newOffset = butt2.getLeft() - scale.getLeft() - stepWidth/1.5;
                    }
                }
                if (!roundValue) {
                    [roundOffset, roundValue] = roundOffsetButt(newOffset);
                }
            }

            butt1Move(roundOffset, roundValue);
        }
        function onMouseUp1(eventMu: MouseEvent) {
            document.removeEventListener("mouseup", onMouseUp1);
            document.removeEventListener("mousemove", onMouseMove1);
        }

        //Button1 EventListeners
        butt1.elem.onmousedown = (eventMd) => {
            eventMd.preventDefault();
            document.addEventListener("mousemove", onMouseMove1);
            document.addEventListener("mouseup", onMouseUp1);
        }

        //Button2  Handlers
        function butt2Move(roundOffset: number, roundValue: number) {
            if (vertical) {
                butt2.elem.style.top = roundOffset + "px";
                label2.elem.style.top = roundOffset - label2.getHeight()/2 + butt2.getWidth()/2 + "px";
                label2.elem.innerHTML = roundValue + "";
            } else {
                butt2.elem.style.left = roundOffset + "px";
                label2.elem.style.left = roundOffset - label2.getWidth()/2 + butt2.getWidth()/2 + "px";
                label2.elem.innerHTML = roundValue + "";
            }
            updateElems(); 
        }
        function onMouseMove2(eventMm: MouseEvent) {
            let roundValue = 0;
            let roundOffset = 0;

            if (vertical) {
                let stepWidth = step*scale.getHeight()/(maxValue - minValue);
                let newOffset = eventMm.clientY - scale.getTop() - butt2.getWidth()/2;

                if (newOffset > scale.getHeight() - butt2.getWidth()/2) {
                    newOffset = scale.getHeight() - butt2.getWidth()/2;
                    roundValue = maxValue;
                    roundOffset = newOffset;
                }
                if (newOffset < butt1.getTop() - scale.getTop() + stepWidth/1.5) {
                    newOffset = butt1.getTop() - scale.getTop() + stepWidth/1.5;
                }
                if (!roundValue) {
                    [roundOffset, roundValue] = roundOffsetButt(newOffset);
                }
            } else {
                let stepWidth = step*scale.getWidth()/(maxValue - minValue);
                let newOffset = eventMm.clientX - scale.getLeft() - butt2.getWidth()/2;
                
                if (newOffset > scale.getWidth() - butt2.getWidth()/2) {
                    newOffset = scale.getWidth() - butt2.getWidth()/2;
                    roundValue = maxValue;
                    roundOffset = newOffset;
                }
                if (newOffset < butt1.getLeft() - scale.getLeft() + stepWidth/1.5) {
                    newOffset = butt1.getLeft() - scale.getLeft() + stepWidth/1.5;
                }
                if (!roundValue) {
                    [roundOffset, roundValue] = roundOffsetButt(newOffset);
                }
            }

            butt2Move(roundOffset, roundValue);
        }
        function onMouseUp2(eventMu: MouseEvent) {
            document.removeEventListener("mouseup", onMouseUp2);
            document.removeEventListener("mousemove", onMouseMove2);
        }

        //Button2 EventListeners
        butt2.elem.onmousedown = (eventMd) => {
            eventMd.preventDefault();
            document.addEventListener("mousemove", onMouseMove2);
            document.addEventListener("mouseup", onMouseUp2);
        }

        //Scale EventListeners
        scale.elem.onclick = (event) => {
            if (vertical) {
                if(range) {
                    if (Math.abs(event.clientY - butt1.getTop() - butt1.getWidth()/2) <
                        Math.abs(event.clientY - butt2.getTop() - butt2.getWidth()/2)) {
                        onMouseMove1(event);
                    } else {
                        onMouseMove2(event);
                    }
                } else {
                    onMouseMove1(event);
                }
            } else {
                if(range) {
                    if (Math.abs(event.clientX - butt1.getLeft() - butt1.getWidth()/2) <
                        Math.abs(event.clientX - butt2.getLeft() - butt2.getWidth()/2)) {
                        onMouseMove1(event);
                    } else {
                        onMouseMove2(event);
                    }
                } else {
                    onMouseMove1(event);
                }
            }
        }

        //Graduation EventListeners
        function interMarkHandler (currValue: number) {
            let roundOffset = 0;
            let roundValue = 0;

            if (vertical) {
                let markX = (currValue - minValue)/(maxValue - minValue)*scale.getHeight();
                [roundOffset, roundValue] = roundOffsetButt(markX - butt1.getWidth()/2);
                if (range) {
                    if (Math.abs(markX + scale.getTop() - butt1.getTop() - butt1.getWidth()/2) <
                    Math.abs(markX + scale.getTop() - butt2.getTop() - butt2.getWidth()/2))
                    {
                    butt1Move(roundOffset, roundValue);
                    } else {
                        butt2Move(roundOffset, roundValue);
                    }
                } else {
                    butt1Move(roundOffset, roundValue);
                }
            } else {
                let markX = (currValue - minValue)/(maxValue - minValue)*scale.getWidth();
                [roundOffset, roundValue] = roundOffsetButt(markX - butt1.getWidth()/2);
                if (range) {
                    if (Math.abs(markX + scale.getLeft() - butt1.getLeft() - butt1.getWidth()/2) <
                    Math.abs(markX + scale.getLeft() - butt2.getLeft() - butt2.getWidth()/2))
                    {
                    butt1Move(roundOffset, roundValue);
                    } else {
                        butt2Move(roundOffset, roundValue);
                    }
                } else {
                    butt1Move(roundOffset, roundValue);
                }
            }
        }

        this.graduation.mark1.onclick = (event) => {
            let roundOffset = -butt1.getWidth()/2;
            let roundValue = minValue;
            butt1Move(roundOffset, roundValue);
        }
        this.graduation.mark4.onclick = (event) => {
            if (vertical) {
                let roundOffset = scale.getHeight() - butt2.getWidth()/2;
                let roundValue = maxValue;
                if (range) {
                    butt2Move(roundOffset, roundValue); 
                } else {
                    butt1Move(roundOffset, roundValue);
                }   
            } else {
                let roundOffset = scale.getWidth() - butt2.getWidth()/2;
                let roundValue = maxValue;
                if (range) {
                    butt2Move(roundOffset, roundValue); 
                } else {
                    butt1Move(roundOffset, roundValue);
                }
            }
        }
        this.graduation.mark2.onclick = (event) => {
            interMarkHandler(parseInt(this.graduation.mark2.innerHTML));
        }
        this.graduation.mark3.onclick = (event) => {
            interMarkHandler(parseInt(this.graduation.mark3.innerHTML));
        }
    }

    append(entry: Element) {
        entry.appendChild(this.scale.elem).appendChild(this.scaleFilling.elem);
        entry.appendChild(this.button1.elem);
        entry.appendChild(this.label1.elem);
        entry.appendChild(this.graduation.gradElem);
        if (this.range) {
            entry.appendChild(this.button2.elem);
            entry.appendChild(this.label2.elem);
        }
    }
}

export {createElem, Scale, Label, Button, ScaleFilling, View, Graduation};


const myView1 = new View();
myView1.vertical = true;
myView1.range = true;
myView1.showLabel = true;
myView1.minValue = 1000;
myView1.maxValue = 10000;
myView1.step = 1200;

const entry = createElem("slider");
document.body.appendChild(entry);

myView1.append(entry);
myView1.init();
myView1.initLabels();
myView1.updateElems();
