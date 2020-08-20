'use strict';

class Rectange {
    constructor(height, width){
        this.height = height;
        this.width = width;
    }

    calcArea(){
        return this.height * this.width;
    }
}


class ColoredRectangleWithText extends Rectange {
    constructor(height, width, text, bgColor){
        super();
        this.text = text;
        this.bgColor = bgColor;
    }

    showMyProps(){
        console.log(`Текст: ${this.text}, Цвет: ${this.bgColor}`);
    }
}

let div = new ColoredRectangleWithText(25, 10, 'Hello', 'red');
div.showMyProps();
// let square = new Rectange(10, 10);
// let long = new Rectange(20, 100);

// console.log(square.calcArea());
// console.log(long.calcArea());
