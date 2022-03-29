class Pawn {
    constructor(player) {
        this.player = player;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }

    canMoveToPosition(x, y) {
        console.log({ x, y, lastX: this.x, lastY: this.y, playr: this.player });
        if (x !== this.x) {
            return false;
        }

        if (x === this.x && y === this.y) {
            return false;
        }
        return y <= (this.y + 3);
    }

    getImage() {
        return this.player === 1 ? require('../assets/white-pawn.png') : require('../assets/black-pawn.png');
    }
}

export default Pawn;