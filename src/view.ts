class Scale {
    create() {
        return '<div class = "slider__scale"><div class = "slider__scale__filling"></div></div>';
    }
}
class Button {
    create() {
        return '<div class = "slider__button"></div>';
    }
}

class View {
    create() {
        const scale = new Scale();
        const button = new Button();
        return `<div class = "slider">${scale.create()}${button.create()}</div>`;
    }
}

$(document).ready(() => {
    $(".slider").appendTo($(".root"));
    
})
const myView = new View();

document.getElementsByClassName("root")[0].innerHTML = myView.create();