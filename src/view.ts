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

        this.label1.elem.style.left = this.getStart() - this.label1.elem.getBoundingClientRect().width/2 + "px";
        this.label1.elem.innerHTML = Math.round(this.getStart()*100/this.scale.elem.getBoundingClientRect().width) + "%";

        this.label2.elem.style.left = this.getEnd() - this.label2.elem.getBoundingClientRect().width/2 + "px";
        this.label2.elem.innerHTML = Math.round(this.getEnd()*100/this.scale.elem.getBoundingClientRect().width) + "%";
    }

    constructor() {
        this.getStart = this.getStart.bind(this);
        this.getEnd = this.getEnd.bind(this);
        this.updateElems = this.updateElems.bind(this);
    }

    init() {
        this.scale = new Scale();
        this.button1 = new Button();
        this.button2 = new Button();
        this.label1 = new Label();
        this.label2 = new Label();
        this.scaleFilling = new ScaleFilling();
        
        let range = this.range;
        let label = this.label;
        let vertical = this.vertical;
        const buttElem1 = this.button1.elem;
        const buttElem2 = this.button2.elem;
        const label1 = this.label1.elem;
        const label2 = this.label2.elem;
        const scaleElem = this.scale.elem;
        const scaleFillingElem = this.scaleFilling.elem;
        
        buttElem1.ondragstart = () => false;
        buttElem2.ondragstart = () => false;
        scaleElem.ondragstart = () => false;
        scaleFillingElem.ondragstart = () => false;

        buttElem1.style.left = "25%";
        buttElem2.style.left = "75%";
        buttElem2.style.display = "none";

        let updateElems = this.updateElems;
        
        if (range) {
            buttElem2.style.display = "block";
            scaleFillingElem.style.display = "block";
        }
        if (label) {
            label1.style.display = "block";
            label2.style.display = "block";
        }

        //Scale EventListeners
        scaleElem.onclick = (event) => {
            if(!range) {
                buttElem1.style.left = event.offsetX + "px";
            }
        }
        
        //Button1 EventListeners
        buttElem1.onmousedown = (eventMd) => {
            eventMd.preventDefault();
            document.addEventListener("mousemove", onMouseMove1);
            document.addEventListener("mouseup", onMouseUp1);
            function onMouseMove1(eventMm: MouseEvent) {
                let newLeft = eventMm.clientX - scaleElem.getBoundingClientRect().left - buttElem1.offsetWidth/2;
                if (newLeft < -buttElem1.offsetWidth/2) {
                    newLeft = -buttElem1.offsetWidth/2
                }
                if (!range) {
                    if (newLeft > scaleElem.offsetWidth - buttElem1.offsetWidth/2) {
                        newLeft = scaleElem.offsetWidth - buttElem1.offsetWidth/2;
                    }
                } else {
                    const leftButt2 = buttElem2.getBoundingClientRect().left - scaleElem.getBoundingClientRect().left;
                    if (newLeft > leftButt2 - buttElem1.offsetWidth) {
                        newLeft = leftButt2 - buttElem1.offsetWidth;
                    }
                }
                buttElem1.style.left = newLeft + "px";
                label1.style.left = newLeft + "px";
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
                let newLeft = eventMm.clientX - scaleElem.getBoundingClientRect().left - buttElem2.offsetWidth/2;
                if (newLeft > scaleElem.offsetWidth - buttElem1.offsetWidth/2) {
                    newLeft = scaleElem.offsetWidth - buttElem1.offsetWidth/2;
                }
                const leftButt1 = buttElem1.getBoundingClientRect().left - scaleElem.getBoundingClientRect().left;
                if (newLeft < leftButt1 + buttElem1.offsetWidth) {
                    newLeft = leftButt1 + buttElem1.offsetWidth;
                }
                buttElem2.style.left = newLeft + "px";
                label2.style.left = newLeft + "px";
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
const entry = document.getElementsByClassName("slider")[0];

myView1.init();
myView1.append(entry);
myView1.updateElems();