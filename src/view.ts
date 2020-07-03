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
    }
}
class Button {
    elem: HTMLElement;
    constructor() {
        this.elem = createElem("slider__button");
    }
}
class Label {
    elem: HTMLElement;
    constructor() {
        this.elem = createElem("slider__button__label");
    }
}
class ScaleFilling {
    elem: HTMLElement;
    constructor() {
        this.elem = createElem("slider__scale__filling");
    }
}
class View {
    scale: Scale;
    scaleFilling: ScaleFilling;
    button1: Button;
    button2: Button;
    label1: Label;
    label2: Label;
    range: boolean;
    vertical: boolean;
    label: boolean;
    minValue: number;
    maxValue: number;
    step: number;

    constructor() {
        this.getStart = this.getStart.bind(this);
        this.getEnd = this.getEnd.bind(this);
        this.updateElems = this.updateElems.bind(this);
    }
    getStart() {
        if(!this.vertical) {
            return this.button1.elem.getBoundingClientRect().left -
                this.scale.elem.getBoundingClientRect().left +
                this.button1.elem.getBoundingClientRect().width/2;
        }
    }
    getEnd() {
        if(!this.vertical) {
            return this.button2.elem.getBoundingClientRect().left -
                this.scale.elem.getBoundingClientRect().left +
                this.button2.elem.getBoundingClientRect().width/2;
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
        this.scale = new Scale();
        this.button1 = new Button();
        this.button2 = new Button();
        this.label1 = new Label();
        this.label2 = new Label();
        this.scaleFilling = new ScaleFilling();
        
        const minValue = this.minValue;
        const maxValue = this.maxValue;
        let range = this.range;
        let label = this.label;
        let vertical = this.vertical;
        const buttElem1 = this.button1.elem;
        const buttElem2 = this.button2.elem;
        const label1 = this.label1.elem;
        const label2 = this.label2.elem;
        const scaleElem = this.scale.elem;
        const scaleFillingElem = this.scaleFilling.elem;
        const step = this.step;
        
        buttElem1.ondragstart = () => false;
        buttElem2.ondragstart = () => false;
        scaleElem.ondragstart = () => false;
        scaleFillingElem.ondragstart = () => false;

        buttElem2.style.display = "none";

        const updateElems = this.updateElems;
        //const getStart = this.getStart;
        //const getEnd = this.getEnd;

        if (range) {
            buttElem2.style.display = "block";
            scaleFillingElem.style.display = "block";
        }
        if (label) {
            label1.style.display = "block";
            label2.style.display = "block";
        }
        
        function round(val: number, step: number): number {
            let whole = Math.floor(val/step);
            let reminder = val % step;
            return reminder < step/2 ? whole*step : (whole + 1)*step;
        }

        //Scale EventListeners
        scaleElem.onclick = (event) => {
            if(!range) {
                buttElem1.style.left = event.offsetX + "px";
                updateElems();
            }
        }
        
        //Button1 EventListeners
        buttElem1.onmousedown = (eventMd) => {
            eventMd.preventDefault();
            document.addEventListener("mousemove", onMouseMove1);
            document.addEventListener("mouseup", onMouseUp1);
            function onMouseMove1(eventMm: MouseEvent) {
                let scaleLeft = scaleElem.getBoundingClientRect().left;
                let scaleWidth = scaleElem.getBoundingClientRect().width;
                let buttWidth = buttElem1.getBoundingClientRect().width;
                let butt1Left = buttElem1.getBoundingClientRect().left;
                let butt2Left = buttElem2.getBoundingClientRect().left;
                let label1Width = label1.getBoundingClientRect().width;
                let stepWidth = step*scaleWidth/(maxValue - minValue);
                let newLeft = eventMm.clientX - scaleLeft - buttWidth/2;
                let currValue = 0;
                let roundValue = 0;
                let roundLeft = 0;
                
                if (newLeft < -buttWidth/2) {
                    newLeft = -buttWidth/2;
                    roundValue = minValue;
                    roundLeft = newLeft;
                }
                if (!range) {
                    if (newLeft > scaleWidth - buttWidth/2) {
                        newLeft = scaleWidth - buttWidth/2;
                        roundValue = maxValue;
                        roundLeft = newLeft;
                    }
                } else {
                    if (newLeft > butt2Left - scaleLeft - stepWidth/1.5) {
                        newLeft = butt2Left - scaleLeft - stepWidth/1.5;
                    }
                }
                if (!roundValue) {
                    currValue = minValue + (newLeft + buttWidth/2)*(maxValue - minValue)/scaleWidth;
                    roundValue = round(currValue, step) < minValue ? minValue : round(currValue, step);
                    roundLeft = (roundValue - minValue)*scaleWidth/(maxValue - minValue) - buttWidth/2;
                }
                buttElem1.style.left = roundLeft + "px";
                label1.style.left = roundLeft - label1Width/2 + buttWidth/2 + "px";
                label1.innerHTML = roundValue + "";
                updateElems();
            }
            function onMouseUp1(eventMm: MouseEvent) {
                document.removeEventListener("mouseup", onMouseUp1);
                document.removeEventListener("mousemove", onMouseMove1);
            }
        }

        //Button2 EventListeners
        buttElem2.onmousedown = (eventMd) => {
            eventMd.preventDefault();
            document.addEventListener("mousemove", onMouseMove2);
            document.addEventListener("mouseup", onMouseUp2);
            function onMouseMove2(eventMm: MouseEvent) {
                let scaleLeft = scaleElem.getBoundingClientRect().left;
                let scaleWidth = scaleElem.getBoundingClientRect().width;
                let buttWidth = buttElem1.getBoundingClientRect().width;
                let butt1Left = buttElem1.getBoundingClientRect().left;
                let butt2Left = buttElem2.getBoundingClientRect().left;
                let label2Width = label2.getBoundingClientRect().width;
                let stepWidth = step*scaleWidth/(maxValue - minValue);
                let newLeft = eventMm.clientX - scaleLeft - buttWidth/2;
                let currValue = 0;
                let roundValue = 0;
                let roundLeft = 0;
                
                if (newLeft > scaleWidth - buttWidth/2) {
                    newLeft = scaleWidth - buttWidth/2;
                    roundValue = maxValue;
                    roundLeft = newLeft;
                }
                if (newLeft < butt1Left - scaleLeft + stepWidth/1.5) {
                    newLeft = butt1Left - scaleLeft + stepWidth/1.5;
                }
                if (!roundValue) {
                    currValue = minValue + (newLeft + buttWidth/2)*(maxValue - minValue)/scaleWidth;
                    roundValue = round(currValue, step) > maxValue ? maxValue : round(currValue, step);
                    roundLeft = (roundValue - minValue)*scaleWidth/(maxValue - minValue) - buttWidth/2;
                }
                buttElem2.style.left = roundLeft + "px";
                label2.style.left = roundLeft - label2Width/2 + buttWidth/2 + "px";
                label2.innerHTML = roundValue + "";
                updateElems();
            }
            function onMouseUp2(eventMm: MouseEvent) {
                document.removeEventListener("mouseup", onMouseUp2);
                document.removeEventListener("mousemove", onMouseMove2);
            }
        }
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
myView1.label = true;
myView1.minValue = 1000;
myView1.maxValue = 10000;
myView1.step = 1000;
const entry = document.getElementsByClassName("slider")[0];

myView1.init();
myView1.append(entry);
myView1.initLabels();
myView1.updateElems();
