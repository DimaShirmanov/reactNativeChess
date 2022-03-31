import Immutable from 'seamless-immutable';
import USERS from '../../constants/USERS';
import types from './types';

const initialState = Immutable({
    isLoading: true,
    fields: null,
    currentMove: null,
    activeFields: [],
    figuresOnBoard: {}
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

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case types.INIT_GAME:
            const fields = generateFields();
            return state.merge({
                isLoading: false,
                fields,
                currentMove: USERS.PLAYER1
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
            return state.merge({activeFields: action.activeFields})
        case types.CLEAR_MOVE_FIELDS:
            return state.merge({activeFields: []});
        case types.SET_FIGURE_ON_BOARD: {
            const {x, y, player, type} = action.data;
            return state.merge({
                figuresOnBoard: {
                    [`${x}-${y}`]: {player, type}
                }
            }, {deep: true});
        }
        case types.REMOVE_FIGURE_ON_BOARD: {
            const {x, y} = action.data;
            return state.merge({
                figuresOnBoard: Object.keys(state.figuresOnBoard).reduce((acc, key) => {
                    return key === `${x}-${y}` ? acc : {...acc, [key]: state.figuresOnBoard[key]}
                }, {})
            });
        }
        default:
            return state;
    }
}
