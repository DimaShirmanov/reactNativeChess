import FIGURES from "../constants/FIGURES";
import USERS from "../constants/USERS";

const getPositionForPawn = ({x, y, player, figuresOnBoard}) => {
    const result = [];
    const findPawn = figuresOnBoard.find(item => item.x === x && item.y === y);
    const maxIndex = findPawn && findPawn.walk ? 1 : 2;
    for (let i = 1; i <= maxIndex; i++) {
        const newY = player === USERS.PLAYER2 ? y - i : y + i;
        const findElementByPosition = figuresOnBoard.find(item => item.x == x && item.y === newY);

        if (findElementByPosition) {
            break;
        }

        result.push({x, y: newY});
    }

    if (player === USERS.PLAYER2) {
        const leftElement = figuresOnBoard.find(item => item.x === x - 1 && item.y === y - 1);
        const rightElement = figuresOnBoard.find(item => item.x === x + 1 && item.y === y - 1);

        if (leftElement && leftElement.player !== player) {
            result.push({x: x - 1, y: y - 1});
        }

        if (rightElement && rightElement.player !== player) {
            result.push({x: x + 1, y: y - 1});
        }
    }

    if (player === USERS.PLAYER1) {
        const leftElement = figuresOnBoard.find(item => item.x === x - 1 && item.y === y + 1);
        const rightElement = figuresOnBoard.find(item => item.x === x + 1 && item.y === y + 1);

        if (leftElement && leftElement.player !== player) {
            result.push({x: x - 1, y: y + 1});
        }

        if (rightElement && rightElement.player !== player) {
            result.push({x: x + 1, y: y + 1});
        }
    }

    return result;
}

const getPositionForRook = ({x, y, player, figuresOnBoard}) => {
    const result = [];
    for (let i = 1; i <= 8; i++) {
        const newY = player === USERS.PLAYER2 ? y - i : y + i;
        const findElementByPosition = figuresOnBoard.find(item => item.x == x && item.y === newY);
        if (findElementByPosition && findElementByPosition.player === player) {
            break;
        }

        if (findElementByPosition && findElementByPosition.player !== player) {
            result.push({x, y: newY});
            break;
        }
        result.push({x, y: newY});
    }


    for (let i = 1; i <= 8; i++) {
        const newY = player === USERS.PLAYER2 ? y + i : y - i;
        const findElementByPosition = figuresOnBoard.find(item => item.x == x && item.y === newY);
        if (findElementByPosition && findElementByPosition.player === player) {
            break;
        }

        if (findElementByPosition && findElementByPosition.player !== player) {
            result.push({x, y: newY});
            break;
        }
        result.push({x, y: newY});
    }

    for (let i = 1; i <= 8; i++) {
        const newX = player === USERS.PLAYER2 ? x - i : x + i;
        const findElementByPosition = figuresOnBoard.find(item => item.x == newX && item.y === y);
        if (findElementByPosition && findElementByPosition.player === player) {
            break;
        }

        if (findElementByPosition && findElementByPosition.player !== player) {
            result.push({x: newX, y});
            break;
        }
        result.push({x: newX, y});
    }


    for (let i = 1; i <= 8; i++) {
        const newX = player === USERS.PLAYER2 ? x + i : x - i;
        const findElementByPosition = figuresOnBoard.find(item => item.x == newX && item.y === y);
        if (findElementByPosition && findElementByPosition.player === player) {
            break;
        }

        if (findElementByPosition && findElementByPosition.player !== player) {
            result.push({x: newX, y});
            break;
        }
        result.push({x: newX, y});
    }

    return result;
}

const getPositionForHorse = ({x, y, player, figuresOnBoard}) => {
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

        return true;
    });

    return results;
}

const getPositionForKing = ({x, y}) => {
    const results = [];

    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            results.push({x: i, y: j})
        }
    }

    return results;
}

const getPositionForOfficer = ({x, y, player, figuresOnBoard}) => {
    const results = [];

    for (let i = 1; i <= 8; i++) {
        const newX = x - i;
        const newY = y - i;
        const findElementByPosition = figuresOnBoard.find(item => item.x === newX && item.y === newY);
        if (findElementByPosition) {
            if (player !== findElementByPosition.player) {
                results.push({x: newX, y: newY});
            }
            break;
        }
        results.push({x: newX, y: newY});
    }


    for (let i = 1; i <= 8; i++) {
        const newX = x + i;
        const newY = y + i;
        const findElementByPosition = figuresOnBoard.find(item => item.x === newX && item.y === newY);
        if (findElementByPosition) {
            if (player !== findElementByPosition.player) {
                results.push({x: newX, y: newY});
            }
            break;
        }
        results.push({x: newX, y: newY});
    }

    for (let i = 1; i <= 8; i++) {
        const newX = x - i;
        const newY = y + i;
        const findElementByPosition = figuresOnBoard.find(item => item.x === newX && item.y === newY);
        if (findElementByPosition) {
            if (player !== findElementByPosition.player) {
                results.push({x: newX, y: newY});
            }
            break;
        }
        results.push({x: newX, y: newY});
    }

    for (let i = 1; i <= 8; i++) {
        const newX = x + i;
        const newY = y - i;
        const findElementByPosition = figuresOnBoard.find(item => item.x === newX && item.y === newY);
        if (findElementByPosition) {
            if (player !== findElementByPosition.player) {
                results.push({x: newX, y: newY});
            }
            break;
        }
        results.push({x: newX, y: newY});
    }

    return results;
};


