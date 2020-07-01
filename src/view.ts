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
class View {
    scale: Scale;
    button: Button;
    
    constructor() {
        this.scale = new Scale();
        this.button = new Button();
        this.scale.elem.onclick = (event) => {
            this.button.elem.style.left = `${event.offsetX.toString()}px`;
        }
    }
    append(entry: Element) {
        entry.appendChild(this.scale.elem);
        entry.appendChild(this.button.elem);
    }
}

const myView = new View();

const entry = document.getElementsByClassName("slider")[0];


myView.append(entry);