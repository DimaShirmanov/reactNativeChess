import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FIGURES from '../../constants/FIGURES';
import USERS from '../../constants/USERS';
import gameActions from '../../store/game/actions';
import Field from './components/Field';
import Figure from './components/Figure';

const DEFAULT_POSITION = [
    //PLAYER1
    { x: 1, y: 2, type: FIGURES.pawn, player: USERS.PLAYER1 },
    { x: 2, y: 2, type: FIGURES.pawn, player: USERS.PLAYER1 },
    { x: 3, y: 2, type: FIGURES.pawn, player: USERS.PLAYER1 },
    { x: 4, y: 2, type: FIGURES.pawn, player: USERS.PLAYER1 },
    { x: 5, y: 2, type: FIGURES.pawn, player: USERS.PLAYER1 },
    { x: 6, y: 2, type: FIGURES.pawn, player: USERS.PLAYER1 },
    { x: 7, y: 2, type: FIGURES.pawn, player: USERS.PLAYER1 },
    { x: 8, y: 2, type: FIGURES.pawn, player: USERS.PLAYER1 },
    { x: 1, y: 1, type: FIGURES.rook, player: USERS.PLAYER1 },
    { x: 8, y: 1, type: FIGURES.rook, player: USERS.PLAYER1 },
    { x: 2, y: 1, type: FIGURES.horse, player: USERS.PLAYER1 },
    { x: 7, y: 1, type: FIGURES.horse, player: USERS.PLAYER1 },
    { x: 3, y: 1, type: FIGURES.officer, player: USERS.PLAYER1 },
    { x: 6, y: 1, type: FIGURES.officer, player: USERS.PLAYER1 },
    { x: 5, y: 1, type: FIGURES.king, player: USERS.PLAYER1 },
    { x: 4, y: 1, type: FIGURES.queen, player: USERS.PLAYER1 },

    //PLAYER2
    { x: 1, y: 7, type: FIGURES.pawn, player: USERS.PLAYER2 },
    { x: 2, y: 7, type: FIGURES.pawn, player: USERS.PLAYER2 },
    { x: 3, y: 7, type: FIGURES.pawn, player: USERS.PLAYER2 },
    { x: 4, y: 7, type: FIGURES.pawn, player: USERS.PLAYER2 },
    { x: 5, y: 7, type: FIGURES.pawn, player: USERS.PLAYER2 },
    { x: 6, y: 7, type: FIGURES.pawn, player: USERS.PLAYER2 },
    { x: 7, y: 7, type: FIGURES.pawn, player: USERS.PLAYER2 },
    { x: 8, y: 7, type: FIGURES.pawn, player: USERS.PLAYER2 },
    { x: 1, y: 8, type: FIGURES.rook, player: USERS.PLAYER2 },
    { x: 8, y: 8, type: FIGURES.rook, player: USERS.PLAYER2 },
    { x: 2, y: 8, type: FIGURES.horse, player: USERS.PLAYER2 },
    { x: 7, y: 8, type: FIGURES.horse, player: USERS.PLAYER2 },
    { x: 3, y: 8, type: FIGURES.officer, player: USERS.PLAYER2 },
    { x: 6, y: 8, type: FIGURES.officer, player: USERS.PLAYER2 },
    { x: 5, y: 8, type: FIGURES.king, player: USERS.PLAYER2 },
    { x: 4, y: 8, type: FIGURES.queen, player: USERS.PLAYER2 },
];

const Board = () => {
    const dispath = useDispatch();
    const { isLoading, fields } = useSelector(state => state.game);

    useEffect(() => {
        dispath(gameActions.initGame());

        return () => {
            dispath(gameActions.clearGame());
        }
    }, []);

    if (!fields || isLoading) {
        return null;
    }


    return (
        <View style={styles.container}>
            {fields.map(rows => rows.map(field => <Field field={field} key={`${field.x}-${field.y}`} />))}
            {DEFAULT_POSITION.map(item => <Figure key={`${item.x}-${item.y}-${item.player}`} {...item}/>)}
        </View>
    );
};

export default Board;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
