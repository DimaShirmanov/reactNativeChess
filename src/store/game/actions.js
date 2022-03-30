import types from './types';

const initGame = () => ({ type: types.INIT_GAME });
const changeMove = () => ({ type: types.CHANGE_MOVE });
const clearGame = () => ({ types: types.CLEAR_GAME });

export default {
    initGame,
    changeMove,
    clearGame
}