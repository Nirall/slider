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
        this.init = this.init.bind(this);
    }
    init(minValue: number, maxValue: number) {
        this.mark1.innerHTML = minValue + "";
        this.mark2.innerHTML = maxValue + Math.round((maxValue - minValue)/3) + "";
        this.mark3.innerHTML = maxValue + Math.round((maxValue - minValue)*2/3) + "";
        this.mark4.innerHTML = maxValue + "";
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
            return this.button1.getLeft() -
                this.scale.getLeft() +
                this.button1.getWidth()/2;
        }
    }
    getEnd() {
        if(!this.vertical) {
            return this.button2.getLeft() -
            this.scale.getLeft() +
                this.button2.getWidth()/2;
        }
    }
    updateElems() {
        this.scaleFilling.elem.style.left = this.getStart() + "px";
        this.scaleFilling.elem.style.width = this.getEnd() - this.getStart() + "px";
    }
    initLabels() {
        this.button1.elem.style.left = -this.button1.elem.getBoundingClientRect().width/2 + "px";
        this.button2.elem.style.left = this.scale.elem.getBoundingClientRect().width -this.button1.elem.getBoundingClientRect().width/2 + "px";
        this.label1.elem.innerHTML = this.minValue + "";
        this.label2.elem.innerHTML = this.maxValue + "";
        this.label1.elem.style.left = this.getStart() - this.label1.elem.getBoundingClientRect().width/2 + "px";
        this.label2.elem.style.left = this.getEnd() - this.label2.elem.getBoundingClientRect().width/2 + "px";
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

        if (range) {
            butt2.elem.style.display = "block";
            this.scaleFilling.elem.style.display = "block";
        }
        if (showLabel) {
            label1.elem.style.display = "block";
            label2.elem.style.display = "block";
        }

        this.graduation.init(minValue, maxValue);
        
        function round(val: number, step: number): number {
            let whole = Math.floor(val/step);
            let reminder = val % step;
            return reminder < step/2 ? whole*step : (whole + 1)*step;
        }
        
        //Button1  Handlers
        function onMouseMove1(eventMm: MouseEvent) {
            let stepWidth = step*scale.getWidth()/(maxValue - minValue);
            let newLeft = eventMm.clientX - scale.getLeft() - butt1.getWidth()/2;
            let currValue = 0;
            let roundValue = 0;
            let roundLeft = 0;
            
            if (newLeft < -butt1.getWidth()/2) {
                newLeft = -butt1.getWidth()/2;
                roundValue = minValue;
                roundLeft = newLeft;
            }
            if (!range) {
                if (newLeft > scale.getWidth() - butt1.getWidth()/2) {
                    newLeft = scale.getWidth() - butt1.getWidth()/2;
                    roundValue = maxValue;
                    roundLeft = newLeft;
                }
            } else {
                if (newLeft > butt2.getLeft() - scale.getLeft() - stepWidth/1.5) {
                    newLeft = butt2.getLeft() - scale.getLeft() - stepWidth/1.5;
                }
            }
            if (!roundValue) {
                currValue = minValue + (newLeft + butt1.getWidth()/2)*(maxValue - minValue)/scale.getWidth();
                roundValue = round(currValue, step) < minValue ? minValue : round(currValue, step);
                roundLeft = (roundValue - minValue)*scale.getWidth()/(maxValue - minValue) - butt1.getWidth()/2;
            }
            butt1.elem.style.left = roundLeft + "px";
            label1.elem.style.left = roundLeft - label1.getWidth()/2 + butt1.getWidth()/2 + "px";
            label1.elem.innerHTML = roundValue + "";
            updateElems();
        }
        function onMouseUp1(eventMm: MouseEvent) {
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
        function onMouseMove2(eventMm: MouseEvent) {
            let stepWidth = step*scale.getWidth()/(maxValue - minValue);
            let newLeft = eventMm.clientX - scale.getLeft() - butt2.getWidth()/2;
            let currValue = 0;
            let roundValue = 0;
            let roundLeft = 0;
            
            if (newLeft > scale.getWidth() - butt2.getWidth()/2) {
                newLeft = scale.getWidth() - butt2.getWidth()/2;
                roundValue = maxValue;
                roundLeft = newLeft;
            }
            if (newLeft < butt1.getLeft() - scale.getLeft() + stepWidth/1.5) {
                newLeft = butt1.getLeft() - scale.getLeft() + stepWidth/1.5;
            }
            if (!roundValue) {
                currValue = minValue + (newLeft + butt2.getWidth()/2)*(maxValue - minValue)/scale.getWidth();
                roundValue = round(currValue, step) > maxValue ? maxValue : round(currValue, step);
                roundLeft = (roundValue - minValue)*scale.getWidth()/(maxValue - minValue) - butt2.getWidth()/2;
            }
            butt2.elem.style.left = roundLeft + "px";
            label2.elem.style.left = roundLeft - label2.getWidth()/2 + butt2.getWidth()/2 + "px";
            label2.elem.innerHTML = roundValue + "";
            updateElems();
        }
        function onMouseUp2(eventMm: MouseEvent) {
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
            if(range) {
                if (Math.abs(event.clientX - butt1.getLeft()) < Math.abs(event.clientX - butt2.getLeft())) {
                    onMouseMove1(event);
                } else {
                    onMouseMove2(event);
                }
            } else {
                onMouseMove1(event);
            }
        }
        /*
        //graduation EventListeners
        if (!this.range) {
            this.graduation.mark1.onclick = (event) => {
                buttElem1.style.left = buttElem1.getBoundingClientRect().width/2 + "px";
                label2.style.left = - label2Width/2 + buttWidth/2 + "px";
                label2.innerHTML = roundValue + "";
                updateElems();
            }
            this.graduation.mark2.onclick = (event) => {
                buttElem1.style.left = buttElem1.getBoundingClientRect().width/2 + "px";
            }
        }*/
    }

    append(entry: Element) {
        entry.appendChild(this.scale.elem).appendChild(this.scaleFilling.elem);
        entry.appendChild(this.button1.elem);
        entry.appendChild(this.label1.elem);
        if (this.range) {
            entry.appendChild(this.button2.elem);
            entry.appendChild(this.label2.elem);
        }
    }
}

const myView1 = new View();
myView1.range = true;
myView1.showLabel = true;
myView1.minValue = 1000;
myView1.maxValue = 10000;
myView1.step = 1200;
const entry = document.getElementsByClassName("slider")[0];

myView1.init();
myView1.append(entry);
myView1.initLabels();
myView1.updateElems();