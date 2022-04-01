import React, { memo } from 'react';
import {
    StyleSheet,
    View,
    useWindowDimensions
} from 'react-native';
import { useSelector } from 'react-redux';

const Field = ({ field }) => {
    const width = useWindowDimensions().width / 8;
    const height = useWindowDimensions().height / 8;

    const activeFields = useSelector(state => state.game.activeFields || []);
    const isActive = activeFields.find(item => item.x === field.x && item.y === field.y);
    return (
        <View style={[styles.container, { backgroundColor: field.color, width, height }]}>
            {isActive && <View style={{width: 10, height: 10, backgroundColor: 'green', borderRadius: 10}}/>}
        </View>
    );
}

export default memo(Field);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1
    },
})