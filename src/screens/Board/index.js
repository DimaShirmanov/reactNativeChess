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

    const PAWNS = [
        <Figure x={1} y={2} type={FIGURES.pawn} player={USERS.PLAYER1} />,
        <Figure x={2} y={2} type={FIGURES.pawn} player={USERS.PLAYER1} />,
        <Figure x={3} y={2} type={FIGURES.pawn} player={USERS.PLAYER1} />,
        <Figure x={4} y={2} type={FIGURES.pawn} player={USERS.PLAYER1} />,
        <Figure x={5} y={2} type={FIGURES.pawn} player={USERS.PLAYER1} />,
        <Figure x={6} y={2} type={FIGURES.pawn} player={USERS.PLAYER1} />,
        <Figure x={7} y={2} type={FIGURES.pawn} player={USERS.PLAYER1} />,
        <Figure x={8} y={2} type={FIGURES.pawn} player={USERS.PLAYER1} />,



        <Figure x={1} y={7} type={FIGURES.pawn} player={USERS.PLAYER2} />,
        <Figure x={2} y={7} type={FIGURES.pawn} player={USERS.PLAYER2} />,
        <Figure x={3} y={7} type={FIGURES.pawn} player={USERS.PLAYER2} />,
        <Figure x={4} y={7} type={FIGURES.pawn} player={USERS.PLAYER2} />,
        <Figure x={5} y={7} type={FIGURES.pawn} player={USERS.PLAYER2} />,
        <Figure x={6} y={7} type={FIGURES.pawn} player={USERS.PLAYER2} />,
        <Figure x={7} y={7} type={FIGURES.pawn} player={USERS.PLAYER2} />,
        <Figure x={8} y={7} type={FIGURES.pawn} player={USERS.PLAYER2} />,
    ];
    

    return (
        <View style={styles.container}>
            {PAWNS.map(item => item)}
            {fields.map(rows => rows.map(field => <Field field={field} key={`${field.x}-${field.y}`} />))}
        </View>
    );
};

export default Board;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
});