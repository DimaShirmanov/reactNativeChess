import React, { memo } from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('screen');

const WIDTH_FIELD = (width > height ? width : height) / 8;
const HEIGHT_FIELD = (height < width ? height : width) / 8;

const Field = ({ field }) => {
    const activeFields = useSelector(state => state.game.activeFields || []);
    const isActive = activeFields.find(item => item.x === field.x && item.y === field.y);
    return (
        <View style={[styles.container, { backgroundColor: field.color }]}>
            {isActive && <View style={{width: 10, height: 10, backgroundColor: 'green', borderRadius: 10}}/>}
        </View>
    );
}

export default memo(Field);

const styles = StyleSheet.create({
    container: {
        width: WIDTH_FIELD,
        height: HEIGHT_FIELD,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1
    },
})