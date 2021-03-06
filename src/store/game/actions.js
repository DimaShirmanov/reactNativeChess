import types from './types';

const initGame = () => ({type: types.INIT_GAME});
const changeMove = () => ({type: types.CHANGE_MOVE});
const clearGame = () => ({type: types.CLEAR_GAME});
const canMoveFields = activeFields => ({type: types.CAN_MOVE_FIELDS, activeFields});
const clearMove = () => ({type: types.CLEAR_MOVE_FIELDS});


const moveFigure = ({toPosition}) => ({
    type: types.MOVE_FIGURE,
    toPosition,
});

const toIdentifyPossibleMoves = ({fromPosition, player, figureType}) => ({
    type: types.TO_IDENTIFY_POSSIBLE_MOVES,
    fromPosition,
    player,
    figureType
});

const clearSelected = () => ({type: types.CLEAR_SELECTED});

const swapFigure = figureType => ({type: types.SWAP_FIGURE, figureType});

const moveBot = () => ({type: types.MOVE_BOT})

export default {
    initGame,
    changeMove,
    clearGame,
    canMoveFields,
    clearMove,
    moveFigure,
    toIdentifyPossibleMoves,
    clearSelected,
    swapFigure,
    moveBot
}
