import Immutable from 'seamless-immutable';
import FIGURES from '../../constants/FIGURES';
import USERS from '../../constants/USERS';
import types from './types';
import canMoveToFigure from '../../utils/canMoveToFigure';

const initialState = Immutable({
    isLoading: true,
    fields: null,
    currentMove: null,
    activeFields: [],
    figuresOnBoard: {},
    activeFigure: null,
    isOpenSwapModal: false
});

const generateFields = () => {
    const FIELDS = [];
    let isWhite = false;
    for (let y = 1; y <= 8; y++) {
        const rows = [];
        isWhite = !isWhite;
        for (let x = 1; x <= 8; x++) {
            rows.push({x, y, color: isWhite ? '#d9d9c3' : '#BB9979'});
            isWhite = !isWhite;
        }
        FIELDS.push(rows);
    }

    return FIELDS;
}

const figuresOnBoard = {
    [`${1}${2}`]: {x: 1, y: 2, type: FIGURES.pawn, player: USERS.PLAYER1},
    [`${2}${2}`]: {x: 2, y: 2, type: FIGURES.pawn, player: USERS.PLAYER1},
    [`${3}${2}`]: {x: 3, y: 2, type: FIGURES.pawn, player: USERS.PLAYER1},
    [`${4}${2}`]: {x: 4, y: 2, type: FIGURES.pawn, player: USERS.PLAYER1},
    [`${5}${2}`]: {x: 5, y: 2, type: FIGURES.pawn, player: USERS.PLAYER1},
    [`${6}${2}`]: {x: 6, y: 2, type: FIGURES.pawn, player: USERS.PLAYER1},
    [`${7}${2}`]: {x: 7, y: 2, type: FIGURES.pawn, player: USERS.PLAYER1},
    [`${8}${2}`]: {x: 8, y: 2, type: FIGURES.pawn, player: USERS.PLAYER1},
    [`${2}${1}`]: {x: 2, y: 1, type: FIGURES.horse, player: USERS.PLAYER1},
    [`${7}${1}`]: {x: 7, y: 1, type: FIGURES.horse, player: USERS.PLAYER1},
    [`${3}${1}`]: {x: 3, y: 1, type: FIGURES.officer, player: USERS.PLAYER1},
    [`${6}${1}`]: {x: 6, y: 1, type: FIGURES.officer, player: USERS.PLAYER1},
    [`${5}${1}`]: {x: 5, y: 1, type: FIGURES.king, player: USERS.PLAYER1},
    [`${4}${1}`]: {x: 4, y: 1, type: FIGURES.queen, player: USERS.PLAYER1},
    [`${1}${1}`]: {x: 1, y: 1, type: FIGURES.rook, player: USERS.PLAYER1},
    [`${8}${1}`]: {x: 8, y: 1, type: FIGURES.rook, player: USERS.PLAYER1},

    [`${1}${7}`]: {x: 1, y: 7, type: FIGURES.pawn, player: USERS.PLAYER2},
    [`${2}${7}`]: {x: 2, y: 7, type: FIGURES.pawn, player: USERS.PLAYER2},
    [`${3}${7}`]: {x: 3, y: 7, type: FIGURES.pawn, player: USERS.PLAYER2},
    [`${4}${7}`]: {x: 4, y: 7, type: FIGURES.pawn, player: USERS.PLAYER2},
    [`${5}${7}`]: {x: 5, y: 7, type: FIGURES.pawn, player: USERS.PLAYER2},
    [`${6}${7}`]: {x: 6, y: 7, type: FIGURES.pawn, player: USERS.PLAYER2},
    [`${7}${7}`]: {x: 7, y: 7, type: FIGURES.pawn, player: USERS.PLAYER2},
    [`${8}${7}`]: {x: 8, y: 7, type: FIGURES.pawn, player: USERS.PLAYER2},
    [`${2}${8}`]: {x: 2, y: 8, type: FIGURES.horse, player: USERS.PLAYER2},
    [`${7}${8}`]: {x: 7, y: 8, type: FIGURES.horse, player: USERS.PLAYER2},
    [`${3}${8}`]: {x: 3, y: 8, type: FIGURES.officer, player: USERS.PLAYER2},
    [`${6}${8}`]: {x: 6, y: 8, type: FIGURES.officer, player: USERS.PLAYER2},
    [`${5}${8}`]: {x: 5, y: 8, type: FIGURES.king, player: USERS.PLAYER2},
    [`${4}${8}`]: {x: 4, y: 8, type: FIGURES.queen, player: USERS.PLAYER2},
    [`${1}${8}`]: {x: 1, y: 8, type: FIGURES.rook, player: USERS.PLAYER2},
    [`${8}${8}`]: {x: 8, y: 8, type: FIGURES.rook, player: USERS.PLAYER2},
}

