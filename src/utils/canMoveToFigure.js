import FIGURES from "../constants/FIGURES";
import USERS from "../constants/USERS";

const filterXY = item => item.x >= 0 && item.x <= 8 && item.y <= 8 && item.y >= 0;

const getPositionForPawn = ({ x, y, player, figuresOnBoard }) => {
    const result = [];
    for (let i = 1; i <= 2; i++) {
        const newY = player === USERS.PLAYER2 ? y - i : y + i;
        const findElementByPosition = figuresOnBoard.find(item => item.x == x && item.y === newY);
       
        if (findElementByPosition) {
            return result;
        }

        result.push({ x, y: newY });
    }

    return result;
}

const getPositionForRook = ({ x, y, player, figuresOnBoard }) => {
    const result = [];
    for (let i = 1; i <= 8; i++) {
        const newY = player === USERS.PLAYER2 ? y - i : y + i;
        const findElementByPosition = figuresOnBoard.find(item => item.x == x && item.y === newY);
        if (findElementByPosition && findElementByPosition.player === player) {
            break;
        }

        if (findElementByPosition && findElementByPosition.player !== player) {
            result.push({ x, y: newY });
            break;
        }
        result.push({ x, y: newY });
    }


    for (let i = 1; i <= 8; i++) {
        const newY = player === USERS.PLAYER2 ? y + i : y - i;
        const findElementByPosition = figuresOnBoard.find(item => item.x == x && item.y === newY);
        if (findElementByPosition && findElementByPosition.player === player) {
            break;
        }

        if (findElementByPosition && findElementByPosition.player !== player) {
            result.push({ x, y: newY });
            break;
        }
        result.push({ x, y: newY });
    }

    for (let i = 1; i <= 8; i++) {
        const newX = player === USERS.PLAYER2 ? x - i : x + i;
        const findElementByPosition = figuresOnBoard.find(item => item.x == newX && item.y === y);
        if (findElementByPosition && findElementByPosition.player === player) {
            break;
        }

        if (findElementByPosition && findElementByPosition.player !== player) {
            result.push({ x: newX, y });
            break;
        }
        result.push({ x: newX, y });
    }


    for (let i = 1; i <= 8; i++) {
        const newX = player === USERS.PLAYER2 ? x + i : x - i;
        const findElementByPosition = figuresOnBoard.find(item => item.x == newX && item.y === y);
        if (findElementByPosition && findElementByPosition.player === player) {
            break;
        }

        if (findElementByPosition && findElementByPosition.player !== player) {
            result.push({ x: newX, y });
            break;
        }
        result.push({ x: newX, y });
    }

    return result;
}

const getPositionForHorse = ({ x, y, player, figuresOnBoard }) => {
    const results = [
        {x: x + 1, y: y + 2},
        {x: x - 1, y: y + 2},
        {x: x + 1, y: y - 2},
        {x: x - 1, y: y - 2},

        {x: x + 2, y: y + 1},
        {x: x - 2, y: y + 1},
        {x: x + 2, y: y - 1},
        {x: x - 2, y: y - 1}
    ].filter(el => {
        const findElementByPosition = figuresOnBoard.find(item => item.x == el.x && item.y === el.y);
        if (findElementByPosition && findElementByPosition.player === player) {
            return false;
        }

        return  true;
    });

    return results;
}

export default ({
    x,
    y,
    type,
    player,
    figuresOnBoard
}) => {
    switch (type) {
        case FIGURES.pawn: {
            return getPositionForPawn({ x, y, player, figuresOnBoard }).filter(filterXY);
        }

        case FIGURES.rook:
            return getPositionForRook({ x, y, player, figuresOnBoard }).filter(filterXY);

        case FIGURES.horse:
            return getPositionForHorse({ x, y, player, figuresOnBoard }).filter(filterXY);

        default:
            return [];
    }
}
