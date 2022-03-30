import React, { memo } from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('screen');

const WIDTH_FIELD = (width > height ? width : height) / 8;
const HEIGHT_FIELD = (height < width ? height : width) / 8;

const Field = ({ field }) => {
    return (
        <View style={[styles.container, { backgroundColor: field.color }]} />
    )
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