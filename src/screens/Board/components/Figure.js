import React, { memo, useEffect } from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

const WIDTH_FILED = width / 8;
const HEIGHT_FIELD = height / 8;

const WIDTH = WIDTH_FILED * 0.5;
const HEIGHT = HEIGHT_FIELD;

const Figure = ({ x, y }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const figureImage = require('../../../assets/black-pawn.png');

    const panGestureHandler = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            const { absoluteY, absoluteX } = event;
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
            context.absoluteX = absoluteX;
            context.absoluteY = absoluteY;
        },
        onEnd: ({ absoluteX, absoluteY }) => {
            const newX = (Math.ceil(absoluteX / WIDTH_FILED) - 1) * WIDTH_FILED;
            const newY = (Math.ceil(absoluteY / HEIGHT_FIELD) - 1) * HEIGHT_FIELD;
            translateX.value = withTiming(newX + WIDTH_FILED * 0.3);
            translateY.value = withTiming(newY);
        },
    });

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ]
        }
    }, []);

    useEffect(() => {
        translateX.value = withTiming((x - 1) * WIDTH_FILED + (WIDTH_FILED * 0.3));
        translateY.value = withTiming((y - 1) * HEIGHT_FIELD);
    }, [x, y]);

    return (
        <PanGestureHandler onGestureEvent={panGestureHandler}>
            <Animated.Image style={[styles.container, reanimatedStyle]} source={figureImage} />
        </PanGestureHandler>
    );
};

export default memo(Figure);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1,
        width: WIDTH,
        height: HEIGHT
    }
});