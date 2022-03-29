class Field {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    setElement(element) {
        if (this.element) {
            delete this.element;
        }

        this.element = element;
    }

    getElement() {
        return this.element;
    }

    removeElement() {
        delete this.element;
    }

    getColor() {
        return this.color;
    }


    getPosition() {
        return {x: this.x, y: this.y};
    }
}

export default Field;