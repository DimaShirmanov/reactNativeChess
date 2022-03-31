import types from './types';

const initGame = () => ({ type: types.INIT_GAME });
const changeMove = () => ({ type: types.CHANGE_MOVE });
const clearGame = () => ({ type: types.CLEAR_GAME });
const canMoveFields = activeFields => ({type: types.CAN_MOVE_FIELDS, activeFields});
const clearMove = () => ({type: types.CLEAR_MOVE_FIELDS});
const setFigureOnBoard = data => ({type: types.SET_FIGURE_ON_BOARD, data});

export default {
    initGame,
    changeMove,
    clearGame,
    canMoveFields,
    clearMove,
    setFigureOnBoard
}