export default (state = initialState, action = {}) => {
    console.log('Type: ', action.type);
    switch (action.type) {
        case types.INIT_GAME:
            const fields = generateFields();
            return state.merge({
                isLoading: false,
                fields,
                currentMove: USERS.PLAYER1,
                figuresOnBoard
            });
        case types.CHANGE_MOVE:
            return state.merge({
                currentMove: state.currentMove === USERS.PLAYER1 ? USERS.PLAYER2 : USERS.PLAYER1
            });
        case types.CLEAR_GAME:
            return state.merge({
                isLoading: true,
                fields: null,
                currentMove: null,
            });
        case types.CAN_MOVE_FIELDS:
            return state.merge({
                activeFields: action.activeFields
            });
        case types.CLEAR_MOVE_FIELDS:
            return state.merge({activeFields: []});
        case types.TO_IDENTIFY_POSSIBLE_MOVES: {
            const {x, y} = action.fromPosition;
            const start = Date.now();
            const activeFields = canMoveToFigure({
                x, y, player: action.player, figuresOnBoard: state.figuresOnBoard, type: action.figureType
            });
            console.log(Date.now() - start);

            return state.merge({
                activeFields,
                activeFigure: {x, y, player: action.player, type: action.figureType}
            });
        }
        case types.MOVE_FIGURE: {
            const {toPosition} = action;
            const {x, y, player, type} = state.activeFigure;
            const isPawn = type === FIGURES.pawn;
            const isLastPosition = toPosition.y === 1 || toPosition.y === 8;

            let isFriendlyPerson = false;
            const isFigureCanMove = Boolean(state.activeFields.find(item => item.x === toPosition.x && item.y === toPosition.y));
            const keys = Object.keys(state.figuresOnBoard);
            const newFiguresOnBoard = keys.filter(key => {
                const item = state.figuresOnBoard[key];
                const isExist = item.x === toPosition.x && item.y === toPosition.y;
                if (isExist && item.player !== player) {
                    return false;
                }

                if (isExist && item.player === player) {
                    isFriendlyPerson = true;
                }

                return true;
            }).reduce((acc, key) => {
                const item = state.figuresOnBoard[key];
                if (
                    (!isFigureCanMove && item.x === x && item.y === y) ||
                    (isFriendlyPerson && item.x === x && item.y === y)
                ) {
                    return {
                        ...acc,
                        [key]: {...item, x, y}
                    };
                }

                if (!isFriendlyPerson && item.x === x && item.y === y) {
                    return {
                        ...acc,
                        [`${toPosition.x}${toPosition.y}`]: {...item, x: toPosition.x, y: toPosition.y, walk: isPawn}
                    };
                }

                return {...acc, [key]: item};
            }, {});

            return state.merge({
                figuresOnBoard: newFiguresOnBoard,
                currentMove: (isFriendlyPerson || !isFigureCanMove) ? state.currentMove : (state.currentMove === USERS.PLAYER1 ? USERS.PLAYER2 : USERS.PLAYER1),
                activeFields: [],
                activeFigure: null,
                isLastPosition: isFigureCanMove && isLastPosition && isPawn,
                positionForSwap: toPosition
            });
        }

        case types.CLEAR_SELECTED: {
            return state.merge({
                activeFields: [],
                activeFigure: null
            })
        }

        case types.SWAP_FIGURE: {
            const {x, y} = state.positionForSwap;
            return state.merge(
                {
                    figuresOnBoard: state.figuresOnBoard.map(item => {
                        return item.x === x && item.y === y ? {...item, type: action.figureType} : item;
                    }),
                    positionForSwap: null,
                    isLastPosition: false
                }
            );
        }
        default:
            return state;
    }
}
