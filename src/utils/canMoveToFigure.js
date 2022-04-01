import FIGURES from "../constants/FIGURES";
import USERS from "../constants/USERS";

const filterXY = item => item.x >= 0 && item.x <= 8 && item.y <= 8 && item.y >= 0;

export default ({
    x,
    y,
    type,
    player,
    figuresOnBoard
}) => {
    switch (type) {
        case FIGURES.pawn: {
            return [
                { x, y: player === USERS.PLAYER1 ? y + 1 : y - 1 },
                { x, y: player === USERS.PLAYER1 ? y + 2 : y - 2 },
            ].filter(filterXY);
        }

        default:
            return [];
    }
}
