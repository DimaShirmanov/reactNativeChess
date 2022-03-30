import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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

    return (
        <View style={styles.container}>
            <Figure x={3} y={2} />
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