const getPositionForQueen = ({x, y, player, figuresOnBoard}) => {
    const results = [];

    for (let i = 1; i <= 8; i++) {
        const newX = x - i;
        const newY = y - i;
        const findElementByPosition = figuresOnBoard.find(item => item.x === newX && item.y === newY);
        if (findElementByPosition) {
            if (player !== findElementByPosition.player) {
                results.push({x: newX, y: newY});
            }
            break;
        }
        results.push({x: newX, y: newY});
    }


    for (let i = 1; i <= 8; i++) {
        const newX = x + i;
        const newY = y + i;
        const findElementByPosition = figuresOnBoard.find(item => item.x === newX && item.y === newY);
        if (findElementByPosition) {
            if (player !== findElementByPosition.player) {
                results.push({x: newX, y: newY});
            }
            break;
        }
        results.push({x: newX, y: newY});
    }

    for (let i = 1; i <= 8; i++) {
        const newX = x - i;
        const newY = y + i;
        const findElementByPosition = figuresOnBoard.find(item => item.x === newX && item.y === newY);
        if (findElementByPosition) {
            if (player !== findElementByPosition.player) {
                results.push({x: newX, y: newY});
            }
            break;
        }
        results.push({x: newX, y: newY});
    }

    for (let i = 1; i <= 8; i++) {
        const newX = x + i;
        const newY = y - i;
        const findElementByPosition = figuresOnBoard.find(item => item.x === newX && item.y === newY);
        if (findElementByPosition) {
            if (player !== findElementByPosition.player) {
                results.push({x: newX, y: newY});
            }
            break;
        }
        results.push({x: newX, y: newY});
    }

    for (let i = 1; i <= 8; i++) {
        const newX = x;
        const newY = y - i;
        const findElementByPosition = figuresOnBoard.find(item => item.x === newX && item.y === newY);
        if (findElementByPosition) {
            if (player !== findElementByPosition.player) {
                results.push({x: newX, y: newY});
            }
            break;
        }
        results.push({x: newX, y: newY});
    }

    for (let i = 1; i <= 8; i++) {
        const newX = x;
        const newY = y + i;
        const findElementByPosition = figuresOnBoard.find(item => item.x === newX && item.y === newY);
        if (findElementByPosition) {
            if (player !== findElementByPosition.player) {
                results.push({x: newX, y: newY});
            }
            break;
        }
        results.push({x: newX, y: newY});
    }

    for (let i = 1; i <= 8; i++) {
        const newX = x + i;
        const newY = y;
        const findElementByPosition = figuresOnBoard.find(item => item.x === newX && item.y === newY);

        if (findElementByPosition) {
            if (player !== findElementByPosition.player) {
                results.push({x: newX, y: newY});
            }
            break;
        }
        results.push({x: newX, y: newY});
    }


    for (let i = 1; i <= 8; i++) {
        const newX = x - i;
        const newY = y;
        const findElementByPosition = figuresOnBoard.find(item => item.x === newX && item.y === newY);
        if (findElementByPosition) {
            if (player !== findElementByPosition.player) {
                results.push({x: newX, y: newY});
            }
            break;
        }
        results.push({x: newX, y: newY});
    }

    return results;
}

export default ({
                    x,
                    y,
                    type,
                    player,
                    figuresOnBoard
                }) => {
    let result;
    switch (type) {
        case FIGURES.pawn: {
            result = getPositionForPawn({x, y, player, figuresOnBoard});
            break;
        }
        case FIGURES.rook: {
            result = getPositionForRook({x, y, player, figuresOnBoard});
            break;
        }
        case FIGURES.horse: {
            result = getPositionForHorse({x, y, player, figuresOnBoard});
            break;
        }
        case FIGURES.officer: {
            result = getPositionForOfficer({x, y, player, figuresOnBoard});
            break;
        }
        case FIGURES.king: {
            result = getPositionForKing({x, y, player, figuresOnBoard});
            break;
        }
        case FIGURES.queen:
            result = getPositionForQueen({x, y, player, figuresOnBoard});
            break;
        default:
            result = [];
            break;
    }

    return result
}
