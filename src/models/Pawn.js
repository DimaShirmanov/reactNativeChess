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

    getImage() {
        return this.player === 1?  require('../assets/white-pawn.png') : require('../assets/black-pawn.png');
    }
}

export default Pawn;